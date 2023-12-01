import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from '../../services/users.service';
import {Role, User} from '../../models/users.model';
import {UsersInsertButtonComponent} from '../../components/users-insert-button/users-insert-button.component';
import {MatDialogRef} from '@angular/material';
import {UsersTableComponent} from '../../components/users-table/users-table.component';
import {UsersComponent} from '../users/users.component';


@Component({
  selector: 'app-users-insert',
  templateUrl: './users-insert.component.html',
  styleUrls: ['./users-insert.component.css']
})
export class UsersInsertComponent implements OnInit {

  roles: Role[];
  public user: User = new User();

  constructor(private router: Router, private userService: UsersService,
              public dialogRef: MatDialogRef<UsersInsertButtonComponent>) {
  }

  ngOnInit() {
    this.userService.getRoles().subscribe(role => this.roles = role,
      error => console.log(error));

  }

  insert() {
    this.userService.insertUser(this.user).subscribe(
      () => {
        this.onNoClick();
        this.router.navigate(['/dashboard/users']);
      },
      error => {
        alert(error.me);
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}

