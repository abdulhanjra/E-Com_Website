import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { CartItem } from 'src/app/Services/cart.interface';
import { CartService } from 'src/app/Services/cart.service';
import { Product } from 'src/app/Services/product.interface';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  public storage: Storage;

  cartItems: CartItem[] = [];
  cart: CartItem;
  subTotal = 0;
  total = 0;

  currentProduct: Product = null;
  products: import("c:/Users/user/Desktop/Product/product-App/src/app/Services/product.interface").Product;

  constructor(private productService: ProductService, 
              private route: ActivatedRoute, 
              private cartService: CartService,
              private router: Router) {
    
  }

  ngOnInit(): void {
    this.cartService.currentCartSubject
      .subscribe(items => this.cartItems = items);  
    
    // console.log(this.cartItems);
  }

  removeItem(cart){
    this.cartService.removeToCart(cart.productId["_id"]);
  }
  
  getSubTotal(cartItem) {
		if (cartItem == null) {
			return 0;
    }
    this.subTotal = 0;
			this.subTotal = (cartItem.productId["price"] * cartItem.quantity);
		return this.subTotal;
  }
  
  getTotal() {
		if (this.cartItems == null || this.cartItems.length == 0) {
			return 0;
    }
    this.total = 0;
		for (let i = 0; i < this.cartItems.length; i++) {
			this.total += (this.cartItems[i].productId["price"] * this.cartItems[i].quantity);
		}
		return this.total;
  }
  
  onClick(){
    this.cartService.createOrder({products:this.cartItems})
        .pipe(first())
        .subscribe(
          (result:any) => {
            if(result.status==200){
              console.log("In status 200 condition")
              console.log(this.cartItems);
              localStorage.removeItem('currentCart');
              this.router.navigate(['my-order']);
            }
          },
          error => this.onHttpError(error)
        );
  }

  onHttpError(error: any): void {
    throw new Error('Method not implemented.');
  }

}
