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
  films: FilmObject[] = [];
  people: PersonObject[] = [];

  constructor(
    private route: ActivatedRoute,
    private swapi: SwapiService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.loadData();
  }

  async loadData() {
    this.planet = await this.swapi.getPlanete(this.id);
    this.planet.films.map(async (item) => {
      const film = await this.swapi.get(item);
      this.films.push(film);
      return item;
    });
    this.planet.residents.map(async (item) => {
      const person = await this.swapi.get(item);
      this.people.push(person);
      return item;
    });
    console.log(this.planet);
    return this.planet;
  }

}
