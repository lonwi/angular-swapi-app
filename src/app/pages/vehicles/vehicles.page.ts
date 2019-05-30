import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { IonInfiniteScroll, IonContent, IonList, Platform } from '@ionic/angular';
import { SwapiService } from 'src/app/services/swapi.service';
import { ApiResponseObject } from 'src/app/interfaces/api-response';


@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  styleUrls: ['./vehicles.page.scss'],
})
export class VehiclesPage implements OnInit, OnDestroy {

  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonList, { read: ElementRef }) vehiclesList: ElementRef;

  apiResonse: ApiResponseObject;
  vehicles: any[];

  constructor(
    private swapi: SwapiService,
    private platform: Platform
  ) { }

  ngOnInit(): void {
    this.loadData();
  }
  ngOnDestroy(): void {
    delete this.apiResonse;
    delete this.vehicles;
  }

  async loadData(event?: any) {
    const response = await this.getApiData();
    this.apiResonse = response;

    const vehicles = this.apiResonse.results;

    if (!this.vehicles) {
      this.vehicles = [];
    }
    this.vehicles = this.vehicles.concat(vehicles);
    if (event) {
      this.infiniteScroll.complete();
      if (!this.apiResonse.next) {
        this.infiniteScroll.disabled = true;
      }
    }
    setTimeout(() => {
      if (this.platform.height() > this.vehiclesList.nativeElement.offsetHeight) {
        this.loadData();
      }
    }, 100);

    return this.vehicles;
  }


  async getApiData(): Promise<ApiResponseObject> {
    try {
      const next = this.apiResonse ? this.apiResonse.next : '';
      return await this.swapi.getVehicles(next);
    } catch (e) {
      console.log('error', e);
    }
  }

}
