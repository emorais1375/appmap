import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController, NavParams, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { LocalProvider, Local } from '../../providers/local/local'

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapContainer: ElementRef;
  map;
  lista_marker = [];

  modelo: Local;

  constructor(
    public navCtrl: NavController, public geolocation: Geolocation, public alertCtrl: AlertController,
    private storage: Storage, private localProvider: LocalProvider, private toast: ToastController) {
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
            /* var obj_marker = {
              nome_local: data.local,
              atividade: data.atividade,
              data: Date.now(),
              lat: marker.position.lat(),
              lng: marker.position.lng()
            };
            this.lista_marker.push(obj_marker); */
            this.modelo = new Local();
            this.modelo.name = data.local;
            this.modelo.description = data.atividade;
            this.modelo.date = Date.now();
            this.modelo.latitude = marker.position.lat();
            this.modelo.latitude = marker.position.lng();

            /* console.log(this.lista_marker); */
            this.save();
            /* this.showAlertOk(); */
          }
        }
      ]
    });
    prompt.present();
  }

  /* showAlertOk() {
    let alert = this.alertCtrl.create({
      title: 'Registrado',
      subTitle: 'Local registrado',
      buttons: ['OK']
    });
    alert.present();
  } */


  save() {
    this.saveContact().then(() => {
      this.toast.create({ message: 'Local salvo.', duration: 3000, position: 'botton' }).present();
    }).catch(() => {
      this.toast.create({ message: 'Erro ao salvar o local.', duration: 3000, position: 'botton' }).present();
    });
  }

  private saveContact() {
    return this.localProvider.insert(this.modelo);
  }

}