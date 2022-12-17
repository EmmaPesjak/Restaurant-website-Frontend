import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { Restaurant } from '../restaurant';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

/**
 * Parent component of the admin page. Responsible for communicating with the backend service 
 * and displaying a list of restaurants with update, delete and add options. 
 */
export class AdminComponent { 

  restaurants: Restaurant[];
  thisRestaurant: Restaurant | undefined;

  stars = [0, 1, 2, 3];

  constructor(private backend: BackendService) {
    this.restaurants = []; 
  }

  /**
   * Get the restaurants on init.
   */
  ngOnInit(): void {
    this.getRestaurants();
  }

  /**
   * Method for getting the restaurants from the backend service.
   * Log errors if any occurs.
   */
  getRestaurants() {
    this.backend.getRestaurants()
      .then(restaurants => {
        this.restaurants = restaurants;
      })
      .catch(error => console.error(`An error occurred getting all restaurants: ${error}`));
  }

  /**
   * Method for adding a restaurant to the list of restaurants.
   * @param restaurant is the resstaurant to add.
   */
  onNewRestaurant(restaurant: Restaurant) {
    this.restaurants.push(restaurant);
  }

  /**
   * Method for deleting a restaurant in the backend service.
   * @param restaurantName 
   */
  deleteRestaurant(restaurantName: string) {
    this.backend.deleteRestaurant(restaurantName)
      .then(deletedRestaurant => {
        // Get the index of the restaurant in the array.
        const restaurantIndex = this.restaurants.findIndex(
          restaurantInArray => restaurantInArray.name == deletedRestaurant.name);

        // Do nothing if the restaurant does not exist.
        if (restaurantIndex == -1) {
          return;
        }

        //Remove it from the array.
        this.restaurants.splice(restaurantIndex, 1);
      })
      .catch(error => console.error(`An error occurred when deleting the restaurant: ${error}`));
  }
  
  /**
   * Method for updating a restaurant.
   * @param restaurantName is the name of the restaurant.
   * @param event carries the value of the amount of stars to update with.
   */
  updateRestaurant(restaurantName: string, event: any) {
    this.backend.updateRestaurant(restaurantName, event.value);
  }
}
