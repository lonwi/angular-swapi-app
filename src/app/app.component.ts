import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SidemenuPages } from './interfaces/sidemenu-pages';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public sidemenuPages: Array<SidemenuPages> = [
    {
      title: 'Movies',
      url: '/movies',
      icon: ''
    },
    {
      title: 'Characters',
      url: '/characters',
      icon: ''
    },
    {
      title: 'Planets',
      url: '/planets',
      icon: ''
    },
    {
      title: 'Species',
      url: '/species',
      icon: ''
    },
    {
      title: 'Starships',
      url: '/starships',
      icon: ''
    },
    {
      title: 'Vehicles',
      url: '/vehicles',
      icon: ''
    },
  ]

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
