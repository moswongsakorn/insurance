import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "thaiDate",
})
export class ThaiDatePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    const dateFormat = value.split("T")[0].split("-");
    const year = dateFormat[0];
    const month = dateFormat[1];
    const date = dateFormat[2];
    const fullThaiDate =
      +date + " " + this.convertMonthToText(month) + " " + (+year + 543);
    return fullThaiDate;
  }

  convertMonthToText(month) {
    console.log("month", month);
    switch (month) {
      case "01":
        return "มกราคม";
      case "02":
        return "กุมภาพันธ์";
      case "03":
        return "มีนาคม";
      case "04":
        return "เมษายน";
      case "05":
        return "พฤษภาคม";
      case "06":
        return "มิถุนายน";
      case "07":
        return "กรกฎาคม";
      case "08":
        return "สิงหาคม";
      case "09":
        return "กันยายน";
      case "10":
        return "ตุลาคม";
      case "11":
        return "พฤศจิกายน";
      case "12":
        return "ธันวาคม";
    }
  }
}
