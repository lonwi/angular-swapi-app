import { Component, OnInit } from '@angular/core';
import { SwapiService } from 'src/app/services/swapi.service';
import { TmdbService } from 'src/app/services/tmdb.service';
import { Films } from 'src/app/interfaces/films';
import { Film } from 'src/app/interfaces/film';
import { TmdbSearch, TmdbConfig } from 'src/app/interfaces/tmdb';

@Component({
  selector: 'app-films',
  templateUrl: './films.page.html',
  styleUrls: ['./films.page.scss'],
})
export class FilmsPage implements OnInit {

  apiResponse: Films;
  films: Film[] = [];
  posters: string[] = [];

  constructor(
    private swapi: SwapiService,
    private tmdb: TmdbService,
  ) { }

  ngOnInit() {
    this.getApiData().then((res) => {
      const films = res.results.sort((a, b) => a.episode_id - b.episode_id);
      Promise.all(
        films
          .map(async (film) => {
            const image = await this.getFilmImage(film);
            this.posters.push(image);
          })
      ).then(() => this.films = films);
    });
  }

  async getApiData() {
    try {
      return await this.swapi.getFilms();
    } catch (e) {
      console.log('error', e);
    }
  }

  async getFilmImage(film: Film) {
    try {
      const response: TmdbSearch = await this.tmdb.search(film.title);
      const results = await response.results.sort((a, b) => b.vote_count - a.vote_count);
      const config: TmdbConfig = await this.tmdb.configuration();
      const result = await config.images.secure_base_url + 'w780' + results[0].poster_path;
      console.log(result);
      return result;
    } catch (e) {
      console.log('error', e);
    }
  }
}
