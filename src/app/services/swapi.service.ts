import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Films } from '../interfaces/films';


@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  private baseUrl: string = 'https://swapi.co/api/';

  constructor(
    private api: ApiService
  ) { }

  async getFilms(): Promise<Films> {
    try {
      const url = await this.api.getUrl(this.baseUrl, 'films/' );
      const respone = await this.api.get(url);
      return respone;
    } catch (e) {
      console.log('error', e);
    }
  }
  getFilm(id: string) {
  }
  getPeople() {

  }
  getPerson(id: string) {

  }
  getPlanets() {

  }
  getPlanete(id: string) {

  }
  getSpecies() {

  }
  getSpecie(id: string) {

  }
  getStarships() {

  }
  getStarship(id: string) {

  }
  getVehicles() {

  }
  getVehicle(id: string) {

  }
}
