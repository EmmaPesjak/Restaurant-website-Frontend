import { Component, Input } from '@angular/core';
import { BackendService } from '../backend.service';
import { Restaurant } from '../restaurant';

@Component({
  selector: 'app-restaurant-info',
  templateUrl: './restaurant-info.component.html',
  styleUrls: ['./restaurant-info.component.css']
})

export class RestaurantInfoComponent {




  @Input() restaurant: Restaurant | undefined;






    // restaurant!: Restaurant | undefined;

    // constructor(private backend: BackendService) {
    //   this.restaurant = undefined; 
    //   //this.restaurantName = restaurantName
    // }
  
    // ngOnInit(): void {
    //   //this.getRestaurant(this.restaurantName);
    // }
  
  
    // getRestaurantAndShow(restaurantName: string) {
    //   console.log("Detta är child")
    //   this.backend.getRestaurant(restaurantName)
    //     .then(restaurant => {
    //       this.restaurant = restaurant;
    //     })
    //     .catch(error => console.error(`An error occurred getting the restaurant: ${error}`));
    // }

}
