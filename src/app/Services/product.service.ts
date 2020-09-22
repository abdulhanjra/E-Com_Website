import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './product.interface';
import { User } from './register.interface';

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
  saveUser(user){
    this.currentUserSubject.next(user);
    localStorage.removeItem('currentUser');
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  signUp(user: User) {
    return this.http.post(`http://127.0.0.1:4000/api/users/register`, user, { observe: 'response' });
  }

  signIn(username, password) {
    return this.http.post(`http://127.0.0.1:4000/api/users/authenticate`,  {username, password} , { observe: 'response' });
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

  public get userValue(): User {
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

  logout() :void {    
    localStorage.setItem('isLoggedIn','false');    
    localStorage.removeItem('token');    
    localStorage.removeItem('currentUser');
  } 

}
