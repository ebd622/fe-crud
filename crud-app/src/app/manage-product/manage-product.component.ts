import { Component, OnInit } from '@angular/core';
import {ProductService} from "../product-service";

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {

  constructor(private productService: ProductService) {
    this.productService.productUpdated.subscribe(
      (action: string) => alert('Action: ' + action)
    );
  }

  ngOnInit(): void {
  }

  onAddProduct(name: string, desctiption: string, price: string, status: string) {
    this.productService.addProduct(name, desctiption, price);
    //TODO: use status later

  }

  getNumberOfProducts(){
    return this.productService.products.length;
  }
}
