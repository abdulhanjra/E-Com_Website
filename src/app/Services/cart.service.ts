import { Injectable } from '@angular/core';
import { CartItem } from '../Services/cart.interface';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public currentCartSubject: BehaviorSubject<CartItem[]>;
  constructor(private http: HttpClient) {
    this.currentCartSubject = new BehaviorSubject<CartItem[]>(JSON.parse(localStorage.getItem('currentCart')));
  }

  addToCart({ product, quantity, price}) {
    let items: CartItem[] = this.currentCartSubject.value ? this.currentCartSubject.value : [];
    // items.push({ productId: product, quantity: quantity});
    const itemIndex = items.findIndex(item => item.productId._id === product._id);
    if (itemIndex === -1) {
      items.push({ productId: product, quantity: quantity, price: price});
    }else{
      items[itemIndex].quantity += quantity;
    }
    this.currentCartSubject.next(items);
    localStorage.setItem('currentCart', JSON.stringify(items));
  }

  removeToCart(productId) {
    let items: CartItem[] = this.currentCartSubject.value;
    // console.log(items);

    const itemIndex = items.findIndex(item => item.productId._id === productId);
    items = items.filter(obj => obj !== items[itemIndex]);
    // console.log(itemIndex);
    // console.log(items);
    this.currentCartSubject.next(items);
    localStorage.setItem('currentCart', JSON.stringify(items));
  }


  clearCart() {
    localStorage.removeItem("currentCart");
    this.currentCartSubject.next(null);
  }

  createOrder(cart){
    console.log(cart);
    return this.http.post(`http://127.0.0.1:3000/orders`, cart, {observe: 'response'})    
  }

  getAllOrders(){
    return this.http.get(`http://127.0.0.1:3000/orders`);
  }
}