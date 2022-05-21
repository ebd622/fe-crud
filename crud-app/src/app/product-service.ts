import {LoggingService} from "./logging.service";
import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {Product} from "./product.model";

@Injectable() /*This means that something will be injected into the service (in our case "LogginService")*/
export class ProductService {
  // Here we initiate just one Product as an example (keep without [id]).
  // Other Products will be retrieved from BE
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
  productEdit = new EventEmitter<Product>();

  addProduct(name: string, description: string, price: string) : Observable<Product> {
    const aProduct: Product ={name: name, description: description, price: price};
    this.logginService.logMessage('Add new product: ' + JSON.stringify(aProduct));

    return this.http.post<Product>('http://localhost:8080/products',
      aProduct,
      {headers: new HttpHeaders({'Content-Type': 'application/json'})})
  }

  public updateProduct(aProduct: Product) : Observable<Product> {
    this.logginService.logMessage('Update product: ' + JSON.stringify(aProduct))
    return this.http.put<Product>('http://localhost:8080/products',
      aProduct,
      {headers: new HttpHeaders({'Content-Type': 'application/json'})})
  }


  public addProductToArray(aProduct: Product): void {
    this.products.push(aProduct);
  }

  public replaceProductInArray(aProduct: Product): void {
    for(let i=0; i < this.products.length; i++){
      this.logginService.logMessage(this.products[i].id); //use i instead of 0
      if(this.products[i].id == aProduct.id){
        this.products[i]=aProduct;
      }
    }
  }
  
  deleteProduct(indexArray: number) {
    // 1. Delete a product from BE (by its [id])
    const aProduct: Product = this.products[indexArray];
    this.logginService.logMessage('Delete product: ' + JSON.stringify(aProduct));

    // 2. Create options (can be also created "on a fly", see updateProduct() )
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: aProduct.id
      },
    };

    // 3. Run HTTP-Delete
    this.http.delete('http://localhost:8080/products', options).subscribe({
      next: (v) => this.logginService.logMessage('Delete result: ' + JSON.stringify(v)),
      error: (e) => this.logginService.logMessage('[Delete] error: ' + JSON.stringify(e)),
      complete: () => {
        // When http-delete it successfully completed in BE then we can update a list in FE
        this.products.splice(indexArray, 1);
        this.logginService.logMessage('Delete Id: ' + indexArray);
        this.logginService.logMessage('complete')
      }
    })
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
          this.logginService.logMessage('[Get] error: ' + JSON.stringify(errorRes));

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

}
