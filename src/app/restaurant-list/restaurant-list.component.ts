import { Component } from '@angular/core';
import { Restaurant } from '../restaurant';
import { BackendService } from '../backend.service';
import { Neighborhood } from '../neighborhood';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent {

  // allt här ska ju inte vara här, bara testar
  restaurants: Restaurant[];
  neighborhoods: Neighborhood[];

  constructor(private backend: BackendService) {
    this.restaurants = []; 
    this.neighborhoods = [];
  }

   ngOnInit(): void {
    this.getNeighborhoodWithRestaurants();
  }


  getNeighborhoodWithRestaurants() {
    this.backend.getNeighborhoodsWithRestaurants()
      .then(neighborhoods => {
        this.neighborhoods = neighborhoods;
      })
      .catch(error => console.error(`An error occurred getting all restaurants: ${error}`));
  }
}
