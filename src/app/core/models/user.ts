export class User {
  id!: string;
  name: string;
  email: string;
  password: string;
  email_verified_at!: Date;
  created_at!: Date;
  updated_at!: Date;

  constructor(obj: any = {}){
    this.id = obj.id;
    this.name = obj.name;
    this.email = obj.email;
    this.password = obj.password;
    this.email_verified_at = obj.email_verified_at;
    this.created_at = obj.created_at;
    this.updated_at = obj.updated_at;
  }

}
