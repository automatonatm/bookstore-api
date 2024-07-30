import { CART_ITEM_REPOSITORY, CART_REPOSITORY } from '@app/core/constants';
import { Cart, CartItem } from './entities';

export const cartProviders = [
  {
    provide: CART_REPOSITORY,
    useValue: Cart,
  },

  {
    provide: CART_ITEM_REPOSITORY,
    useValue: CartItem,
  },
];
