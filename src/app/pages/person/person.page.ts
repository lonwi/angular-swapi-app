import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonObject } from 'src/app/interfaces/person';
import { SwapiService } from 'src/app/services/swapi.service';
import { FilmObject } from 'src/app/interfaces/film';

import { AVATARS } from 'src/app/avatars';
import { PlanetObject } from 'src/app/interfaces/planet';
import { VehicleObject } from 'src/app/interfaces/vehicle';
import { StarshipObject } from 'src/app/interfaces/starship';
import { SpecieObject } from 'src/app/interfaces/specie';

@Component({
  selector: 'app-person',
  templateUrl: './person.page.html',
  styleUrls: ['./person.page.scss'],
})
export class PersonPage implements OnInit {

  id: string;
  person: PersonObject;
  films: FilmObject[];
  species: SpecieObject[];
  starships: StarshipObject[];
  vehicles: VehicleObject[];
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
    this.person = await this.swapi.getPerson(this.id);

    const films: FilmObject[] = [];
    Promise.all(
      this.person.films.map(async (item) => {
        const film = await this.swapi.get(item);
        films.push(film);
        return item;
      })
    ).then(() => this.films = films);

    const species: SpecieObject[] = [];
    Promise.all(
      this.person.species.map(async (item) => {
        const specie = await this.swapi.get(item);
        species.push(specie);
        return item;
      })
    ).then(() => this.species = species);

    const starships: StarshipObject[] = [];
    Promise.all(
      this.person.starships.map(async (item) => {
        const starship = await this.swapi.get(item);
        starships.push(starship);
        return item;
      })
    ).then(() => this.starships = starships);

    const vehicles: VehicleObject[] = [];
    Promise.all(
      this.person.vehicles.map(async (item) => {
        const vehicle = await this.swapi.get(item);
        vehicles.push(vehicle);
        return item;
      })
    ).then(() => this.vehicles = vehicles);
    
    const homeworld: PlanetObject = await this.swapi.get(this.person.homeworld);
    this.homeworld = homeworld;

    // const people: PersonObject[] = [];
    // Promise.all(
    //   this.planet.residents.map(async (item) => {
    //     const person = await this.swapi.get(item);
    //     people.push(person);
    //     return item;
    //   })
    // ).then(() => this.people = people);

    console.log(this.person);
    return this.person;
  }

  isNumber(value: any): boolean {
    return !isNaN(value) ? true : false;
  }

  getAvatar(character: PersonObject): string {
    const avatar = AVATARS.find((item) => character.name === item.name);
    return avatar.photo ? avatar.photo : 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw==';
  }

}
