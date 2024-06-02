import { User } from '../interfaces/user.interface';

export class UserModel implements User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public dateOfBirth: Date
  ) {}

  getAge(): number {
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
