import {Injectable} from "@angular/core";
import {LoggingService} from "./logging.service";

@Injectable()
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
}
