import {LoggingService} from "./logging.service";
import {EventEmitter, Injectable} from '@angular/core';

@Injectable() /*This means that something will be injected into the service (in our case "LogginService")*/
export class ProductService {
  products = [
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
  constructor(private logginService: LoggingService){}

  //Add an event to enable 'cross-component communication'
  productUpdated = new EventEmitter<string>();

  addProduct(name: string, description: string, price: string){
    this.products.push({name: name, description: description, price: price});
    this.logginService.logMessage('Add new product: ' + name);
  }

  deleteProduct(id: number) {
    this.products.splice(id, 1);
    //delete this.products[id];
  }
}
