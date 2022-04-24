import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../product-service";
import {LoggingService} from "../logging.service";
import {Product} from "../product.model";

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {
  @Input() product: Product = {name: "NewBike", description: "Bike", price: "100"};

  constructor(private productService: ProductService, private loggingService: LoggingService) {
    // this.productService.productUpdated.subscribe(
    //   (action: string) => alert('Action: ' + action)
    // );
  }

  ngOnInit(): void {

    this.loggingService.logMessage('manage-component: ngOnInit()');
    this.productService.productUpdated.subscribe(
      (action: string) => alert('Action: ' + action)
    );

  }

  onAddProduct(name: string, desctiption: string, price: string, status: string) {
    this.productService.addProduct(name, desctiption, price);
    this.loggingService.logMessage('manage-component: onAddProduct(...)');
    //TODO: use status later

  }

  getNumberOfProducts(): number {
    this.loggingService.logMessage('manage-component: getNumberOfProducts');
    return this.productService.products.length;
  }
}
