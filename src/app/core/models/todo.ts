import { User } from "./user";

export class Todo {
  id: string;
  title: string;
  description: string;
  done: boolean;
  author_id?: string;
  author = new User();
  created_at?: Date;
  updated_at?: Date;

  constructor(obj: any = {}){
    this.id = obj.id;
    this.title = obj.title;
    this.description = obj.description;
    this.done = obj.done;
    this.author_id = obj.author_id;
    this.author = obj.author;
    this.created_at = obj.created_at;
    this.updated_at = obj.updated_at;
  }

}
