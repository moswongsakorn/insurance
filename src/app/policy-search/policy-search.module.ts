import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolicySearchPageRoutingModule } from './policy-search-routing.module';

import { PolicySearchPage } from './policy-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PolicySearchPageRoutingModule
  ],
  declarations: [PolicySearchPage]
})
export class PolicySearchPageModule {}
