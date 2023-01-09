import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Neighborhood } from './neighborhood';
import { Restaurant } from './restaurant';

// Allow the service to be visible in the entire app.
@Injectable({
  providedIn: 'root'
})

/**
 * Class responsible for communication with the backend.
 */
export class BackendService {

  readonly API_URL = "https://empe2105-project-ht22-backend-dt190g.azurewebsites.net";

  constructor(private http: HttpClient) { }

  /**
   * Get all neighborhoods and restaurants.
   * @returns a Promise that resolves to an array of neighborhoods with their restaurants.
   */
  getNeighborhoodsWithRestaurants(): Promise<Neighborhood[]> {
    const endpoint = this.API_URL + '/api/all';
    const responseObservable = this.http.get<Neighborhood[]>(endpoint);
    const responsePromise = firstValueFrom(responseObservable);
    return responsePromise;
  }

  /**
   * Get a specific neighborhood with its restaurants.
   * @param neighborhood is the name of the neighborhood to get.
   * @returns a Promise that resolves to a neighborhood.
   */
  getNeighborhoodWithRestaurants(neighborhood: string): Promise<Neighborhood> {
    const endpoint = this.API_URL + '/api/neighborhoods/' + neighborhood;
    const responseObservable = this.http.get<Neighborhood>(endpoint);
    const responsePromise = firstValueFrom(responseObservable);
    return responsePromise;
  }

  /**
   * Get all restaurants.
   * @returns a Promise that resolves to an array of restaurants.
   */
  getRestaurants(): Promise<Restaurant[]> {
    const endpoint = this.API_URL + '/api/restaurants';
    const responseObservable = this.http.get<Restaurant[]>(endpoint);
    const responsePromise = firstValueFrom(responseObservable);
    return responsePromise;
  }

  /**
   * Update (PUT) a specific restaurant.
   * @param restaurant is the name of the restaurant to update.
   * @param michelinStars is the amount of stars to update with.
   * @returns a Promise that resolves to an updated restaurant.
   */
  updateRestaurant(restaurant: string, michelinStars: number) {
    const endpoint = this.API_URL + '/api/restaurants/' + restaurant;
    const body = {michelinStars: michelinStars};
    const responseObservable = this.http.put<Restaurant>(endpoint, body);
    const responsePromise = firstValueFrom(responseObservable);
    return responsePromise;
  }

  /**
   * Add (POST) a specific restaturant.
   * @param restaurant is the restaurant with all its attributes to add.
   * @returns a Promise that resolves to an added restaurant.
   */
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

  /**
   * Delete a specific restaurant.
   * @param restaurantName is the name of the restaurant to delete.
   * @returns a Promise that resolves to the deleted restaurant.
   */
  deleteRestaurant(restaurantName: string) {
    const endpoint = this.API_URL + '/api/restaurants/' + restaurantName;
    const responseObservable = this.http.delete<Restaurant>(endpoint);
    const responsePromise = firstValueFrom(responseObservable);
    return responsePromise;
  }
}
