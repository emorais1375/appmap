import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditLocalPage } from './edit-local';

@NgModule({
  declarations: [
    EditLocalPage,
  ],
  imports: [
    IonicPageModule.forChild(EditLocalPage),
  ],
})
export class EditLocalPageModule {}
