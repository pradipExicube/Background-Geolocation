
import { Injectable,NgZone } from '@angular/core';
import { LoadingController, ToastController, Platform, ModalController, App, ViewController, ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

import {BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse, BackgroundGeolocationEvents} from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import * as firebase from 'firebase';
import { BackgroundMode } from '@ionic-native/background-mode';

@Injectable()
export class CustomService {

	public watch: any;
	public lat: number = 0;
	public lng: number = 0;

	count:number = 0;

	constructor(
		public actionSheetCtrl: ActionSheetController,
		public appCtrl:App,
		public modalCtrl: ModalController,
		public platform:Platform,
		public splashScreen: SplashScreen,
		public alertCtrl:AlertController, 
		public loadingCtrl:LoadingController, 
		public toastCtrl: ToastController,

		public zone: NgZone,
		public backgroundGeolocation: BackgroundGeolocation,
		public geolocation: Geolocation,
		public backgroundMode: BackgroundMode,
	) {

	}


	public startBackgroundLocation(){
		let config : BackgroundGeolocationConfig = {
			desiredAccuracy: 0,
			stationaryRadius: 20,
			distanceFilter: 0,
			debug: false,
			interval: 2000,
			stopOnTerminate: true, 
		};
	
		this.backgroundGeolocation.configure(config)
			.then((location: any) => {
				console.log("backgroundGeolocation :", location);
				this.backgroundGeolocation.finish()
		}, (err) => {
			console.log(err);
		});
	
		this.backgroundGeolocation.start()
		.then((success:any)=>{
			this.backgroundMode.disableWebViewOptimizations();
		})
	}

	public startTracking() {
		setInterval(()=>{
			this.count = this.count+1;
			firebase.database().ref('test/').set(this.count);
			this.geolocation.getCurrentPosition().then((position:any)=>{
				console.log(position)
			})
		},3000)

		let options = {
		  frequency: 3000,
		  enableHighAccuracy: true
		};

		this.backgroundGeolocation.watchLocationMode()
	
		this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
		  console.log(position);
		  if(position){
			firebase.database().ref('testingData/')
			.set({
				lat:position.coords.latitude,
				lng:position.coords.longitude
			}).then(()=>{})
		  }
	
		  this.zone.run(() => {
			this.lat = position.coords.latitude;
			this.lng = position.coords.longitude;
		  });
		});
	  }



	
	  public stopTracking() {
		console.log('stopTracking');
		this.backgroundGeolocation.finish();
		this.watch.unsubscribe();
	  }


}

