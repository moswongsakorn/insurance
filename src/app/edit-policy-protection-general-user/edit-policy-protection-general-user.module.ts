import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPolicyProtectionGeneralUserPageRoutingModule } from './edit-policy-protection-general-user-routing.module';

import { EditPolicyProtectionGeneralUserPage } from './edit-policy-protection-general-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPolicyProtectionGeneralUserPageRoutingModule
  ],
  declarations: [EditPolicyProtectionGeneralUserPage]
})
export class EditPolicyProtectionGeneralUserPageModule {}
