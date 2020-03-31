import { MagicNumber } from '../interfaces/MagicNumber'

export class UserCrudModel {
    public IdCard: string;
    public PrefixName: string;
    public FirstName: string;
    public LastName: string;
    public BirthDay: string;
    public Telephone: string;
    public Email: string;
    public Password: string;
    public ConfirmPassword: string;
    public Pin: string;
    public Role: string;
    public Key: string;

    constructor() {

    }

    public PasswordIsMatch(): boolean {
        return this.Password == this.ConfirmPassword;
    }

    public PinGenerate(): void {
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        this.Pin = "";
        for (var i = 0; i < MagicNumber.pinLength; i++) {
            var index = Math.floor((Math.random() * (characters.length)));
            this.Pin += characters[index];
        }
    }


}