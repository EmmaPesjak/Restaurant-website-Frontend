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
    this.getNeighborhoodsWithRestaurants();
  }


  getNeighborhoodsWithRestaurants() {
    this.backend.getNeighborhoodsWithRestaurants()
      .then(neighborhoods => {
        this.neighborhoods = neighborhoods;
      })
      .catch(error => console.error(`An error occurred getting all neighborhoods and restaurants: ${error}`));
  }

  showDetails(restaurantName: string) {
    console.log(restaurantName)
  }

  changeNeighborhood(neighborhoodName: string) {
    //töm neighborhoods och hämta igen, kanske ingen optimal lösning men det är för att få med kravet get one
    this.neighborhoods = []

    if (neighborhoodName == "All") {
      this.getNeighborhoodsWithRestaurants();
    } else {
      this.backend.getNeighborhoodWithRestaurants(neighborhoodName)
      .then(neighborhood => {
        this.neighborhoods = [neighborhood];
        console.log(neighborhood)
      })
      .catch(error => console.error(`An error occurred getting the neighborhood and restaurants: ${error}`));
    }
  
  }
}
