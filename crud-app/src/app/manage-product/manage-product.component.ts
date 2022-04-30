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
  //Initial value which will be prepopulated in the form
  /*@Input()*/ product: Product = {name: "bike", description: "Brand: Gazelle", price: "100"};

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
    this.productService.productEdit.subscribe(
      (aProduct) => {
        this.product = aProduct;
        //alert('Edit: ' + JSON.stringify(aProduct))
      }
    )
  }

  onAddProduct(name: string, desctiption: string, price: string, status: string) {
    this.productService.addProduct(name, desctiption, price);
    this.loggingService.logMessage('manage-component: onAddProduct(...)');
    //TODO: use status later
  }
  onUpdateProduct(name: string, desctiption: string, price: string, status: string) {
    this.productService.updateProduct({name: name, description: desctiption, price: price});
    this.loggingService.logMessage('manage-component: onUpdateProduct(...)');
  }

  getNumberOfProducts(): number {
    this.loggingService.logMessage('manage-component: getNumberOfProducts');
    return this.productService.products.length;
  }
}
