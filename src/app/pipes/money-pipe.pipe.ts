import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneyPipe'
})
export class moneyPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let text = ''+value
    let [prefix, decimal] = text.split(".")
      if(decimal){
        decimal = '.'+decimal
      }else{
        decimal = ''
      }
    return (prefix).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')+decimal || ""
  }

}
