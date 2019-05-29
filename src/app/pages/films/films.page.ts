import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { SwapiService } from 'src/app/services/swapi.service';
import { TmdbService } from 'src/app/services/tmdb.service';
import { ApiResponseObject } from 'src/app/interfaces/api-response';
import { FilmObject } from 'src/app/interfaces/film';
import { TmdbSearchObject, TmdbConfigObject } from 'src/app/interfaces/tmdb';

@Component({
  selector: 'app-films',
  templateUrl: './films.page.html',
  styleUrls: ['./films.page.scss'],
})
export class FilmsPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  apiResonse: ApiResponseObject;
  films: FilmObject[];
  posters: string[] = [];

  constructor(
    private swapi: SwapiService,
    private tmdb: TmdbService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(): void {
    this.tmdb.configuration().then(() => {
      this.getApiData().then((res) => {
        if (res) {
          const films = res.results.sort((a, b) => a.episode_id - b.episode_id);
          console.log(films);
          this.swapi.getId(films[0].url);
          Promise.all(
            films
              .map(async (film) => {
                const image = await this.getFilmImage(film);
                this.posters.push(image);
              }),
          ).then(() => this.films = films);
        }
      });
    });
  }

  async getApiData(): Promise<ApiResponseObject> {
    try {
      const next = this.apiResonse ? this.apiResonse.next : '';
      return await this.swapi.getFilms(next);
    } catch (e) {
      console.log('error', e);
    }
  }

  async getFilmImage(film: FilmObject): Promise<string> {
    try {
      const response: TmdbSearchObject = await this.tmdb.search(film.title);
      const results = await response.results.sort((a, b) => b.vote_count - a.vote_count);
      const config: TmdbConfigObject = await this.tmdb.configuration();
      const poster = await config.images.secure_base_url + 'w780' + results[0].poster_path;
      return poster;
    } catch (e) {
      console.log('error', e);
    }
  }
}
