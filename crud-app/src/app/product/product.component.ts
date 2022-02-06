import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../product-service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product: {name: string, description: string, price: string};
  @Input() id: number;

  constructor(private productService: ProductService) {}

  onDeleteProduct() {
    this.productService.deleteProduct(this.id);
    this.productService.productUpdated.emit("deleted");
  }

  onUpdateProduct(product: { name: string; description: string; price: string }) {
    //TODO: update by Id?
  }
}
