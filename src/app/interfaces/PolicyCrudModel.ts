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
            this.ComissionList == null ||
            this.ProtectList == null ||
            this.ReturnList == null ||
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

}



