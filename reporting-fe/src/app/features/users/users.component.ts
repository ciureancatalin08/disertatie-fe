import {Component, OnInit} from '@angular/core';
import {User} from './models/users.model';
import {UsersService} from './services/users.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(private userService: UsersService) {
  }

  ngOnInit() {
    this.loadUsers();
  }

  refresh() {
    this.loadUsers();
  }

  private loadUsers() {
    this.userService.loadAllUsers()
      .subscribe(
        users => this.users = users,
        error => alert(error)
      );
  }
}
