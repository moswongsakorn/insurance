import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPolicyConfirmGeneralUserPageRoutingModule } from './edit-policy-confirm-general-user-routing.module';

import { EditPolicyConfirmGeneralUserPage } from './edit-policy-confirm-general-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPolicyConfirmGeneralUserPageRoutingModule
  ],
  declarations: [EditPolicyConfirmGeneralUserPage]
})
export class EditPolicyConfirmGeneralUserPageModule {}
