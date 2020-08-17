import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPolicyRepayGeneralUserPageRoutingModule } from './add-policy-repay-general-user-routing.module';

import { AddPolicyRepayGeneralUserPage } from './add-policy-repay-general-user.page';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    AddPolicyRepayGeneralUserPageRoutingModule,
    NgxMaskModule.forChild(),
  ],
  declarations: [AddPolicyRepayGeneralUserPage]
})
export class AddPolicyRepayGeneralUserPageModule {}
