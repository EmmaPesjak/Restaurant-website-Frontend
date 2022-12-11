import { Component, EventEmitter, Output } from '@angular/core';
import { BackendService } from '../backend.service';
import { Restaurant } from '../restaurant';
import { HttpErrorResponse } from "@angular/common/http";
import { RestaurantInfoComponent } from '../restaurant-info/restaurant-info.component';

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

    this.newRestaurantEvent = new EventEmitter<Restaurant>();
  }

  addRestaurant() {
    let addRestaurantPromise: Promise<Restaurant>;

    //Här behövs ju massa validering och ett meddeland om att det gick/inte gick
    
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
  }
}
