import { Component, EventEmitter, Output } from '@angular/core';
import { BackendService } from '../backend.service';
import { Restaurant } from '../restaurant';
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})

/**
 * Component for adding restaurants.
 */
export class AddRestaurantComponent {

  name: string;
  rating?: number;
  address: string;
  neighborhood: string;
  owner: string;
  cuisine: string;
  headChef: string;
  priceRange: string;
  michelinStars?: number;
  guestsPerYear?: number;
  phone: string;
  noOfReviews?: number;
  latestReview: string;

  // Arrays for the selects, would be better to define in the database and require through an endpoint, but that was not
  // necessary for this project.
  neighborhoods = ["Manhattan", "Brooklyn", "The Bronx", "Staten Island", "Queens"];
  prices = ["$", "$$", "$$$"];
  stars = [0, 1, 2, 3];

  message: string | undefined;

  // Emitter for telling the restaurant list in the parent component that a new restaurant has been added.
  @Output() newRestaurantEvent: EventEmitter<Restaurant>;

  constructor(private backend: BackendService) {
    this.name = "";
    this.rating = undefined;
    this.address = "";
    this.neighborhood = "";
    this.owner = "";
    this.cuisine = "";
    this.headChef = "";
    this.priceRange = "";
    this.michelinStars = undefined;
    this.guestsPerYear = undefined;
    this.phone = "";
    this.noOfReviews = undefined;
    this.latestReview = "";
    this.newRestaurantEvent = new EventEmitter<Restaurant>();
  }

  /**
   * Method for adding a restaurant, communicate all input to the backend service.
   * Since the required attribute is used in each form item in the HTML, and selects with 
   * crucial values (such as neighborhoods) are implemented, no further validation of the
   * user input is needed here.
   */
  addRestaurant() {
    let addRestaurantPromise: Promise<Restaurant>;

    addRestaurantPromise = this.backend.addRestaurant({
    name: this.name,
    rating: this.rating ?? 0,
    address: this.address,
    neighborhood: this.neighborhood,
    owner: this.owner,
    cuisine: this.cuisine,
    headChef: this.headChef,
    priceRange: this.priceRange,
    michelinStars: this.michelinStars ?? 0,
    guestsPerYear: this.guestsPerYear ?? 0,
    phone: this.phone,
    noOfReviews: this.noOfReviews ?? 0,
    latestReview: this.latestReview
  });

  // Call the handle methods depending on the outcome of the promise.
  addRestaurantPromise
    .then(restaurant => this.handleAddedRestaurant(restaurant))
    .catch(error => this.handleError(error));
  }

  /**
   * Clears the user input and displays a message that the restaurant has been added.
   * @param restaurant is the restaurant that has been added.
   */
  handleAddedRestaurant(restaurant: Restaurant) {

    // Clear user input.
    this.name = "";
    this.rating = undefined;
    this.address = "";
    this.neighborhood = "";
    this.owner = "";
    this.cuisine = "";
    this.headChef = "";
    this.priceRange = "";
    this.michelinStars = undefined;
    this.guestsPerYear = undefined;
    this.phone = "";
    this.noOfReviews = undefined;
    this.latestReview = "";

    // Create and display a success message.
    const message: string = `The restaurant ${restaurant.name} was added`;
    this.displayMessage(message);

    // Emit the restaurant so that the parent component can update the list of restaurants.
    this.newRestaurantEvent.emit(restaurant)
  }

  /**
   * Handles errors when adding restaurants. Will occur if the user does not enter a unique 
   * name for the restaurant to add.
   * @param error is the error thrown by the client.
   */
  handleError(error: HttpErrorResponse) {
    console.error(`error adding restaurant: ${error.status} ${error.statusText}`);
    const message: string = error.error.error;
    // Display the error message.
    this.displayMessage(message);
  }

  /**
   * Displays a message when the user is trying to add a restaurant.
   * @param message is the message to display.
   */
  displayMessage(message: string) {
    this.message = message; // hides the message if message parameter is undefined

    // Set a timeout that ensures that the message is only displayed for 4 seconds.
    setTimeout(() => {
      this.message = undefined; 
    },
      4000);
  }
}
