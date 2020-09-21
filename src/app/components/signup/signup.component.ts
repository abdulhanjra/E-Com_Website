import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, NgModel, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
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
      username: ['', [Validators.required, Validators.pattern("^[A-Za-z_-][A-Za-z_-]*$")]],
      firstName: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]],
      lastName: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]],
      password: ['', [Validators.required, Validators.minLength(8), 
                Validators.pattern("^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$")]]
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
    this.productService.signUp(this.form.value)
        .pipe(first())
        .subscribe(
          (result:any) => {
            if(result.status==200){
              this.successMessage="Signup Successful"           
              this.router.navigate(['/signin']);
              localStorage.setItem('isLoggedIn', "true"); 
            }
          },
          error => this.onHttpError(error)
        );
  }



  onHttpError(error: any): void {
    if(error.status==400){              
              this.isAlredayExists = "Username already exist";
              localStorage.setItem('isLoggedIn', "false");
            }
    throw new Error('Method not implemented.');
  }

  

}
