import { MagicNumber } from '../interfaces/MagicNumber'

export class UserCrudModel {
    public IdCard: string;
    public PrefixName: string;
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

    public InitRole(role: string): void {
        this.Role = role;
    }

    public PasswordIsMatch(): boolean {
        return this.Password == this.ConfirmPassword;
    }

    public MapData(data: UserCrudModel): void {
        this.IdCard = data.IdCard;
        this.PrefixName = data.PrefixName;
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