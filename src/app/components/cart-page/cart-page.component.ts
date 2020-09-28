import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Product } from 'src/app/Services/product.interface';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  num1: any;
  num2: any;
  id: string;
  cartProducts: Product[] = [];
  products: import("c:/Users/user/Desktop/Product/product-App/src/app/Services/product.interface").Product;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productService.currentProductSubject
			.subscribe(items => this.cartProducts = items);
  }

  // multiplyBy()
  // {
  //   this.num1 = document.getElementById("price");
  //   this.num2 = document.getElementById("quantity");
  //   document.getElementById("result").innerHTML = this.num1 * this.num2;
  // }

}
