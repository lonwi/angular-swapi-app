import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Film } from 'src/app/interfaces/film';
import { TmdbSearch, TmdbConfig, TmdbSearchResult } from 'src/app/interfaces/tmdb';

import { SwapiService } from 'src/app/services/swapi.service';
import { TmdbService } from 'src/app/services/tmdb.service';

@Component({
  selector: 'app-film',
  templateUrl: './film.page.html',
  styleUrls: ['./film.page.scss'],
})
export class FilmPage implements OnInit {

  id: string;
  film: Film;
  filmExtra: TmdbSearchResult;
  poster: string;

  constructor(
    private route: ActivatedRoute,
    private swapi: SwapiService,
    private tmdb: TmdbService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.loadData();
    console.log(this.id);
  }

  async loadData() {
    this.film = await this.swapi.getFilm(this.id);
    this.poster = await this.getFilmImage(this.film);
    this.filmExtra = await this.getFilmExtraData(this.film);
    console.log(this.film);
    console.log(this.filmExtra);
  }

  async getFilmImage(film: Film): Promise<string> {
    try {
      const response: TmdbSearch = await this.tmdb.search(film.title);
      const results = await response.results.sort((a, b) => b.vote_count - a.vote_count);
      const config: TmdbConfig = await this.tmdb.configuration();
      const poster = await config.images.secure_base_url + 'w780' + results[0].poster_path;
      return poster;
    } catch (e) {
      console.log('error', e);
    }
  }
  async getFilmExtraData(film: Film): Promise<TmdbSearchResult> {
    try {
      const response: TmdbSearch = await this.tmdb.search(film.title);
      const results = await response.results.sort((a, b) => b.vote_count - a.vote_count);
      const result = await results[0];
      return result;
    } catch (e) {
      console.log('error', e);
    }
  }

}
