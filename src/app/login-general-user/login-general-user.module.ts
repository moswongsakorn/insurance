import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginGeneralUserPageRoutingModule } from './login-general-user-routing.module';

import { LoginGeneralUserPage } from './login-general-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginGeneralUserPageRoutingModule
  ],
  declarations: [LoginGeneralUserPage]
})
export class LoginGeneralUserPageModule {}
