import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditChangePasswordPageRoutingModule } from './edit-change-password-routing.module';

import { EditChangePasswordPage } from './edit-change-password.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    EditChangePasswordPageRoutingModule
  ],
  declarations: [EditChangePasswordPage]
})
export class EditChangePasswordPageModule {}
