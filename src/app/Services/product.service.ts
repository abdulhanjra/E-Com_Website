import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Product } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient){
  }
  
  addProduct(product: Product) {
    return this.http.post(`http://127.0.0.1:3000/api/products`, product, { observe: 'response' });
  }

  getAll() {
    return this.http.get(`http://127.0.0.1:3000/api/products`);
  }

  getById(id: string) {
    return this.http.get<Product>(`http://127.0.0.1:3000/api/products/${id}`);
  }

  private handleError(err: HttpErrorResponse){
    let errorMessage = " ";
    if(err.error instanceof ErrorEvent){
        errorMessage = `An error occured: ${err.error.message}`;
    }
    else{
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
