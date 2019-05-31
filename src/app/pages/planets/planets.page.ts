import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { IonInfiniteScroll, IonContent, IonList, Platform } from '@ionic/angular';
import { SwapiService } from 'src/app/services/swapi.service';
import { ApiResponseObject } from 'src/app/interfaces/api-response';
import { PlanetObject } from 'src/app/interfaces/planet';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.page.html',
  styleUrls: ['./planets.page.scss'],
})
export class PlanetsPage implements OnInit, OnDestroy {

  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonList, { read: ElementRef }) planetsList: ElementRef;

  apiResonse: ApiResponseObject;
  planets: PlanetObject[];

  constructor(
    private swapi: SwapiService,
    private platform: Platform
  ) { }

  ngOnInit(): void {
    this.loadData();
  }
  ngOnDestroy(): void {
    delete this.apiResonse;
    delete this.planets;
  }

  async loadData(event?: any) {
    const response = await this.getApiData();
    this.apiResonse = response;

    const planets = this.apiResonse.results;

    if (!this.planets) {
      this.planets = [];
    }
    this.planets = this.planets.concat(planets);
    if (event) {
      this.infiniteScroll.complete();
      if (!this.apiResonse.next) {
        this.infiniteScroll.disabled = true;
      }
    }
    setTimeout(() => {
      if (this.platform.height() > this.planetsList.nativeElement.offsetHeight) {
        this.loadData();
      }
    }, 100);

    return this.planets;
  }


  async getApiData(): Promise<ApiResponseObject> {
    try {
      const next = this.apiResonse ? this.apiResonse.next : '';
      return await this.swapi.getPlanets(next);
    } catch (e) {
      console.log('error', e);
    }
  }

}
