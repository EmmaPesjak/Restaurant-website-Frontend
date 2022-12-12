import { Component } from '@angular/core';
import { Restaurant } from '../restaurant';
import { BackendService } from '../backend.service';
import { Neighborhood } from '../neighborhood';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  restaurants: Restaurant[];
  neighborhoods: Neighborhood[];
  currentRestaurant: Restaurant | undefined;
  showInfo = false;

  constructor(private backend: BackendService) {
    this.restaurants = []; 
    this.neighborhoods = [];
    this.currentRestaurant = undefined;
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
    this.showInfo = true;
    this.backend.getRestaurant(restaurantName)
      .then(restaurant => {
        this.currentRestaurant = restaurant;
      })
      .catch(error => console.error(`An error occurred getting the restaurant: ${error}`));
  }

  changeNeighborhood(neighborhoodName: string) {
    //töm neighborhoods och hämta igen, kanske ingen optimal lösning men det är för att få med kravet get one
    this.neighborhoods = [];

    if (neighborhoodName == "All") {
      this.getNeighborhoodsWithRestaurants();
    } else {
      this.backend.getNeighborhoodWithRestaurants(neighborhoodName)
      .then(neighborhood => {
        this.neighborhoods = [neighborhood];
      })
      .catch(error => console.error(`An error occurred getting the neighborhood and restaurants: ${error}`));
    }
  
  }
}
