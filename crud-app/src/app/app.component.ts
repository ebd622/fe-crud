import {Component, OnInit} from '@angular/core';
import {ProductService} from "./product-service";
import {Product} from "./product.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'crud-app1';
  name = 'ebd';
  products: Product [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.products;
    this.productService.fetchProducts();
  }
}
