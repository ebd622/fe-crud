import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import {ProductService} from "./product-service";
import {LoggingService} from "./logging.service";

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ManageProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ProductService, LoggingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
