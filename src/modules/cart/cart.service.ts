import { CART_REPOSITORY, CART_ITEM_REPOSITORY } from '@app/core/constants';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Cart, CartItem } from './entities';
import { Book } from '../books/books.entity';
import { CreateCartItemDto, UpdateCartItemDto } from './dto';

interface cartItemQuery {
  bookId?: number;
  id?: number;
}
@Injectable()
export class CartService {
  constructor(
    @Inject(CART_REPOSITORY) private readonly cartRepository: typeof Cart,
    @Inject(CART_ITEM_REPOSITORY)
    private readonly cartItemRepository: typeof CartItem,
  ) {}

  public async getOrCreateCart(customerId: number) {
    const cart = await this.cartRepository.findOne({
      where: { customerId },
      include: [
        {
          model: CartItem,
          include: [
            {
              model: Book,
              attributes: ['id', 'title', 'author', 'price', 'stock'],
            },
          ],
        },
      ],
    });

    if (!cart) {
      return this.cartRepository.create({ customerId });
    }

    return cart;
  }

  public async addItem(
    customerId: number,
    createCartItemDto: CreateCartItemDto,
  ) {
    const cart = await this.getOrCreateCart(customerId);

    const { bookId, quantity } = createCartItemDto;

    const cartItem = await this.findCartItem({ bookId }, customerId);

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
      return {
        message: 'Item added successfully',
      };
    }

    await this.cartItemRepository.create({
      bookId,
      quantity,
      cartId: cart.id,
    });

    return {
      message: 'Item added successfully',
    };
  }

  public async updateItem(
    customerId: number,
    cartItemId: number,
    updateCartItemDto: UpdateCartItemDto,
  ) {
    const { quantity } = updateCartItemDto;

    const cartItem = await this.findCartItem({ id: cartItemId }, customerId);

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    cartItem.quantity = quantity;

    await cartItem.save();

    return {
      message: 'Item updated successfully',
    };
  }

  public async removeItem(userId: number, cartItemId: number) {
    const cartItem = await this.findCartItem({ id: cartItemId }, userId);

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    await cartItem.destroy();

    return {
      message: 'Item removed successfully',
    };
  }

  public async clearCart(customerId: number) {
    const cart = await this.getOrCreateCart(customerId);

    await this.cartItemRepository.destroy({ where: { cartId: cart.id } });

    return {
      message: 'Cart cleared successfully',
    };
  }

  private async findCartItem(query: cartItemQuery, customerId: number) {
    const cart = await this.getOrCreateCart(customerId);

    return await this.cartItemRepository.findOne({
      where: { ...query, cartId: cart.id },
    });
  }
}
