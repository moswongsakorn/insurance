import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterGeneralUserPageRoutingModule } from './register-general-user-routing.module';

import { RegisterGeneralUserPage } from './register-general-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterGeneralUserPageRoutingModule
  ],
  declarations: [RegisterGeneralUserPage]
})
export class RegisterGeneralUserPageModule {}