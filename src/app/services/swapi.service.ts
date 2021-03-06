import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  private baseUrl: string = 'https://swapi.co/api/';

  constructor(
    private api: ApiService,
    private storage: Storage,
  ) { }

  async get(endpoint: string): Promise<any> {
    try {
      const key = `${endpoint}`;
      let respone = await this.storage.get(key);
      if (!respone) {
        respone = await this.api.get(endpoint);
        respone = await this.storage.set(key, respone);
      }
      return respone;
    } catch (e) {
      console.log('error', e);
    }
  }
  async getFilms(url?: string): Promise<any> {
    try {
      const endpoint = url ? url : await this.api.getEndpoint(this.baseUrl, 'films/');
      const respone = await this.get(endpoint);
      return respone;
    } catch (e) {
      console.log('error', e);
    }
  }
  async getFilm(id: string): Promise<any> {
    try {
      const endpoint = await this.api.getEndpoint(this.baseUrl, 'films/' + id);
      const respone = await this.get(endpoint);
      return respone;
    } catch (e) {
      console.log('error', e);
    }
  }
  async getPeople(url?: string): Promise<any> {
    try {
      const endpoint = url ? url : await this.api.getEndpoint(this.baseUrl, 'people/');
      const respone = await this.get(endpoint);
      return respone;
    } catch (e) {
      console.log('error', e);
    }
  }
  async getPerson(id: string): Promise<any> {
    try {
      const endpoint = await this.api.getEndpoint(this.baseUrl, 'people/' + id);
      const respone = await this.get(endpoint);
      return respone;
    } catch (e) {
      console.log('error', e);
    }
  }
  async getPlanets(url?: string): Promise<any> {
    try {
      const endpoint = url ? url : await this.api.getEndpoint(this.baseUrl, 'planets/');
      const respone = await this.get(endpoint);
      return respone;
    } catch (e) {
      console.log('error', e);
    }
  }
  async getPlanet(id: string): Promise<any> {
    try {
      const endpoint = await this.api.getEndpoint(this.baseUrl, 'planets/' + id);
      const respone = await this.get(endpoint);
      return respone;
    } catch (e) {
      console.log('error', e);
    }
  }
  async getSpecies(url?: string): Promise<any> {
    try {
      const endpoint = url ? url : await this.api.getEndpoint(this.baseUrl, 'species/');
      const respone = await this.get(endpoint);
      return respone;
    } catch (e) {
      console.log('error', e);
    }
  }
  async getSpecie(id: string): Promise<any> {
    try {
      const endpoint = await this.api.getEndpoint(this.baseUrl, 'species/' + id);
      const respone = await this.get(endpoint);
      return respone;
    } catch (e) {
      console.log('error', e);
    }
  }
  async getStarships(url?: string): Promise<any> {
    try {
      const endpoint = url ? url : await this.api.getEndpoint(this.baseUrl, 'starships/');
      const respone = await this.get(endpoint);
      return respone;
    } catch (e) {
      console.log('error', e);
    }
  }
  async getStarship(id: string): Promise<any> {
    try {
      const endpoint = await this.api.getEndpoint(this.baseUrl, 'starships/' + id);
      const respone = await this.get(endpoint);
      return respone;
    } catch (e) {
      console.log('error', e);
    }
  }
  async getVehicles(url?: string): Promise<any> {
    try {
      const endpoint = url ? url : await this.api.getEndpoint(this.baseUrl, 'vehicles/');
      const respone = await this.get(endpoint);
      return respone;
    } catch (e) {
      console.log('error', e);
    }
  }
  async getVehicle(id: string): Promise<any> {
    try {
      const endpoint = await this.api.getEndpoint(this.baseUrl, 'vehicles/' + id);
      const respone = await this.get(endpoint);
      return respone;
    } catch (e) {
      console.log('error', e);
    }
  }
  async getId(endpoint: string) {
    const parts = await endpoint.split('/');
    const id = await parts.pop() || await parts.pop();
    return id;
  }
}
