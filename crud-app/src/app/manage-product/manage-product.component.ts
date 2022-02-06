import { Component, OnInit } from '@angular/core';
import {ProductService} from "../product-service";
import {LoggingService} from "../logging.service";

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {

  constructor(private productService: ProductService, private logginService: LoggingService) {
    // this.productService.productUpdated.subscribe(
    //   (action: string) => alert('Action: ' + action)
    // );
  }

  ngOnInit(): void {
    this.logginService.logMessage('manage-component: ngOnInit()');
    this.productService.productUpdated.subscribe(
      (action: string) => alert('Action: ' + action)
    );

  }

  onAddProduct(name: string, desctiption: string, price: string, status: string) {
    this.productService.addProduct(name, desctiption, price);
    //TODO: use status later

  }

  getNumberOfProducts(): number {
    this.logginService.logMessage('manage-component: getNumberOfProducts');
    return this.productService.products.length;
  }
}
