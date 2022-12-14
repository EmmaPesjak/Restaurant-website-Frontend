import { Component, EventEmitter, Output } from '@angular/core';
import { BackendService } from '../backend.service';
import { Restaurant } from '../restaurant';
import { HttpErrorResponse } from "@angular/common/http";


@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
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

  //ej hådekoda dessa? hämta?
  neighborhoods = ["Manhattan", "Brooklyn", "The Bronx", "Staten Island", "Queens"];
  prices = ["$", "$$", "$$$"];
  stars = [0, 1, 2, 3];

  message: string | undefined;

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
   * 
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

  addRestaurantPromise
    .then(restaurant => this.handleAddedRestaurant(restaurant))
    .catch(error => this.handleError(error));
  }

  /**
   * 
   * @param restaurant 
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

    // Create a success message.
    const message: string = `The restaurant ${restaurant.name} was added`;

    this.displayMessage(message);
  }

  /**
   * 
   * @param error 
   */
  handleError(error: HttpErrorResponse) {
    console.error(`error adding restaurant: ${error.status} ${error.statusText}`);
    const message: string = error.error.error;

    this.displayMessage(message);
  }

  /**
   * Displays the specified Message in the add user form. To hide the message
   * pass undefined as the message (first argument).
   * @param message the message to display
   * @param autoHide true if the message should be hidden after 5 seconds
   */
  displayMessage(message: string, autoHide: boolean = true) {
    this.message = message; // hides the message if message parameter is undefined

    if (autoHide) {
      // Set a timer for the message.
      setTimeout(() => {
        this.message = undefined; 
        window.location.reload(); // reload the window so the restaurant list is updated.
      },
        4000);
    }
  }
}
