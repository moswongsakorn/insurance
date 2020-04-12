import { ResponseModel } from '../interfaces/ResponseModel';

export class PolicyCrudModel {
    public CompanyName: string;
    public PolicyName: string;
    public YearOfProtect: number;
    public YearToPaid: number;
    public SumInsured: number;          // ทุนประกัน
    public InsurancePremium: number;    // เบี้ยประกัน
    public IsTaxDeduct: boolean;
    public IsHealth: boolean;
    public DueMoney: number;            // เงินครบกำหนดสัญญา

    public ComissionList: YearAmount[];
    public ProtectList: YearAmount[];
    public ReturnList: YearAmount[];

    public Pin: string;
    public Key: string;


    constructor(){
        this.IsTaxDeduct = false;
        this.IsHealth = false;
    }

    public ValidateModel(): ResponseModel {
        var response = new ResponseModel();
        if (this.PolicyName == null || this.PolicyName.length == 0 ||
            this.CompanyName == null || this.CompanyName.length == 0 ||
            this.YearOfProtect == 0 ||
            this.YearToPaid == 0 ||
            this.SumInsured == 0 ||
            this.InsurancePremium == 0 ) {
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

}

class YearAmount {
    Year: number;
    Amount: number;
}