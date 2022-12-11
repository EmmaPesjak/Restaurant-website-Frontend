import { Restaurant } from "./restaurant";

export interface Neighborhood {
    name: string;
    size: number
    population: number;
    restaurants: Restaurant[] | undefined;
}
