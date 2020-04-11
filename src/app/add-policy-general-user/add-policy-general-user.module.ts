import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPolicyGeneralUserPageRoutingModule } from './add-policy-general-user-routing.module';

import { AddPolicyGeneralUserPage } from './add-policy-general-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPolicyGeneralUserPageRoutingModule
  ],
  declarations: [AddPolicyGeneralUserPage]
})
export class AddPolicyGeneralUserPageModule {}
