import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { TmdbConfig, TmdbSearch } from '../interfaces/tmdb';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  private baseUrl: string = 'https://api.themoviedb.org/3/';
  private apiKey: string = '57d094594e3321dfbd565f597b644089';

  // config: TmdbConfig;

  constructor(
    private api: ApiService,
    private storage: Storage,
  ) { }

  async get(endpoint: string, options: any): Promise<any> {
    try {
      const key = `${endpoint}${options.params.query ? ' ' + options.params.query : ''}`;
      let respone = await this.storage.get(key);
      if (!respone) {
        respone = await this.api.get(endpoint, options);
        respone = await this.storage.set(key, respone);
      }
      return respone;
    } catch (e) {
      console.log('error', e);
    }
  }

  async search(query: string, year?: string): Promise<TmdbSearch> {
    try {
      const endpoint = await this.api.getEndpoint(this.baseUrl, 'search/movie');
      const options = {
        params: {
          api_key: this.apiKey,
          include_adult: true,
          query,
          year,
        }
      };
      const respone = await this.get(endpoint, options);
      return respone;
    } catch (e) {
      console.log('error', e);
    }
  }

  async configuration(): Promise<TmdbConfig> {
    try {
      const endpoint = await this.api.getEndpoint(this.baseUrl, 'configuration');
      const options = {
        params: {
          api_key: this.apiKey,
        }
      };
      // if (this.config) {
      //   return await this.config;
      // } else {
      //   return await this.api.get(endpoint, options).then((config) => this.config = config);
      // }
      // const respone = await this.config ? this.config : this.api.get(endpoint, options).then((config) => this.config = config);
      const respone = await this.get(endpoint, options);
      return respone;
    } catch (e) {
      console.log('error', e);
    }
  }
}
