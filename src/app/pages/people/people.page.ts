import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { SwapiService } from 'src/app/services/swapi.service';
import { ApiResponse } from 'src/app/interfaces/api-response';
// import { People } from 'src/app/interfaces/people';
import { Person } from 'src/app/interfaces/person';

import { AVATARS } from 'src/app/avatars';

@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit, OnDestroy {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  apiResonse: ApiResponse;
  people: Person[];

  constructor(
    private swapi: SwapiService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }
  ngOnDestroy(): void {
    delete this.apiResonse;
    delete this.people;
  }

  loadData(event?: any): void {
    this.getApiData().then((res) => {
      if (res) {
        this.apiResonse = res;
        
        if (!this.people) {
          this.people = [];
        }
        Promise.all(
          res.results
            .map(async (item) => {
              item = await this.getSpecie(item);
            }),
        ).then(() => this.people = this.people.concat(res.results));

        this.people = this.people.concat(res.results);
        console.log(this.people);
        if (event) {
          this.infiniteScroll.complete();
          if (!this.apiResonse.next) {
            this.infiniteScroll.disabled = true;
          }
        }
      }
    });
  }

  async getApiData(): Promise<ApiResponse> {
    try {
      const next = this.apiResonse ? this.apiResonse.next : '';
      return await this.swapi.getPeople(next);
    } catch (e) {
      console.log('error', e);
    }
  }

  getAvatar(character: Person) {
    const avatar = AVATARS.find((item) => character.name === item.name);
    return avatar.photo ? avatar.photo : 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw==';
    // let index = character.url.split('/')[5];
    // index = parseInt(index) - 1;
    // return AVATARS[index] ? AVATARS[index].photo : '';
  }

  async getSpecie(character: Person) {
    try {
      // const next = this.apiResonse ? this.apiResonse.next : '';
      Promise.all(
        character.species
          .map(async (item) => {
            return await this.swapi.get(item);
          }),
      );

      return character;

    } catch (e) {
      console.log('error', e);
    }
  }

}
