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

  constructor(private produsctService: ProductService) {}

  onDeleteProduct() {
    this.produsctService.deleteProduct(this.id);
  }

  onUpdateProduct(product: { name: string; description: string; price: string }) {
    //TODO: update by Id?
  }
}
