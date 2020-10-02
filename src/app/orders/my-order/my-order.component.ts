import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  orders: any;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getAllOrders()
    .pipe(first())
    .subscribe(list => this.orders = list);

    console.log(this.orders);
  }

}
