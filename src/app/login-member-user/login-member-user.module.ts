import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginMemberUserPageRoutingModule } from './login-member-user-routing.module';

import { LoginMemberUserPage } from './login-member-user.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    LoginMemberUserPageRoutingModule
  ],
  declarations: [LoginMemberUserPage]
})
export class LoginMemberUserPageModule {}
