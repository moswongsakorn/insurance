import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPolicyRepayGeneralUserPageRoutingModule } from './edit-policy-repay-general-user-routing.module';

import { EditPolicyRepayGeneralUserPage } from './edit-policy-repay-general-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPolicyRepayGeneralUserPageRoutingModule
  ],
  declarations: [EditPolicyRepayGeneralUserPage]
})
export class EditPolicyRepayGeneralUserPageModule {}
