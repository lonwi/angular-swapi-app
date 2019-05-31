import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwapiService } from 'src/app/services/swapi.service';

import { FilmObject } from 'src/app/interfaces/film';
import { PersonObject } from 'src/app/interfaces/person';
import { VehicleObject } from 'src/app/interfaces/vehicle';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.page.html',
  styleUrls: ['./vehicle.page.scss'],
})
export class VehiclePage implements OnInit {

  id: string;
  vehicle: VehicleObject;

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
    this.vehicle = await this.swapi.getVehicle(this.id);

    const films: FilmObject[] = [];
    Promise.all(
      this.vehicle.films.map(async (item) => {
        const film = await this.swapi.get(item);
        films.push(film);
        return item;
      })
    ).then(() => this.films = films);

    const people: PersonObject[] = [];
    Promise.all(
      this.vehicle.pilots.map(async (item) => {
        const person = await this.swapi.get(item);
        people.push(person);
        return item;
      })
    ).then(() => this.people = people);
    
    console.log(this.vehicle);

    return this.vehicle;
  }

  isNumber(value: any): boolean {
    return !isNaN(value) ? true : false;
  }

}
