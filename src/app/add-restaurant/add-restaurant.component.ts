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

    // Tells Angular to create a new event emitter and that the 
    // data it emits is of type User (when a new user is successfully added).
    this.newRestaurantEvent = new EventEmitter<Restaurant>();
  }


  addRestaurant() {

  }

}
