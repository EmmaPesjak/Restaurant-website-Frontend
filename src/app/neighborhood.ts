import { Restaurant } from "./restaurant";

/**
 * Represents a neighborhood and possibly its restaurants.
 */
export interface Neighborhood {
    name: string;
    size: number
    population: number;
    restaurants: Restaurant[] | undefined;
}
