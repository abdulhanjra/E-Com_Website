import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Form, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Product } from 'src/app/Services/product.interface';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  
  form: FormGroup;
  submitted = false; 
  loading = false;

  postError: boolean;
  postErrorMessage: string;
  errorMessage: String; 
  successMessage: string;
  isAlredayExists: string;


  constructor(private productService: ProductService,
              private router: Router,
              private formBuilder: FormBuilder) { 
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      tags: ['', Validators.required],
      description: ['', Validators.required]
    });  
  }

  get f() { return this.form.controls; }
  
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }
    this.loading = true;
    this.productService.addProduct(this.form.value)
        .pipe(first())
        .subscribe(
          (result:any) => {
            if(result.status==200){
              console.log("In dtatus 200 condition")
              this.successMessage="Product updated successfully";
              this.router.navigate(['/products']);
              //this.productService.saveUser(result.body);      //for localstorage
            }
          },
          error => this.onHttpError(error)
        );
  }



  onHttpError(error: any): void {
    throw new Error('Yo!! Method not implemented.');
  }

}
