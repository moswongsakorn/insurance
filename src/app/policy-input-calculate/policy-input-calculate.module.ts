import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolicyInputCalculatePageRoutingModule } from './policy-input-calculate-routing.module';

import { PolicyInputCalculatePage } from './policy-input-calculate.page';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    PolicyInputCalculatePageRoutingModule,
    NgxMaskModule.forChild(),
  ],
  declarations: [PolicyInputCalculatePage]
})
export class PolicyInputCalculatePageModule {}
