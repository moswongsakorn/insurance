import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "thaiDate",
})
export class ThaiDatePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
  
    const languageChecker = localStorage.getItem("language") || 'th'
    const dateFormat = value.split("T")[0].split("-");
    const year = dateFormat[0];
    const month = dateFormat[1];
    const date = dateFormat[2];

    if(languageChecker=="th"){
      return  (+date) + " " + this.convertMonthToText(month, "th") + " " + (+year + 543);
    }
    if(languageChecker=="en"){
      return (+date) + " " + this.convertMonthToText(month,"en") + " " + (+year);
    } 
   
  }

  convertMonthToText(month, language) {
    console.log("month", month);
    switch (month) {
      case "01":
        return language=="th"?"มกราคม":"January";
      case "02":
        return language=="th"?"กุมภาพันธ์":"February";
      case "03":
        return language=="th"?"มีนาคม":"March";
      case "04":
        return language=="th"?"เมษายน":"April";
      case "05":
        return language=="th"?"พฤษภาคม":"May";
      case "06":
        return language=="th"?"มิถุนายน":"June";
      case "07":
        return language=="th"?"กรกฎาคม":"July";
      case "08":
        return language=="th"?"สิงหาคม":"August";
      case "09":
        return language=="th"?"กันยายน":"September";
      case "10":
        return language=="th"?"ตุลาคม":"October";
      case "11":
        return language=="th"?"พฤศจิกายน":"November";
      case "12":
        return language=="th"?"ธันวาคม":"December";
    }
  }
}
