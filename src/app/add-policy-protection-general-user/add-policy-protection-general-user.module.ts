import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPolicyProtectionGeneralUserPageRoutingModule } from './add-policy-protection-general-user-routing.module';

import { AddPolicyProtectionGeneralUserPage } from './add-policy-protection-general-user.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    AddPolicyProtectionGeneralUserPageRoutingModule
  ],
  declarations: [AddPolicyProtectionGeneralUserPage]
})
export class AddPolicyProtectionGeneralUserPageModule {}
