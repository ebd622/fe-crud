import {LoggingService} from "./logging.service";
import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";
import {Product} from "./product.model";

@Injectable() /*This means that something will be injected into the service (in our case "LogginService")*/
export class ProductService {
  //Here we initiate just one Product as an example. Other Products will added from BE
  products: Product[] = [
    {
      name: 'Bike',
      description: 'Gazelle',
      price: '500'
    },
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
          // here [tmpProdArray] just an example of using [pipe:] and operator [map]
          const tmpProdArray: Product[] = [];
          for(const key in responseData){
            tmpProdArray.push({
              name: responseData[key].name,
              description: responseData[key].description,
              price: responseData[key].price,
              id: responseData[key].id
            });
          }
          return tmpProdArray;
      }
      ))
      .subscribe(prodArray => {
        // [prodArray] is the same as a returned [tmpProdArray]
        this.logginService.logMessage('---> products: ' + prodArray);
        for(const key in prodArray){
          this.products.push({
            name: prodArray[key].name,
            description: prodArray[key].description,
            price: prodArray[key].price,
            id: prodArray[key].id
          });
        }
      })
  }

}
