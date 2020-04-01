import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterChoiceMemberUserPageRoutingModule } from './register-choice-member-user-routing.module';

import { RegisterChoiceMemberUserPage } from './register-choice-member-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterChoiceMemberUserPageRoutingModule
  ],
  declarations: [RegisterChoiceMemberUserPage]
})
export class RegisterChoiceMemberUserPageModule {}
