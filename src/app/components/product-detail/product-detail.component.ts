import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { CartService } from 'src/app/Services/cart.service';
import { Product } from 'src/app/Services/product.interface';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  
  id: string;
  products: Product;
  constructor(private productService: ProductService, 
              private route: ActivatedRoute, 
              private cartService: CartService,
              private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id){
    this.productService.getById(this.id).pipe(first()).subscribe((response: any) => {
      if(+response.status === 200){
        this.products = response.item;
        // console.log(this.products);
      }
    }  
      // product => {
      // this.products = product;    }
    );
  }
  }
  

  addToCart() {
    // console.log('add to cart clicked');
    // console.log(this.products);
    this.cartService.addToCart({product:this.products, quantity: 1});
    this.router.navigate(['/cart-page']);
  }

}
