export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;

  constructor(obj: any = {}){
    this.id = obj.id;
    this.name = obj.name;
    this.email = obj.email;
    this.password = obj.password;
    this.created_at = obj.created_at;
    this.updated_at = obj.updated_at;
  }


}
