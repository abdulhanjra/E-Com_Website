import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
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

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAll()
    .pipe(first())
    .subscribe(products => this.products = products);
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

}
