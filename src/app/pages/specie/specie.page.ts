import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwapiService } from 'src/app/services/swapi.service';

import { FilmObject } from 'src/app/interfaces/film';
import { SpecieObject } from 'src/app/interfaces/specie';
import { PersonObject } from 'src/app/interfaces/person';
import { PlanetObject } from 'src/app/interfaces/planet';

@Component({
  selector: 'app-specie',
  templateUrl: './specie.page.html',
  styleUrls: ['./specie.page.scss'],
})
export class SpeciePage implements OnInit {

  id: string;
  specie: SpecieObject;

  films: FilmObject[];
  people: PersonObject[];
  homeworld: PlanetObject;

  constructor(
    private route: ActivatedRoute,
    private swapi: SwapiService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.loadData();
  }

  async loadData() {
    this.specie = await this.swapi.getSpecie(this.id);

    const films: FilmObject[] = [];
    Promise.all(
      this.specie.films.map(async (item) => {
        const film = await this.swapi.get(item);
        films.push(film);
        return item;
      })
    ).then(() => this.films = films);

    const people: PersonObject[] = [];
    Promise.all(
      this.specie.people.map(async (item) => {
        const person = await this.swapi.get(item);
        people.push(person);
        return item;
      })
    ).then(() => this.people = people);

    const homeworld: PlanetObject = await this.swapi.get(this.specie.homeworld);
    this.homeworld = homeworld;

    console.log(this.specie);
    return this.specie;
  }

  isNumber(value: any): boolean {
    return !isNaN(value) ? true : false;
  }

}
