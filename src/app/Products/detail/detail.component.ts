import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  id: string;
  form: FormGroup;
  products: import("c:/Users/user/Desktop/Product/product-App/src/app/Services/product.interface").Product;


  constructor(private route: ActivatedRoute, private productService: ProductService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.productService.getById(this.id).pipe(first()).subscribe((response: any) => {
      if(+response.status === 200){
        this.products = response.item;
        // console.log(this.products);
      }
    }  );
  }


}
