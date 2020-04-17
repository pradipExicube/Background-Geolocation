import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BackgroundGeolocation} from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';
import { CustomService } from './customservice';
import { BackgroundMode } from '@ionic-native/background-mode';

import * as firebase from 'firebase';
export const firebaseConfig = {
  apiKey: "AIzaSyBAeIzZ5HIgf7FP2OJO68St3qaZB3n5uP8",
  authDomain: "semaconstruction-ba875.firebaseapp.com",
  databaseURL: "https://semaconstruction-ba875.firebaseio.com",
  projectId: "semaconstruction-ba875",
  storageBucket: "semaconstruction-ba875.appspot.com",
  messagingSenderId: "22762760538",
  appId: "1:22762760538:web:718e12bbd961e078256b63",
};
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,BackgroundGeolocation,Geolocation,CustomService,BackgroundMode,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
