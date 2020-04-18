import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmRegisterGeneralUserPageRoutingModule } from './confirm-register-general-user-routing.module';

import { ConfirmRegisterGeneralUserPage } from './confirm-register-general-user.page';
import { ThaiDatePipe } from '../pipes/thai-date.pipe';
import { PipesModule } from '../pipes/pips.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmRegisterGeneralUserPageRoutingModule,
    PipesModule
  ],
  declarations: [ConfirmRegisterGeneralUserPage]
})
export class ConfirmRegisterGeneralUserPageModule {}
