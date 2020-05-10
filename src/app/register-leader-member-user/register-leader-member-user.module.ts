import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterLeaderMemberUserPageRoutingModule } from './register-leader-member-user-routing.module';

import { RegisterLeaderMemberUserPage } from './register-leader-member-user.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    RegisterLeaderMemberUserPageRoutingModule
  ],
  declarations: [RegisterLeaderMemberUserPage]
})
export class RegisterLeaderMemberUserPageModule {}