import { Component } from '@angular/core';

import { MenuController, NavController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SidemenuPagesObject } from './interfaces/sidemenu-pages';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public sidemenuPages: Array<SidemenuPagesObject> = [
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
    private menuCtrl: MenuController,
    private navCtrl: NavController,
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

  goToHome() {
    this.navCtrl.navigateRoot('/welcome').then(() => {
      this.menuCtrl.close();
    });
  }

}
