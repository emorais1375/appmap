import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LocalProvider, LocalList } from '../../providers/local/local'

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  locais: LocalList[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private localProvider: LocalProvider, private toast: ToastController) {
  }

  ionViewDidEnter() {
    this.localProvider.getAll().then((result) => {
      this.locais = result;
    });
  }

  editContact(item: LocalList) {
    this.navCtrl.push('EditContactPage', { key: item.key, contact: item.local });
  }

  removeContact(item: LocalList) {
    this.localProvider.remove(item.key).then(() => {
      // Removendo do array de items
      let index = this.locais.indexOf(item);
      this.locais.splice(index, 1);
      this.toast.create({ message: 'Local removido.', duration: 3000, position: 'botton' }).present();
    })
  }
}
