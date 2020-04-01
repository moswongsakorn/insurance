import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmRegisterAgentMemberUserPageRoutingModule } from './confirm-register-agent-member-user-routing.module';

import { ConfirmRegisterAgentMemberUserPage } from './confirm-register-agent-member-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmRegisterAgentMemberUserPageRoutingModule
  ],
  declarations: [ConfirmRegisterAgentMemberUserPage]
})
export class ConfirmRegisterAgentMemberUserPageModule {}
