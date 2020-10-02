
export class CartItem{
    productId?:any;
    quantity:number;
    price: number;

    constructor(productId?:any, quantity?:number, price?:number){
        this.productId=productId;
        this.quantity=quantity;
        this.price=price;
    }
}