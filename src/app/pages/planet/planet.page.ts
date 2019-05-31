import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwapiService } from 'src/app/services/swapi.service';
import { PlanetObject } from 'src/app/interfaces/planet';
import { FilmObject } from 'src/app/interfaces/film';
import { PersonObject } from 'src/app/interfaces/person';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.page.html',
  styleUrls: ['./planet.page.scss'],
})
export class PlanetPage implements OnInit {

  id: string;
  planet: PlanetObject;
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
    this.planet = await this.swapi.getPlanet(this.id);

    const films: FilmObject[] = [];
    Promise.all(
      this.planet.films.map(async (item) => {
        const film = await this.swapi.get(item);
        films.push(film);
        return item;
      })
    ).then(() => this.films = films);

    const people: PersonObject[] = [];
    Promise.all(
      this.planet.residents.map(async (item) => {
        const person = await this.swapi.get(item);
        people.push(person);
        return item;
      })
    ).then(() => this.people = people);

    return this.planet;
  }

  isNumber(value: any): boolean {
    return !isNaN(value) ? true : false;
  }

}
