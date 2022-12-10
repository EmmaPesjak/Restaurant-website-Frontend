import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { Restaurant } from '../restaurant';

@Component({
  selector: 'app-restaurant-info',
  templateUrl: './restaurant-info.component.html',
  styleUrls: ['./restaurant-info.component.css']
})

export class RestaurantInfoComponent {

    restaurant!: Restaurant | undefined;
    restaurantName: string = "White Lotus";  //Här ska det inte vara hårdkodat :)

    constructor(private backend: BackendService) {
      this.restaurant = undefined; 
      //this.restaurantName = restaurantName
    }
  
    ngOnInit(): void {
      this.getRestaurant();
    }
  
  
    getRestaurant() {
      this.backend.getRestaurant(this.restaurantName)
        .then(restaurant => {
          this.restaurant = restaurant;
        })
        .catch(error => console.error(`An error occurred getting the restaurant: ${error}`));
    }

}
