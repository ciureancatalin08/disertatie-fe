import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PermissionManagerServices} from '../../services/permission-manager.services';
import {AuthenticationService} from '../../../../core/services/authentication/authentication.service';
import {Permission, Role} from '../../model/permission-manager.model';
import {InsertComponent} from '../addpermission/insert.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-permission-manager',
  templateUrl: './permission-manager.component.html',
  styleUrls: ['./permission-manager.component.css']
})
export class PermissionManagerInsertComponent implements OnInit {

  selectedRole: Role = <Role> {};
  selectedPermission: Permission = <Permission> {};
  roles = [];
  permissions = [];

  constructor(private permissionManagerService: PermissionManagerServices,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.permissions = [];
    this.roles = [];
    this.selectedPermission = <Permission> {};

    this.permissionManagerService.getAllRolesAndPermissions()
      .subscribe((rolesAndPermission) => {
        this.roles = rolesAndPermission;
      });
  }

  deletePermission() {
    this.permissionManagerService.deletePermission(this.selectedRole.roleId, this.selectedPermission.id)
      .subscribe(
        value => {
          this.ngOnInit();
          alert('deleted');
        },
        error1 => alert(error1.error.message)
      );
  }


  openPermissionDialog() {
    const dialogRef = this.dialog.open(InsertComponent, {
      data: {
        rolesAndPermissions: this.roles
      },
      width: '590px',
      height: '560px'

    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      this.permissions = result;
    });
  }
}
