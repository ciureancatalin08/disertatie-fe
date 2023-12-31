import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {User} from '../../models/users.model';
import {AuthenticationService} from '../../../../core/services/authentication/authentication.service';
import {UsersInsertComponent} from '../insert-user/users-insert.component';

@Component({
  selector: 'app-users-insert-button',
  templateUrl: './users-insert-button.component.html',
  styleUrls: ['./users-insert-button.component.css']
})
export class UsersInsertButtonComponent implements OnInit {

  user: User;

  @Output()
  clicked: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog,
              private permissionService: AuthenticationService) {
  }

  ngOnInit() {
  }

  showButton(): boolean {
    if (this.permissionService.getPermissions() === null) {
      return false;
    }

    for (let per of this.permissionService.getPermissions()) {
      if (per === 'USER_MANAGEMENT') {
        return true;
      }
    }
    return false;
  }

  addDialog() {
    const dialogRef = this.dialog.open(UsersInsertComponent, {
      width: '450px',
      height: '560px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.user = result;
      this.clicked.emit();
    });
  }
}
