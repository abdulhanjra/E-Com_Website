
export class CartItem{
    productId?:any;
    quantity:number;

    constructor(productId?:any, quantity?:number){
        this.productId=productId;
        this.quantity=quantity;
    }
}