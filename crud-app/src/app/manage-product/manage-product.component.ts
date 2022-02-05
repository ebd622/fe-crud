import { Component, OnInit } from '@angular/core';
import {ProductService} from "../product-service";

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  onAddProduct(value: string, desctiption: string, price: string, status: string) {
    this.productService.addProduct(value, desctiption, price);

  }
}
