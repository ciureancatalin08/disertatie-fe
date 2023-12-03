import {Component, OnInit} from '@angular/core';
import {Bug} from '../../models/bugs.model';
import {BugsService} from '../../services/bugs.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../../core/services/authentication/authentication.service';
import {MatDialogRef} from '@angular/material';
import {User} from '../../../users/models/users.model';
import {UsersService} from '../../../users/services/users.service';

@Component({
  selector: 'app-bug-add',
  templateUrl: './bug-add.component.html',
  styleUrls: ['./bug-add.component.css'],

})
export class BugAddComponent implements OnInit {


  public bug: Bug = new Bug();
  usersList: User[];

  constructor(private bugService: BugsService, private router: Router, public dialogRef: MatDialogRef<BugAddComponent>,
              public permissionService: AuthenticationService, private userService: UsersService) {
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(users => this.usersList = users,
      error => console.log(error));
  }

  insert() {
    this.bug.createdId = this.permissionService.getUserId();

    this.bugService.insertBug(this.bug).subscribe(() => {
        this.bugService.loadAllBugs();
        this.dialogRef.close();
      },
      (error => {
        alert(error.error.message);
      }),
    );
  }
}
