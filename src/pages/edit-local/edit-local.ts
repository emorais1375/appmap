import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LocalProvider, Local } from '../../providers/local/local'

@IonicPage()
@Component({
  selector: 'page-edit-local',
  templateUrl: 'edit-local.html',
})
export class EditLocalPage {
  model: Local;
  key: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private localProvider: LocalProvider, private toast: ToastController) {
    if (this.navParams.data.contact && this.navParams.data.key) {
      this.model = this.navParams.data.contact;
      this.key = this.navParams.data.key;
    } else {
      this.model = new Local();
    }
  }

  save() {
    this.saveLocal().then(() => {
      this.toast.create({ message: 'Local salvo.', duration: 3000, position: 'botton' }).present();
      this.navCtrl.pop();
    })
      .catch(() => {
        this.toast.create({ message: 'Erro ao salvar o local.', duration: 3000, position: 'botton' }).present();
      });
  }

  private saveLocal() {
    if (this.key) {
      return this.localProvider.update(this.key, this.model);
    } else {
      return this.localProvider.insert(this.model);
    }
  }
}
