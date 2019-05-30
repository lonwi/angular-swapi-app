import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { IonInfiniteScroll, IonContent, IonList, Platform } from '@ionic/angular';
import { SwapiService } from 'src/app/services/swapi.service';
import { ApiResponseObject } from 'src/app/interfaces/api-response';


@Component({
  selector: 'app-species',
  templateUrl: './species.page.html',
  styleUrls: ['./species.page.scss'],
})
export class SpeciesPage implements OnInit, OnDestroy {

  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonList, { read: ElementRef }) speciesList: ElementRef;

  apiResonse: ApiResponseObject;
  species: any[];

  constructor(
    private swapi: SwapiService,
    private platform: Platform
  ) { }

  ngOnInit(): void {
    this.loadData();
  }
  ngOnDestroy(): void {
    delete this.apiResonse;
    delete this.species;
  }

  async loadData(event?: any) {
    const response = await this.getApiData();
    this.apiResonse = response;

    const species = this.apiResonse.results;

    if (!this.species) {
      this.species = [];
    }
    this.species = this.species.concat(species);
    if (event) {
      this.infiniteScroll.complete();
      if (!this.apiResonse.next) {
        this.infiniteScroll.disabled = true;
      }
    }
    setTimeout(() => {
      if (this.platform.height() > this.speciesList.nativeElement.offsetHeight) {
        this.loadData();
      }
    }, 100);

    return this.species;
  }


  async getApiData(): Promise<ApiResponseObject> {
    try {
      const next = this.apiResonse ? this.apiResonse.next : '';
      return await this.swapi.getSpecies(next);
    } catch (e) {
      console.log('error', e);
    }
  }

}
