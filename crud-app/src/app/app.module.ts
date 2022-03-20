import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import {ProductService} from "./product-service";
import {LoggingService} from "./logging.service";
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

const appRoute: Routes = [
  //Add routing (just as an example)
  {path: 'app', component: AppComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ManageProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [ProductService, LoggingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
