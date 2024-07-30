import { ORDER_ITEM_REPOSITORY, ORDER_REPOSITORY } from '@app/core/constants';
import { Order, OrderItem } from './entities';

export const ordersProvider = [
  {
    provide: ORDER_ITEM_REPOSITORY,
    useValue: OrderItem,
  },

  {
    provide: ORDER_REPOSITORY,
    useValue: Order,
  },
];
