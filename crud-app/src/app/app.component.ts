import {Component, OnInit} from '@angular/core';
import {ProductService} from "./product-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'crud-app1';
  name = 'ebd';
  products: {name: string, description: string, price: string}[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.products;
    this.productService.fetchProducts();
  }
}
