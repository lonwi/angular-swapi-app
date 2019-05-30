import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { IonInfiniteScroll, IonContent, IonList, Platform } from '@ionic/angular';
import { SwapiService } from 'src/app/services/swapi.service';
import { ApiResponseObject } from 'src/app/interfaces/api-response';


@Component({
  selector: 'app-starships',
  templateUrl: './starships.page.html',
  styleUrls: ['./starships.page.scss'],
})
export class StarshipsPage implements OnInit, OnDestroy {

  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonList, { read: ElementRef }) starshipsList: ElementRef;

  apiResonse: ApiResponseObject;
  starships: any[];

  constructor(
    private swapi: SwapiService,
    private platform: Platform
  ) { }

  ngOnInit(): void {
    this.loadData();
  }
  ngOnDestroy(): void {
    delete this.apiResonse;
    delete this.starships;
  }

  async loadData(event?: any) {
    const response = await this.getApiData();
    this.apiResonse = response;

    const starships = this.apiResonse.results;

    if (!this.starships) {
      this.starships = [];
    }
    this.starships = this.starships.concat(starships);
    if (event) {
      this.infiniteScroll.complete();
      if (!this.apiResonse.next) {
        this.infiniteScroll.disabled = true;
      }
    }
    setTimeout(() => {
      if (this.platform.height() > this.starshipsList.nativeElement.offsetHeight) {
        this.loadData();
      }
    }, 100);

    return this.starships;
  }


  async getApiData(): Promise<ApiResponseObject> {
    try {
      const next = this.apiResonse ? this.apiResonse.next : '';
      return await this.swapi.getStarships(next);
    } catch (e) {
      console.log('error', e);
    }
  }

}
