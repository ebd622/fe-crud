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
    //TODO: implement GUI?
    this.productService.updateProduct(product)
  }

  onEditProduct(product: Product) {
    this.logginService.logMessage('Edit Product: ' + JSON.stringify(product));
    let copy = Object.assign({}, product);
    this.productService.productEdit.emit(copy);
    //TODO: implement logic?
  }

}
