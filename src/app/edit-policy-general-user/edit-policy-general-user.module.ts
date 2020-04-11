import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPolicyGeneralUserPageRoutingModule } from './edit-policy-general-user-routing.module';

import { EditPolicyGeneralUserPage } from './edit-policy-general-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPolicyGeneralUserPageRoutingModule
  ],
  declarations: [EditPolicyGeneralUserPage]
})
export class EditPolicyGeneralUserPageModule {}
