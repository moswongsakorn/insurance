import { ResponseModel } from '../interfaces/ResponseModel';
import { LengthYearAmount } from '../interfaces/LengthYearAmount';
import { YearAmount } from '../interfaces/YearAmount';

export class PolicyCrudModel {
    public CompanyName: string;
    public SpecificCampany: string = "";
    public PolicyName: string;
    public YearOfProtect: number;       // จำนวนปีที่คุ้มครอง
    public YearToPaid: number;          // จำนวนปีที่จ่ายเบี้ย
    public SumInsured: number;          // ทุนประกัน
    public InsurancePremium: number;    // เบี้ยประกัน
    public IsTaxDeduct: boolean;
    public IsHealth: boolean;
    public DueMoney: number;            // เงินครบกำหนดสัญญา

    public ComissionList: LengthYearAmount[];   // ค่าบำเหน็จ 
    public ProtectList: LengthYearAmount[];     // ความคุ้มครองเมื่อเสียชีวิต 
    public ReturnList: LengthYearAmount[];      // เงินจ่ายคืนสิ้นปีกรมธรรม์ 

    public Pin: string;
    public Key: string;

    public Irr: number;
    public IrrAgent: number;


    public PRBeforePaid: number;                 //ค่าเฉลี่ยอัตราความคุ้มครองก่อนจ่ายเบี้ยครบ
    public PRAfterApid: number;                  //ค่าเฉลี่ยอัตราความคุ้มครองหลังจ่ายเบี้ยครบ
    public ValueRate: number;                    //อัตราควาคุ้มค่า
    public ProtectRate: number;                  //อัตราความคุ้มครอง

    public PointForSort: number;


    constructor() {
        this.IsTaxDeduct = false;
        this.IsHealth = false;

        this.ComissionList = new Array<LengthYearAmount>();
        this.ProtectList = new Array<LengthYearAmount>();
        this.ReturnList = new Array<LengthYearAmount>();
    }

    public MapData(data: PolicyCrudModel) {
        this.CompanyName = data.CompanyName;
        this.SpecificCampany = data.SpecificCampany;
        this.PolicyName = data.PolicyName;
        this.YearOfProtect = data.YearOfProtect;
        this.YearToPaid = data.YearToPaid;
        this.SumInsured = data.SumInsured;
        this.InsurancePremium = data.InsurancePremium;
        this.IsTaxDeduct = data.IsTaxDeduct;
        this.IsHealth = data.IsHealth;
        this.DueMoney = data.DueMoney;
        this.ComissionList = data.ComissionList == null ? new Array<LengthYearAmount>() : data.ComissionList;
        this.ProtectList = data.ProtectList == null ? new Array<LengthYearAmount>() : data.ProtectList;
        this.ReturnList = data.ReturnList == null ? new Array<LengthYearAmount>() : data.ReturnList;
        this.Pin = data.Pin;
        this.Key = data.Key;

        this.Irr = data.Irr;
        this.IrrAgent = data.IrrAgent;
        this.PRBeforePaid = data.PRBeforePaid;
        this.PRAfterApid = data.PRAfterApid;
        this.ValueRate = data.ValueRate;
        this.ProtectRate = data.ProtectRate;

    }

    public ValidateData() {
        var response = new ResponseModel();

        if (this.CompanyName == null ||
            this.SpecificCampany == null ||
            this.PolicyName == null ||
            this.YearOfProtect == null ||
            this.YearToPaid == null ||
            this.SumInsured == null ||
            this.InsurancePremium == null ||
            this.IsTaxDeduct == null ||
            this.IsHealth == null ||
            this.DueMoney == null ||
            this.ReturnList == null ||
            this.CompanyName == null ||

            this.CompanyName == '' ||
            this.PolicyName == '') {
            return response.Failed(null, "กรุณากรอกข้อมูลให้ครบถ้วน!");
        }
        else {
            return response.Success(null);
        }
    }

    public ValidateModel(): ResponseModel {
        var response = new ResponseModel();

        if (this.CompanyName == null ||
            this.SpecificCampany == null ||
            this.PolicyName == null ||
            this.YearOfProtect == null ||
            this.YearToPaid == null ||
            this.SumInsured == null ||
            this.InsurancePremium == null ||
            this.IsTaxDeduct == null ||
            this.IsHealth == null ||
            this.DueMoney == null ||
            //this.ComissionList == null || this.ComissionList.length == 0 ||
            this.ProtectList == null || this.ProtectList.length == 0 ||
            this.ReturnList == null || this.ReturnList.length == 0 ||
            this.CompanyName == null ||

            this.CompanyName == '' ||
            this.PolicyName == '') {
            return response.Failed(null, "กรุณากรอกข้อมูลให้ครบถ้วน!");
        }

        // else if (this.ComissionList == null || this.ComissionList.length == 0) {
        //     return response.Failed(null, "กรุณากรอกข้อมูลเงินจ่ายคือสิ้นปีกรมธรรม์");
        // }
        // else if (this.ProtectList == null || this.ProtectList.length == 0) {
        //     return response.Failed(null, "กรุณากรอกข้อมูลความคุ้มครองเมื่อเสียชีวิต");
        // }   

        else {
            return response.Success(null);
        }
    }


    public GetYearAmount(list: LengthYearAmount[]): YearAmount[] {
        var _list = new Array<YearAmount>();
        list.forEach(element => {
            for (var i = element.Start; i <= element.End; i++) {
                var yearAmount = new YearAmount();
                yearAmount.Year = i;
                yearAmount.Amount = element.Amount;
                _list.push(yearAmount);
            }
        });
        _list.sort((a, b) => (a.Year < b.Year) ? 1 : -1);
        return _list;
    }

    public GetCashFlow(): number[] {
        var cashFlow = new Array<number>();
        var returnV = this.GetYearAmount(this.ReturnList);
        for (let i = 1; i <= this.YearOfProtect; i++) {
            var insurancePremium = (i <= this.YearToPaid) ? this.InsurancePremium : 0;
            var returnValue = returnV.find(data => data.Year == (i - 1));
            var protectAmount = returnValue != null ? (returnValue.Amount * this.SumInsured) / 100 : 0;

            cashFlow.push(protectAmount - insurancePremium);
        }
        cashFlow.push((this.DueMoney * this.SumInsured) / 100);
        return cashFlow;
    }

    public GetCashFloawAgent(): number[] {
        var cashFlow = new Array<number>();
        var returnV = this.GetYearAmount(this.ReturnList);
        var commission = this.GetYearAmount(this.ComissionList);
        for (let i = 1; i <= this.YearOfProtect; i++) {
            var insurancePremium = (i <= this.YearToPaid) ? this.InsurancePremium : 0;
            var returnValue = returnV.find(data => data.Year == (i - 1));
            var protectAmount = returnValue != null ? (returnValue.Amount * this.SumInsured) / 100 : 0;

            var com = commission.find(data => data.Year == i);
            var comAmout = com != null ? (com.Amount * insurancePremium) / 100 : 0;

            cashFlow.push(protectAmount - insurancePremium + comAmout);
        }
        cashFlow.push((this.DueMoney * this.SumInsured) / 100);
        return cashFlow;
    }


    public Calculate(): void {
        var insurancePremium = new Array<number>(); //เบี้ยประกันปีที่ (n) 
        var AIP = new Array<number>();              //เบี้ยประกันสะสมปีที่ (n) 

        var returnOfYear = new Array<number>();     //เงินจ่ายคืนสิ้นปีกรมธรรม์ (n)
        var returnOfYearSum = new Array<number>();  //เงินจ่ายคืนสิ้นปีกรมธรรม์สะสม (n)

        var DPM = new Array<number>();              //เงินคุ้มครองเมื่อเสียชีวิตปีที่ (n) 
        var ACR = new Array<number>();              //อัตราความคุ้มครองรายปีที่ (n)

        var PRBeforePaid = 0.0;                     //ค่าเฉลี่ยอัตราความคุ้มครองก่อนจ่ายเบี้ยครบ
        var PRAfterApid = 0.0;                      //ค่าเฉลี่ยอัตราความคุ้มครองหลังจ่ายเบี้ยครบ

        var valueRate = 0.0;                        //อัตราควาคุ้มค่า 

        var point = new Array<number>();            //ค่าปรับแต่งรายปี
        var protectRate = 0.0;                      //อัตราความคุ้มครอง 


        var returnV = this.GetYearAmount(this.ReturnList);
        var protectV = this.GetYearAmount(this.ProtectList);
        for (let i = 0; i < this.YearOfProtect; i++) {
            //Get เบี้ยประกัน to Array
            if (i < this.YearToPaid) insurancePremium.push(this.InsurancePremium);
            else insurancePremium.push(0);

            //Get เบี้ยประกันสะสม to arrry 
            var n_1 = (AIP[i - 1]) ? AIP[i - 1] : 0;
            var insurance = this.InsurancePremium + n_1;
            AIP.push(insurance);

            //Get เงินจ่ายคืนสิ้นปีกรมธรรม์ to array
            var returnValue = returnV.find(data => data.Year == i);
            var returnAmount = returnValue != null ? (returnValue.Amount * this.SumInsured) / 100 : 0;
            returnOfYear.push(returnAmount);

            //Get เงินจ่ายคืนสิ้นปีกรมธรรม์สะสม to array
            var returnN_1 = 0;
            if (returnOfYearSum[i - 1]) returnN_1 = returnOfYearSum[i - 1];
            returnOfYearSum.push(returnOfYear[i] + returnN_1);

            //Get เงินคุ้มครองเมื่อเสียชีวิต to array
            var protect = protectV.find(data => data.Year == (i + 1));
            var protectAmount = protect != null ? (protect.Amount * this.SumInsured) / 100 : 0;
            DPM.push(protectAmount);

            //Get อัตราความคุ้มครองราย to array
            var acr = (DPM[i] + returnOfYearSum[i]) / AIP[i];
            var acr2f = Math.round(acr * 10000) / 10000;
            ACR.push(acr2f);

            //ค่าเฉลี่ยอัตราความคุ้มครองก่อนจ่ายเบี้ยครบ
            if (i < this.YearToPaid) PRBeforePaid += ACR[i];
            else PRAfterApid += ACR[i];

            //อัตราควาคุ้มค่า
            if (ACR[i] >= 1) valueRate++;


            //ค่าปรับแต่งรายปี
            point.push(this.GetPoint(ACR[i]))

        }

        PRBeforePaid = PRBeforePaid / this.YearToPaid;
        PRAfterApid = PRAfterApid / (this.YearOfProtect - this.YearToPaid);
        PRAfterApid = (PRAfterApid) ? PRAfterApid : 0;

        PRBeforePaid = Math.round(PRBeforePaid * 100) / 100;
        PRAfterApid = Math.round(PRAfterApid * 100) / 100;

        valueRate = valueRate / this.YearOfProtect;
        valueRate = Math.round(valueRate * 100) / 100;

        protectRate = (point.reduce((a, b) => a + b)) / this.YearOfProtect;
        protectRate = Math.round(protectRate * 100) / 100;

        console.log("เบี้ยประกันสะสมปีที่", AIP);
        console.log("-------------------------");
        console.log("เงินจ่ายคืนสิ้นปีกรมธรรม์", returnOfYear);
        console.log("-------------------------");
        console.log("เงินจ่ายคืนสิ้นปีกรมธรรม์สะสม", returnOfYearSum);
        console.log("-------------------------");
        console.log("เบี้ยประกันปีที่", insurancePremium);
        console.log("-------------------------");
        console.log("เงินคุ้มครองเมื่อเสียชีวิตปีที่", DPM);
        console.log("-------------------------");
        console.log("อัตราความคุ้มครองรายปีที่", ACR);
        console.log("-------------------------");
        console.log("ค่าเฉลี่ยอัตราความคุ้มครองก่อนจ่ายเบี้ยครบ ", PRBeforePaid);
        console.log("-------------------------");
        console.log("ค่าเฉลี่ยอัตราความคุ้มครองหลังจ่ายเบี้ยครบ ", PRAfterApid);
        console.log("-------------------------");
        console.log("อัตราควาคุ้มค่า ", valueRate);
        console.log("-------------------------");
        console.log("คะแนน ", point);
        console.log("-------------------------");
        console.log("อัตราความคุ้มครอง ", protectRate);

        this.PRBeforePaid = PRBeforePaid;
        this.PRAfterApid = PRAfterApid;
        this.ValueRate = valueRate;
        this.ProtectRate = protectRate;

    }

    public GetPoint(value: number): number {

        if (value > 6.0) return 3;
        else if (5.5 < value && value <= 6.0) return 2.5;
        else if (5.0 < value && value <= 5.5) return 2;
        else if (4.5 < value && value <= 5.0) return 1.5;
        else if (4.0 < value && value <= 4.5) return 1;
        else if (3.5 < value && value <= 4.0) return 0.5;
        else if (3.0 < value && value <= 3.5) return 0;
        else if (2.5 < value && value <= 3.0) return -0.5;
        else if (2.0 < value && value <= 2.5) return -1;
        else if (1.5 < value && value <= 2.0) return -1.5;
        else if (1.0 < value && value <= 1.5) return -2;
        else if (0.9 < value && value <= 1.0) return -2.5;
        else if (value <= 0.9) return -3;

    }
    
}



