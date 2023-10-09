import {Component, OnInit} from '@angular/core';
import {PermissionManagerServices} from '../../services/permission-manager.services';
import {Permission, Role} from '../../model/permission-manager.model';
import {MatDialog} from '@angular/material';
import {InsertComponent} from '../../containers/addpermission/insert.component';
import {AuthenticationService} from '../../../../core/services/authentication/authentication.service';

@Component({
  selector: 'app-permission-manager-firstpage',
  templateUrl: './permission-manager-firstpage.component.html',
  styleUrls: ['./permission-manager-firstpage.component.css']
})
export class PermissionManagerInsertButtonComponent implements OnInit {

  selectedRole: Role = <Role> {};
  selectedPermission: Permission = <Permission> {};
  roles = [];
  permissions = [];

  constructor(private permissionService: AuthenticationService,
              private permissionManagerService: PermissionManagerServices,
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
