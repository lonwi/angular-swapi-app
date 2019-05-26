import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { TmdbConfig, TmdbSearch } from '../interfaces/tmdb';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  private baseUrl: string = 'https://api.themoviedb.org/3/';
  private apiKey: string = '57d094594e3321dfbd565f597b644089';

  config: TmdbConfig;

  constructor(
    private api: ApiService
  ) { }

  async search(query: string, year?: string): Promise<TmdbSearch> {
    try {
      const url = await this.api.getUrl(this.baseUrl, 'search/movie');
      const options = {
        params: {
          api_key: this.apiKey,
          include_adult: true,
          query,
          year,
        }
      };
      const respone = await this.api.get(url, options);
      return respone;
    } catch (e) {
      console.log('error', e);
    }
  }

  async configuration(): Promise<TmdbConfig> {
    try {
      const url = await this.api.getUrl(this.baseUrl, 'configuration');
      const options = {
        params: {
          api_key: this.apiKey,
        }
      };
      const respone = await this.config ? this.config : this.api.get(url, options).then((config) => this.config = config);
      return respone;
    } catch (e) {
      console.log('error', e);
    }
  }
}
