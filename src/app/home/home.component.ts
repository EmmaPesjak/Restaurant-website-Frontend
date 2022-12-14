import { Component } from '@angular/core';
import { Restaurant } from '../restaurant';
import { BackendService } from '../backend.service';
import { Neighborhood } from '../neighborhood';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

/**
 * Parent component of the home page. Responsible for communicating with 
 * the backend service and displaying neighborhoods and restaurant information.
 */
export class HomeComponent {
  
  neighborhoods: Neighborhood[];
  currentRestaurant: Restaurant | undefined;
  showInfo = false;

  constructor(private backend: BackendService) {
    this.neighborhoods = [];
    this.currentRestaurant = undefined;
  }

  /**
   * Get the neighborhoods and restaurants on init.
   */
  ngOnInit(): void {
    this.getNeighborhoodsWithRestaurants();
  }

  /**
   * Method for getting the neighborhoods and their restaurants from the backend service.
   * Log errors if any occurs.
   */
  getNeighborhoodsWithRestaurants() {
    this.backend.getNeighborhoodsWithRestaurants()
      .then(neighborhoods => {
        this.neighborhoods = neighborhoods;
      })
      .catch(error => console.error(`An error occurred getting all neighborhoods and restaurants: ${error}`));
  }

  /**
   * Method for the details buttons, passes the restaurant to the child 
   * component restaurant-info in the HTML which displays all details of the restaurant. 
   * The showInfo boolean is set to true to make the child visible.
   * @param restaurant is the reataurant to be displayed.
   */
  showDetails(restaurant: Restaurant) {
    this.currentRestaurant = restaurant;
    this.showInfo = true;
  }

  /**
   * Method for changing the listed neighborhood/neighborhoods with restaurants. 
   * Communicates with the backend service for getting the neighborhood/s.
   * Getting the neighborhood from the backend on each click is not an optimal solution
   * but it showcases endpoint requirement 2 and since the database is quite small this should 
   * not be an issue.
   * @param neighborhoodName is the name of the neighborhood to list.
   */
  changeNeighborhood(neighborhoodName: string) {
    // Empty the array.
    this.neighborhoods = [];

    // Get all neighborhoods if All is selected.
    if (neighborhoodName == "All") {
      this.getNeighborhoodsWithRestaurants();
    } else {
      // Else get the specific neighborhood.
      this.backend.getNeighborhoodWithRestaurants(neighborhoodName)
      .then(neighborhood => {
        this.neighborhoods = [neighborhood];
      })
      .catch(error => console.error(`An error occurred getting the neighborhood and restaurants: ${error}`));
    }
  }
}
