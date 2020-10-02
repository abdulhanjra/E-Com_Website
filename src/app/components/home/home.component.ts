import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { CartService } from 'src/app/Services/cart.service';
import { Product } from 'src/app/Services/product.interface';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any;
  filteredProducts: Product;
  _listFilter;
  product: Product;
  id: string;

  constructor(private productService: ProductService, private cartService: CartService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.productService.getAll()
    .pipe(first())
    .subscribe(products => this.products = products);
    // localStorage.setItem("products", JSON.stringify(this.products));
    // this.productService.saveProduct(this.products);
    
  }

  get listFilter(): string{
    return this._listFilter; 
  }

  set listFilter(value: string){
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter): this.product;
  }

  performFilter(filterBy): Product{
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
          product.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  addToCart() {
    // console.log('add to cart clicked');
    // this.cartService.sendMsg(new CartItem (this.product,1));
    this.id = this.route.snapshot.params['id'];
    
    console.log(this.products);
    this.cartService.addToCart({product:this.products, quantity: 1, price: this.product.price});
    this.router.navigate(['/cart-page']);
    // this.cartService.addToCart({productId: this.product, 1});
  }

}
