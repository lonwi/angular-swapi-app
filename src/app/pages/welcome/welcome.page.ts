import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, Platform } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  stars: Array<{ top: number, left: number }>;

  constructor(
    private platform: Platform
  ) { }

  ngOnInit() {
    this.getRandomStars().then(() => console.log(this.stars));
  }

  async getRandomStars(): Promise<Array<{ top: number, left: number }>> {
    const stars = await Array(100).fill(0).map(() => {
      const star = {
        top: Math.floor(Math.random() * this.platform.height()),
        left: Math.floor(Math.random() * this.platform.width())
      };
      return star;
    });
    this.stars = await stars;
    return this.stars;
  }

}
