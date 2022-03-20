import {LoggingService} from "./logging.service";
import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {Product} from "./product.model";

@Injectable() /*This means that something will be injected into the service (in our case "LogginService")*/
export class ProductService {
  products: Product[] = [
    {
      name: 'Bike',
      description: 'Gazelle',
      price: '500'
    },
    {
      name: 'Bike1',
      description: 'Gazelle with 2 wills',
      price: '600'
    },
    {
      name: 'Bike2',
      description: 'Gazelle with 3 weels',
      price: '700'
    }
  ];
  constructor(private http: HttpClient, private logginService: LoggingService){}

  //Add an event to enable 'cross-component communication'
  productUpdated = new EventEmitter<string>();

  addProduct(name: string, description: string, price: string){
    this.products.push({name: name, description: description, price: price});
    this.logginService.logMessage('Add new product: ' + name);
  }

  deleteProduct(id: number) {
    this.products.splice(id, 1);
    this.logginService.logMessage('Delete Id: ' + id);
    //delete this.products[id];
  }


  public fetchProducts(){
    this.http
      .get<Product>('http://localhost:8080/products')
      .pipe(map(responseData => {
          const prodArray: Product[] = [];
          for(const key in responseData){
            prodArray.push({name: responseData[key].name, description: responseData[key].description, price: responseData[key].price});
          }
          return prodArray;
      }
      ))
      .subscribe(productsArray => {
        this.logginService.logMessage('---> products: ' + productsArray);
        //this.products = productsArray;
      })
  }

}
