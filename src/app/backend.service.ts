import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Neighborhood } from './neighborhood';
import { Restaurant } from './restaurant';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  readonly API_URL = "https://empe2105-project-backend-dt190g.azurewebsites.net";

  constructor(private http: HttpClient) { }


  getNeighborhoodsWithRestaurants(): Promise<Neighborhood[]> {
    const endpoint = this.API_URL + '/api/all';
    const responseObservable = this.http.get<Neighborhood[]>(endpoint);
    const responsePromise = firstValueFrom(responseObservable);
    return responsePromise;
  }

  getNeighborhoodWithRestaurants(neighborhood: string): Promise<Neighborhood> {
    const endpoint = this.API_URL + '/api/neighborhood/' + neighborhood;
    const responseObservable = this.http.get<Neighborhood>(endpoint);
    const responsePromise = firstValueFrom(responseObservable);
    return responsePromise;
  }


  //  hur fungerar det här när det de har olika många attribut?
  getNeighborhoods(): Promise<Neighborhood[]> {
    const endpoint = this.API_URL + '/api/neighborhoods';
    const responseObservable = this.http.get<Neighborhood[]>(endpoint);
    const responsePromise = firstValueFrom(responseObservable);
    return responsePromise;
  }


  getRestaurants(): Promise<Restaurant[]> {
    const endpoint = this.API_URL + '/api/restaurants';
    const responseObservable = this.http.get<Restaurant[]>(endpoint);
    const responsePromise = firstValueFrom(responseObservable);
    return responsePromise;
  }

  getRestaurant(restaurant: string): Promise<Restaurant> {
    const endpoint = this.API_URL + '/api/restaurants/' + restaurant;
    const responseObservable = this.http.get<Restaurant>(endpoint);
    const responsePromise = firstValueFrom(responseObservable);
    return responsePromise;
  }

  updateRestaurant(restaurant: string, owner: string) {
    const endpoint = this.API_URL + '/api/restaurants/' + restaurant;
    const body = {
      //name: restaurant,  //tror inte jag behöver den
      owner: owner
    };
    const responseObservable = this.http.put<Restaurant>(endpoint, body);
    const responsePromise = firstValueFrom(responseObservable);
    return responsePromise;
  }

  addRestaurant(restaurant: Restaurant) {
    const endpoint = this.API_URL + '/api/restaurants';
    const body = {
      name: restaurant.name,
      rating: restaurant.rating,
      address: restaurant.address,
      neighborhood: restaurant.neighborhood,
      owner: restaurant.owner,
      cuisine: restaurant.cuisine,
      headChef: restaurant.headChef,
      priceRange: restaurant.priceRange,
      michelinStars: restaurant.michelinStars,
      guestsPerYear: restaurant.guestsPerYear,
      phone: restaurant.phone,
      noOfReviews: restaurant.noOfReviews,
      latestReview: restaurant.latestReview
    };
    const responseObservable = this.http.post<Restaurant>(endpoint, body);
    const responsePromise = firstValueFrom(responseObservable);
    return responsePromise;
  }

  deleteRestaurant(restaurantName: string) {
    const endpoint = this.API_URL + '/api/restaurants/' + restaurantName;
    const responseObservable = this.http.delete<Restaurant>(endpoint);
    const responsePromise = firstValueFrom(responseObservable);
    return responsePromise;
  }
}
