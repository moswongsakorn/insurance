import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolicySearchPageRoutingModule } from './policy-search-routing.module';

import { PolicySearchPage } from './policy-search.page';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    PolicySearchPageRoutingModule,
    NgxMaskModule.forChild(),
  ],
  declarations: [PolicySearchPage]
})
export class PolicySearchPageModule {}
