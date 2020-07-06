import { NgModule } from "@angular/core";
import { ThaiDatePipe } from './thai-date.pipe';
import { moneyPipe } from './money-pipe.pipe';

@NgModule({
  declarations: [ThaiDatePipe, moneyPipe],
  imports: [],
  exports: [ThaiDatePipe, moneyPipe],
})
export class PipesModule {}
