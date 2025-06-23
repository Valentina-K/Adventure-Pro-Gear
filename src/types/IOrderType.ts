export interface IOrderType {
    order: {id: number;
    userId: number;
    orderDate: string;
    city: string;
    postAddress: string;
    comment: string;
    price: number;
    status: 'NEW' | 'ACCEPTED' | 'PENDING' | 'SENT' | 'DELIVERED';
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
    selfLink: string;}
}
