import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../product-service";
import {LoggingService} from "../logging.service";
import {Product} from "../product.model";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product: Product;
  @Input() id: number;

  constructor(private productService: ProductService, private logginService: LoggingService) {}

  onDeleteProduct() {
    this.productService.deleteProduct(this.id);
    this.productService.productUpdated.emit("deleted");
    this.logginService.logMessage('Deleted. Left number of products: ' + this.productService.products.length);
  }

  onUpdateProduct(product: Product) {
    this.productService.updateProduct(product)
    //TODO: update by Id?
  }
}
