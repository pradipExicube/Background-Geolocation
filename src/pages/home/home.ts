import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CustomService } from '../../app/customservice';
import { BackgroundMode } from '@ionic-native/background-mode';

import * as firebase from 'firebase';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  locations:any;

  constructor(
    public navCtrl: NavController,
    public cs: CustomService,
    public backgroundMode: BackgroundMode,
    public geolocation:Geolocation
  ) {

    let ref= firebase.database().ref('testingData/')
    ref.on('value',(snapshot:any)=>{
      if(snapshot.val()){
        this.locations = snapshot.val();
      }
    })

  }

  public start() {
    this.cs.startTracking();
  }

  public stop() {
    this.cs.stopTracking();
  }

  
}
