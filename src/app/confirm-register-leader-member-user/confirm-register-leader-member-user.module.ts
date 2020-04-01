import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmRegisterLeaderMemberUserPageRoutingModule } from './confirm-register-leader-member-user-routing.module';

import { ConfirmRegisterLeaderMemberUserPage } from './confirm-register-leader-member-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmRegisterLeaderMemberUserPageRoutingModule
  ],
  declarations: [ConfirmRegisterLeaderMemberUserPage]
})
export class ConfirmRegisterLeaderMemberUserPageModule {}
