import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmRegisterGeneralUserPageRoutingModule } from './confirm-register-general-user-routing.module';

import { ConfirmRegisterGeneralUserPage } from './confirm-register-general-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmRegisterGeneralUserPageRoutingModule
  ],
  declarations: [ConfirmRegisterGeneralUserPage]
})
export class ConfirmRegisterGeneralUserPageModule {}
