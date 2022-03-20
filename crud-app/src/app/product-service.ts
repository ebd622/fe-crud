import {LoggingService} from "./logging.service";
import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, throwError} from "rxjs";
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

  deleteProduct(indexArray: number) {
    // 1. Delete a product from BE (by its [id])
    const aProduct: Product = this.products[indexArray];
    this.logginService.logMessage('Delete product: ' + JSON.stringify(aProduct));
    // 1.1 Create options
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: 1,
        name: 'test',
      },
    };

    // 1.2
    this.http
      .delete('http://localhost:8080/products', options)
      .subscribe(result => {
        this.logginService.logMessage('Delete result: ' + result);
      })

    //2. Delete a product from FE-array (by its [index])
    this.products.splice(indexArray, 1);
    this.logginService.logMessage('Delete Id: ' + indexArray);
    //delete this.products[id];
  }


  public fetchProducts(){
    this.http
      .get<Product>('http://localhost:8080/products')
      .pipe(map(responseData => {
          this.logginService.logMessage('Fetched products: ' + JSON.stringify(responseData));
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
