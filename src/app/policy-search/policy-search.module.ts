import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolicySearchPageRoutingModule } from './policy-search-routing.module';

import { PolicySearchPage } from './policy-search.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    PolicySearchPageRoutingModule
  ],
  declarations: [PolicySearchPage]
})
export class PolicySearchPageModule {}
