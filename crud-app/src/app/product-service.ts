import {LoggingService} from "./logging.service";
import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, throwError} from "rxjs";
import {Product} from "./product.model";

@Injectable() /*This means that something will be injected into the service (in our case "LogginService")*/
export class ProductService {
  //Here we initiate just one Product as an example. Other Products will be retrieved from BE
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
    const aProduct: Product ={name: name, description: description, price: price};
    this.logginService.logMessage('Add new product: ' + JSON.stringify(aProduct));

    this.http.post<Product>('http://localhost:8080/products',
      aProduct,
      {headers: new HttpHeaders({'Content-Type': 'application/json'})})
      .subscribe( {
        next: (v) => {
          this.products.push(v);
          this.logginService.logMessage('Add [Product] to FE: ' + JSON.stringify(v))
        },
        error: (e) => this.logginService.logMessage('Add error: ' + JSON.stringify(e)),
        complete: () => {
        this.logginService.logMessage('[Add] complete')
        }
      })
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
        id: aProduct.id
      },
    };

    // 1.2 Run HTTP-Delete
    this.http.delete('http://localhost:8080/products', options).subscribe({
      next: (v) => this.logginService.logMessage('Delete result: ' + JSON.stringify(v)),
      error: (e) => this.logginService.logMessage('Delete error: ' + JSON.stringify(e)),
      complete: () => {
        // When http-delete it successfully completeted in BE then we can update a list in FE
        this.products.splice(indexArray, 1);
        this.logginService.logMessage('Delete Id: ' + indexArray);
        this.logginService.logMessage('complete')
      }
    })

    //2. Delete a product from FE-array (by its [index])
    // this.products.splice(indexArray, 1);
    // this.logginService.logMessage('Delete Id: ' + indexArray);
  }


  public fetchProducts(){
    this.http.get<Product>('http://localhost:8080/products')
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
        }),
        catchError(errorRes => {
          this.logginService.logMessage('Error while fetched products: ' + JSON.stringify(errorRes));

          //Send to analytics server or do whatever you need
          return throwError(errorRes);
        })
      )
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


  public updateProduct(product: Product) {
    this.logginService.logMessage('Update product: ' + JSON.stringify(product))
    //TODO: implement logic
  }
}
