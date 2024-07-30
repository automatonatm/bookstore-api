import {
  BOOK_REPOSITORY,
  ORDER_ITEM_REPOSITORY,
  ORDER_REPOSITORY,
} from '@app/core/constants';
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Order, OrderItem } from './entities';
import { Sequelize } from 'sequelize-typescript';
import { Book } from '../books/books.entity';
import { OrderStatus } from '@app/core/types';
import { CartService } from '../cart/cart.service';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_ITEM_REPOSITORY)
    private readonly orderItemRepository: typeof OrderItem,

    @Inject(ORDER_REPOSITORY) private readonly orderRepository: typeof Order,

    @Inject(BOOK_REPOSITORY) private readonly bookRepository: typeof Book,

    private readonly cartService: CartService,

    private sequelize: Sequelize,
  ) {}

  public async createOrder(customerId: number) {
    //const { items } = orderItems;

    const cart = await this.cartService.getOrCreateCart(customerId);

    if (cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    const order = await this.sequelize.transaction(async (transaction) => {
      // Create the order
      const order = await this.orderRepository.create(
        { customerId, status: OrderStatus.PENDING },
        { transaction },
      );

      // Process each item in the order
      for (const item of cart.items) {
        const book = await this.bookRepository.findOne({
          where: { id: item.bookId },
          lock: transaction.LOCK.UPDATE, // Lock the row to prevent concurrent modifications
          transaction,
        });

        if (!book) {
          throw new NotFoundException(`Book with ID ${item.bookId} not found`);
        }

        if (book.stock < item.quantity) {
          throw new ConflictException(
            `Not enough stock for book with ID ${item.bookId}`,
          );
        }

        // Decrease the book stock
        book.stock -= item.quantity;
        await book.save({ transaction });

        // Create the order item
        await this.orderItemRepository.create(
          {
            orderId: order.id,
            bookId: item.bookId,
            quantity: item.quantity,
          },
          { transaction },
        );
      }

      // Commit the order
      order.status = OrderStatus.COMPLETED;
      await order.save({ transaction });

      // Clear the cart
      await this.cartService.clearCart(customerId);

      return order;
    });

    return {
      id: order.id,
      message: 'Order created successfully',
    };
  }

  public async getUserOrders(customerId: number): Promise<Order[]> {
    return this.orderRepository.findAll({
      where: { customerId },
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Book,
              attributes: ['id', 'title', 'price'],
            },
          ],
        },
      ],
    });
  }
}
