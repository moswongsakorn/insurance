import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPolicyConfirmGeneralUserPageRoutingModule } from './add-policy-confirm-general-user-routing.module';

import { AddPolicyConfirmGeneralUserPage } from './add-policy-confirm-general-user.page';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../pipes/pips.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    AddPolicyConfirmGeneralUserPageRoutingModule,
    PipesModule
  ],
  declarations: [AddPolicyConfirmGeneralUserPage]
})
export class AddPolicyConfirmGeneralUserPageModule {}
