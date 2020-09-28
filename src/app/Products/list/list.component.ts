import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Product } from 'src/app/Services/product.interface';
import { ProductService } from 'src/app/Services/product.service';
import { User } from 'src/app/Services/register.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  user: User;
  product: Product;
  errorMessage: '';
  products: any;

  pro = null;
  

  constructor(private productService: ProductService, private router: Router) {
      this.user = this.productService.userValue;
  }

  ngOnInit(){
    this.productService.getAll()
    .pipe(first())
    .subscribe(products => this.products = products);
    
  }

  deleteProduct(id: string) {
    // console.log('i am here', id);
    this.productService.delete(id).pipe(first()).subscribe(() => {
          this.products = this.products.filter(x => x._id !== id);
        });
  }

  logout() {  
    console.log('logout');  
    this.productService.logout();  
    this.router.navigate(['/signin']);  
  }  

  onHttpError(error: any): void {
    throw new Error('Method not implemented.');
  }

}
