export interface IOrderType {
  id: number;
  userId: number;
  orderDate: string;
  city: string;
  postAddress: string;
  comment: string;
  price: number;
  status: 'NEW' | 'PAID' | 'AWAITING' | 'SENT' | 'DELIVERED' | 'CANCELED';
  ordersLists: [
    {
      id: number;
      orderId: number;
      productId: number;
      productAttributeId: number;
      quantity: number;
      selfLink: string;
    },
  ];
  selfLink: string;
}
