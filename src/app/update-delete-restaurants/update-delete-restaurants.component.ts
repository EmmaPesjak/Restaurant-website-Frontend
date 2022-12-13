import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { Restaurant } from '../restaurant';

@Component({
  selector: 'app-update-delete-restaurants',
  templateUrl: './update-delete-restaurants.component.html',
  styleUrls: ['./update-delete-restaurants.component.css']
})
export class UpdateDeleteRestaurantsComponent {

  restaurants: Restaurant[];
  thisRestaurant: Restaurant | undefined;

  prices = ["$", "$$", "$$$"];
  stars = [0, 1, 2, 3];

  constructor(private backend: BackendService) {
    this.restaurants = []; 
  }

  ngOnInit(): void {
    this.getRestaurants();
  }


  getRestaurants() {
    this.backend.getRestaurants()
      .then(restaurants => {
        this.restaurants = restaurants;
      })
      .catch(error => console.error(`An error occurred getting all restaurants: ${error}`));
  }


  getRestaurantIndex(restaurant: Restaurant) {
    return this.restaurants.findIndex(restaurantInArray => restaurantInArray.name == restaurant.name);
  }


  deleteRestaurant(restaurantName: string) {

    this.backend.deleteRestaurant(restaurantName)
      .then(deletedRestaurant => {
        const restaurantIndex = this.getRestaurantIndex(deletedRestaurant);

        // Do nothing if the restaurant does not exist.
        if (restaurantIndex == -1) {
          return;
        }

        //Remove it from the array.
        this.restaurants.splice(restaurantIndex, 1);
      })
      .catch(error => console.error(`An error occurred when deleting the restaurant: ${error}`));
  }
  
  updateRestaurant(restaurant: Restaurant, event: any) {

    this.backend.updateRestaurant(restaurant.name, event.value);
    
  }
}
