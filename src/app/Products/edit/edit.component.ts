import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: string;
  form: FormGroup;
  submitted = false; 
  loading = false;

  postError: boolean;
  postErrorMessage: string;
  errorMessage: String; 
  successMessage: string;
  isAlredayExists: string;
  isAddMode: boolean;
  products: import("c:/Users/user/Desktop/Product/product-App/src/app/Services/product.interface").Product;

  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.create();

    this.productService.getById(this.id).pipe(first()).subscribe(products => {
      this.products = products;
      this.form.patchValue(this.products);    
    });
  }

  create(){
    this.form = this.formBuilder.group({
      name: [''],
      category: [''],
      price: [''],
      tags: [''],
      description: ['']
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
    this.productService.updateProduct(this.id, this.form.value)
            .pipe(first())
            .subscribe(
              (result:any) => {
                console.log(result);
                if(+result.status===200){
                  this.router.navigate(['/products']);
                }
              },
          error => this.onHttpError(error)
        );
  }


  onHttpError(error: any): void {
    throw new Error('Yo!! Method not implemented.');
  }

}



// {
//   this.f.name.setValue(x.name);
//   this.f.category.setValue(x.category);
//   this.f.price.setValue(x.price);
//   this.f.tags.setValue(x.tags);
//   this.f.description.setValue(x.description);
// }
