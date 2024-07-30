import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from '@app/core/guards';
import { CreateCartItemDto, UpdateCartItemDto } from './dto';
import { GetUser } from '@app/core/decorators';

@ApiTags('Cart Manager')
@ApiBearerAuth('JWT-TOKEN')
@UseGuards(JwtGuard)
@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('/')
  @ApiOkResponse({ status: 200, description: 'Get user cart.' })
  public async getCart() {
    return this.cartService.getOrCreateCart(1);
  }

  @Post('/')
  @ApiCreatedResponse({ status: 200, description: 'Add item to cart.' })
  public async addItem(
    @GetUser('id') customerId: number,
    @Body() createCartItemDto: CreateCartItemDto,
  ) {
    return this.cartService.addItem(customerId, createCartItemDto);
  }

  @Put('/:orderItemId')
  @ApiOkResponse({ status: 200, description: 'Update item quantity.' })
  public async updateItemQuantity(
    @GetUser('id') customerId: number,
    @Body() updateCartItemDto: UpdateCartItemDto,
    @Param('orderItemId', ParseIntPipe) orderItemId: number,
  ) {
    return this.cartService.updateItem(
      customerId,
      orderItemId,
      updateCartItemDto,
    );
  }

  @Delete('/:orderItemId')
  @ApiOkResponse({ status: 200, description: 'Delete item from cart.' })
  public async deleteItem(
    @GetUser('id') customerId: number,
    @Param('orderItemId', ParseIntPipe) orderItemId: number,
  ) {
    return this.cartService.removeItem(customerId, orderItemId);
  }

  @Delete('/')
  @ApiOkResponse({ status: 200, description: 'Empty cart.' })
  public async emptyCart(@GetUser('id') customerId: number) {
    return this.cartService.clearCart(customerId);
  }
}
