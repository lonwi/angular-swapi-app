import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FilmObject } from 'src/app/interfaces/film';
import { TmdbSearchObject, TmdbConfigObject, TmdbSearchResultObject } from 'src/app/interfaces/tmdb';

import { SwapiService } from 'src/app/services/swapi.service';
import { TmdbService } from 'src/app/services/tmdb.service';
import { PlanetObject } from 'src/app/interfaces/planet';
import { StarshipObject } from 'src/app/interfaces/starship';
import { VehicleObject } from 'src/app/interfaces/vehicle';
import { PersonObject } from 'src/app/interfaces/person';

@Component({
  selector: 'app-film',
  templateUrl: './film.page.html',
  styleUrls: ['./film.page.scss'],
})
export class FilmPage implements OnInit {

  id: string;
  film: FilmObject;
  filmExtra: TmdbSearchResultObject;
  poster: string;
  people: PersonObject[];
  planets: PlanetObject[];
  starships: StarshipObject[];
  vehicles: VehicleObject[];

  constructor(
    private route: ActivatedRoute,
    private swapi: SwapiService,
    private tmdb: TmdbService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.loadData();
  }

  async loadData() {
    this.film = await this.swapi.getFilm(this.id);
    this.poster = await this.getFilmImage(this.film);
    this.filmExtra = await this.getFilmExtraData(this.film);

    const people: PersonObject[] = [];
    Promise.all(
      this.film.characters.map(async (item) => {
        const person = await this.swapi.get(item);
        people.push(person);
        return item;
      })
    ).then(() => this.people = people);

    const planets: PlanetObject[] = [];
    Promise.all(
      this.film.planets.map(async (item) => {
        const planet = await this.swapi.get(item);
        planets.push(planet);
        return item;
      })
    ).then(() => this.planets = planets);

    const starships: StarshipObject[] = [];
    Promise.all(
      this.film.starships.map(async (item) => {
        const starship = await this.swapi.get(item);
        starships.push(starship);
        return item;
      })
    ).then(() => this.starships = starships);

    const vehicles: VehicleObject[] = [];
    Promise.all(
      this.film.vehicles.map(async (item) => {
        const vehicle = await this.swapi.get(item);
        vehicles.push(vehicle);
        return item;
      })
    ).then(() => this.vehicles = vehicles);

    console.log(this.film);
    console.log(this.filmExtra);
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
  async getFilmExtraData(film: FilmObject): Promise<TmdbSearchResultObject> {
    try {
      const response: TmdbSearchObject = await this.tmdb.search(film.title);
      const results = await response.results.sort((a, b) => b.vote_count - a.vote_count);
      const result = await results[0];
      return result;
    } catch (e) {
      console.log('error', e);
    }
  }

}
