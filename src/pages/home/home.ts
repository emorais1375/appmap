import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapContainer: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation, public alertCtrl: AlertController) {

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
      console.log('Error getting location', err);
    });

  }

  addMarker() {

    let marker = new google.maps.Marker({
      map: this.map,
      icon: { url : 'assets/imgs/map-pin.png' },
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter(),
      title: "Hello World"
    });

    //let content = "<h4>Information!</h4>";

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
            console.log('Local: '+ data.local);
            console.log('Descrição: '+ data.atividade);
            console.log('Latitude: '+ marker.map.getCenter().lat());
            console.log('Langitude: '+ marker.map.getCenter().lng());
            console.log('Data: '+ Date.now());
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
