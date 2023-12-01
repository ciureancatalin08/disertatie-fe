import {Component, Inject, OnInit} from '@angular/core';
import {PermissionManagerServices} from '../../services/permission-manager.services';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Permission, Role} from '../../model/permission-manager.model';

interface DialogData {

  rolesAndPermissions: any;
}

@Component({
  selector: 'app-insertpermission',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private permissionManagerService: PermissionManagerServices,
    private dialogRef: MatDialogRef<PermissionManagerServices>
  ) {
  }

  selectedRole: Role = <Role> {};
  permissions: Permission[] = [];
  roles = [];
  selection: Permission = <Permission> {};

  addPermission() {
    this.permissionManagerService.insertPermission(this.selectedRole.roleId, this.selection.id)
      .subscribe(
        value => {
          this.dialogRef.close();
          alert('Permission added');
        },
        error => {
          alert(error.error.message);
        });
  }

  ngOnInit() {

    this.roles = this.data.rolesAndPermissions;
  }


  public getAllAvailablePermissions(selectedRoleId: number) {
    this.permissionManagerService.getAllAvailablePermissions(selectedRoleId)
      .subscribe(result => {
        this.permissions = result;
      });
  }
}
