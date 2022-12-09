import { Component } from '@angular/core';
import { Restaurant } from '../restaurant';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent {

  // allt här ska ju inte vara här, bara testar
  restaurants: Restaurant[];

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
}
