import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { IonInfiniteScroll, IonContent, IonList, Platform } from '@ionic/angular';
import { SwapiService } from 'src/app/services/swapi.service';
import { ApiResponseObject } from 'src/app/interfaces/api-response';
import { PersonObject } from 'src/app/interfaces/person';
import { SpecieObject } from 'src/app/interfaces/specie';

import { AVATARS } from 'src/app/avatars';

@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit, OnDestroy {

  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonList, { read: ElementRef }) peopleList: ElementRef;

  apiResonse: ApiResponseObject;
  people: PersonObject[];

  constructor(
    private swapi: SwapiService,
    private platform: Platform
  ) { }

  ngOnInit(): void {
    this.loadData();
  }
  ngOnDestroy(): void {
    delete this.apiResonse;
    delete this.people;
  }

  async loadData(event?: any) {
    const response = await this.getApiData();
    this.apiResonse = response;
    const people = await Promise.all(
      this.apiResonse.results.map(async (item) => {
        item.species = await this.getSpecie(item);
        return item;
      })
    );
    if (!this.people) {
      this.people = [];
    }
    this.people = this.people.concat(people);
    if (event) {
      this.infiniteScroll.complete();
      if (!this.apiResonse.next) {
        this.infiniteScroll.disabled = true;
      }
    }
    setTimeout(() => {
      if (this.platform.height() > this.peopleList.nativeElement.offsetHeight) {
        this.loadData();
      }
    }, 100);

    return this.people;
  }

  // loadData(event?: any): void {
  //   this.getApiData().then((res) => {
  //     if (res) {
  //       this.apiResonse = res;
  //       if (!this.people) {
  //         this.people = [];
  //       }
  //       Promise.all(
  //         res.results
  //           .map(async (item) => {
  //             item.species = await this.getSpecie(item);
  //             return item;
  //           }),
  //       ).then(() => {
  //         this.people = this.people.concat(res.results);
  //         if (event) {
  //           this.infiniteScroll.complete();
  //           if (!this.apiResonse.next) {
  //             this.infiniteScroll.disabled = true;
  //           }
  //         }
  //       });
  //     }
  //   });
  // }

  async getApiData(): Promise<ApiResponseObject> {
    try {
      const next = this.apiResonse ? this.apiResonse.next : '';
      return await this.swapi.getPeople(next);
    } catch (e) {
      console.log('error', e);
    }
  }

  getAvatar(character: PersonObject): string {
    const avatar = AVATARS.find((item) => character.name === item.name);
    return avatar.photo ? avatar.photo : 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw==';
  }

  async getSpecie(character: PersonObject): Promise<Array<SpecieObject>> {
    try {
      const species = await Promise.all(
        character.species
          .map(async (item) => {
            return await this.swapi.get(item);
          }),
      );
      return species;
    } catch (e) {
      console.log('error', e);
    }
  }

}
