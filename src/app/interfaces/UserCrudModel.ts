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

    constructor(role: string) {
        this.Role = role;
    }

    public PasswordIsMatch(): boolean {
        return this.Password == this.ConfirmPassword;
    }

}