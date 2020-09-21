import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient){
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }


  // For localStorage
  saveUser(product){
    this.currentUserSubject.next(product);
    localStorage.removeItem('currentUser');
    localStorage.setItem('currentUser', JSON.stringify(product));
  }

  signUp(product: Product) {
    return this.http.post(`http://127.0.0.1:3000/products/register`, product, { observe: 'response' });
  }
  
  addProduct(product: Product) {
    return this.http.post(`http://127.0.0.1:3000/products`, product, { observe: 'response' });
  }

  getAll() {
    return this.http.get(`http://127.0.0.1:3000/products`);
  }

  getById(id: string) {
    return this.http.get<Product>(`http://127.0.0.1:3000/products/${id}`);
  }

  delete(id: string) {
    return this.http.delete(`http://127.0.0.1:3000/products/${id}`)
    .pipe(map(x => {
      return x;
    }));
  }

  updateProduct(id, params) {
    return this.http.put(`http://127.0.0.1:3000/products/${id}`, params)
        .pipe(map(x => {
            return x;
        }));
}

  public get userValue(): Product {
    return this.currentUserSubject.value;
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
