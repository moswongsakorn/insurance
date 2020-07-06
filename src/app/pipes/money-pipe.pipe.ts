import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneyPipe'
})
export class moneyPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return (''+value).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') || ""
  }

}
