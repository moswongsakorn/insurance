import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterAgentMemberUserPageRoutingModule } from './register-agent-member-user-routing.module';

import { RegisterAgentMemberUserPage } from './register-agent-member-user.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    RegisterAgentMemberUserPageRoutingModule
  ],
  declarations: [RegisterAgentMemberUserPage]
})
export class RegisterAgentMemberUserPageModule {}
