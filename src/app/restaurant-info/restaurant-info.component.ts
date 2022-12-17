import { Component, Input } from '@angular/core';
import { Restaurant } from '../restaurant';

@Component({
  selector: 'app-restaurant-info',
  templateUrl: './restaurant-info.component.html',
  styleUrls: ['./restaurant-info.component.css']
})

/**
 * Child component of the home page, displays restaurant information which it gets from the input decorator.
 */
export class RestaurantInfoComponent {
  @Input() restaurant: Restaurant | undefined;
}
