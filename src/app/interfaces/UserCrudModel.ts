import { MagicNumber } from '../interfaces/MagicNumber'

export class UserCrudModel {
    public IdCard: string;
    public PrefixName: string;
    public SpecificPrefixName: string;
    public Name: string;
    public BirthDay: string;
    public Telephone: string;
    public Email: string;
    public Password: string;
    public ConfirmPassword: string;
    public Pin: string;
    public Role: string;
    public Key: string;
    public Uid: string;
    public Verify: boolean;

    constructor() {
    }

    public IsValidModel(): Boolean {
        if (this.IdCard == null || this.PrefixName == null || this.Name == null ||
            this.BirthDay == null || this.Telephone == null || this.Email == null ||
            this.Password == null || this.Pin == null || 
            this.IdCard == "" || this.PrefixName == "" || this.Name == "" ||
            this.BirthDay == "" || this.Telephone == "" || this.Email == "" ||
            this.Password == "" || this.Pin == "") {
            return false;
        }
        else return true;
    }

    public InitRole(role: string): void {
        this.Role = role;
        this.Verify = false;
    }

    public PasswordIsMatch(): boolean {
        return this.Password == this.ConfirmPassword;
    }

    public MapData(data: UserCrudModel): void {
        this.IdCard = data.IdCard;
        this.PrefixName = data.PrefixName;
        this.SpecificPrefixName = data.SpecificPrefixName;
        this.Name = data.Name;
        this.BirthDay = data.BirthDay;
        this.Telephone = data.Telephone;
        this.Email = data.Email;
        this.Password = data.Password;
        this.ConfirmPassword = data.ConfirmPassword;
        this.Pin = data.Pin;
        this.Role = data.Role;
        this.Key = data.Key;
        this.Uid = data.Uid;
        this.Verify = data.Verify;
    }
}