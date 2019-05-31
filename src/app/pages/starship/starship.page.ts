import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwapiService } from 'src/app/services/swapi.service';

import { FilmObject } from 'src/app/interfaces/film';
import { PersonObject } from 'src/app/interfaces/person';
import { StarshipObject } from 'src/app/interfaces/starship';


@Component({
  selector: 'app-starship',
  templateUrl: './starship.page.html',
  styleUrls: ['./starship.page.scss'],
})
export class StarshipPage implements OnInit {

  id: string;
  starship: StarshipObject;

  films: FilmObject[];
  people: PersonObject[];

  constructor(
    private route: ActivatedRoute,
    private swapi: SwapiService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.loadData();
  }

  async loadData() {
    this.starship = await this.swapi.getStarship(this.id);

    const films: FilmObject[] = [];
    Promise.all(
      this.starship.films.map(async (item) => {
        const film = await this.swapi.get(item);
        films.push(film);
        return item;
      })
    ).then(() => this.films = films);

    const people: PersonObject[] = [];
    Promise.all(
      this.starship.pilots.map(async (item) => {
        const person = await this.swapi.get(item);
        people.push(person);
        return item;
      })
    ).then(() => this.people = people);

    return this.starship;
  }

  isNumber(value: any): boolean {
    return !isNaN(value) ? true : false;
  }

}
