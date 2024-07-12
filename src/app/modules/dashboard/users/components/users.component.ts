import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../../core/models/user';
import { first } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  users : User[] = [];
  loading = true;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService
      .getAll()
      .pipe(first())
      .subscribe(
        (response: any) => {
          if(response.status === 'success'){
            this.users = response.users;
            this.loading = false;
          }
        },
        () => {
          this.loading = false;
        }
      );
  }
}
