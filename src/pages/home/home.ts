import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  MyLocation,
  GoogleMapsAnimation
} from '@ionic-native/google-maps';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  /* @ViewChild('map') mapContainer: ElementRef; */
  map: GoogleMap;
  mapReady: boolean = false;
  lista_marker = [];

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public alertCtrl: AlertController,
    private googleMaps: GoogleMaps,
    public toastCtrl: ToastController
  ) {
    console.log("Home page creator loaded");
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  /* loadMap() {
    this.geolocation.getCurrentPosition().then((pos) => {
      let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      let mapOptions = {
        center: latLng,
        disableDefaultUI: true,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
    }).catch((err) => {
      console.log('Erro ao obter localização', err);
    });
  }

  addMarker() {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    this.addInfoWindow(marker);

  }

  addInfoWindow(marker) {
    google.maps.event.addListener(marker, 'click', () => {
      this.showPrompt(marker);
    });
  }

  showPrompt(marker) {
    let prompt = this.alertCtrl.create({
      title: 'Informações do Local',
      inputs: [
        {
          name: 'local',
          placeholder: 'Local'
        },
        {
          name: 'atividade',
          placeholder: 'Atividade'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            var obj_marker = {
              nome_local: data.local,
              atividade: data.atividade,
              data: Date.now(),
              lat: marker.position.lat(),
              lng: marker.position.lng()
            };
            this.lista_marker.push(obj_marker);
            console.log(this.lista_marker);
            this.showAlertOk();
          }
        }
      ]
    });
    prompt.present();
  }

  showAlertOk() {
    let alert = this.alertCtrl.create({
      title: 'Registrado',
      subTitle: 'Local registrado',
      buttons: ['OK']
    });
    alert.present();
  } */

  loadMap() {
    // Create a map after the view is loaded.
    // (platform is already ready in app.component.ts)
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 43.0741704,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    });

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
          title: 'Ionic',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: 43.0741904,
            lng: -89.3809802
          }
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });

      });
  }
}
