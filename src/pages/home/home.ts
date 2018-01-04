import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapContainer: ElementRef;
  map;
  lista_marker = [];

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public alertCtrl: AlertController,
    private storage: Storage
  ) {
    console.log("Home page creator loaded");
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
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
          text: 'CANCELAR',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'REGISTRAR',
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
  }

}