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
  updateButtonDisable: Boolean = true;

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
        this.updateButtonDisable = false;
        //alert('Edit: ' + JSON.stringify(aProduct))
      }
    )
  }

  onAddProduct(name: string, desctiption: string, price: string, status: string) {
    this.productService.addProduct(name, desctiption, price);
    this.loggingService.logMessage('manage-component: onAddProduct(...)');
    //TODO: use status later
  }
  // onUpdateProduct(name: string, desctiption: string, price: string, status: string) {
  //   this.productService.updateProduct({name: name, description: desctiption, price: price});
  //   this.updateButtonDisable = true; //Disable [Update]-button after updating
  //   this.clearForm();
  //   this.loggingService.logMessage('manage-component: onUpdateProduct(...)');
  // }

  onUpdateProduct(aProduct: Product, status: string) {
    this.productService.updateProduct1(aProduct)
      .subscribe( {
        next: (v) => {
          this.loggingService.logMessage('Updated product: ' + JSON.stringify(v))
          this.updateButtonDisable = true; //Disable [Update]-button after updating
          this.clearForm();
        },
        error: (e) => this.loggingService.logMessage('[Update] error: ' + JSON.stringify(e)),
        complete: () => {
          this.loggingService.logMessage('[Update] complete')
        }
      })
  }

  getNumberOfProducts(): number {
    this.loggingService.logMessage('manage-component: getNumberOfProducts');
    return this.productService.products.length;
  }

  private clearForm(){
    this.product.name="";
    this.product.description="";
    this.product.price="";
  }
}
