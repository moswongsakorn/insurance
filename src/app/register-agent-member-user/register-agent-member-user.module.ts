import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterAgentMemberUserPageRoutingModule } from './register-agent-member-user-routing.module';

import { RegisterAgentMemberUserPage } from './register-agent-member-user.page';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    RegisterAgentMemberUserPageRoutingModule,
    NgxMaskModule.forChild(),

  ],
  declarations: [RegisterAgentMemberUserPage]
})
export class RegisterAgentMemberUserPageModule {}
