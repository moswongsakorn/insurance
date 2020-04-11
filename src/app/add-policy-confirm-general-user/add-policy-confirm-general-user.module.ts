import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPolicyConfirmGeneralUserPageRoutingModule } from './add-policy-confirm-general-user-routing.module';

import { AddPolicyConfirmGeneralUserPage } from './add-policy-confirm-general-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPolicyConfirmGeneralUserPageRoutingModule
  ],
  declarations: [AddPolicyConfirmGeneralUserPage]
})
export class AddPolicyConfirmGeneralUserPageModule {}
