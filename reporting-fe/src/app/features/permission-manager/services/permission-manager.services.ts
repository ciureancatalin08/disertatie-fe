import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {environment} from '../../../../environments/environment';
import {BackendService} from '../../../core/services/backend/backend.service';
import {Permission} from '../model/permission-manager.model';
import {Role} from '../../users/models/users.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionManagerServices {

  private rolesEndpoint = 'roles';
  private permissionsByRoleEndpoint = 'permissionsByRole';

  constructor(private backendService: BackendService) {
  }


  insertPermission(roleId: number, permissionId: number): Observable<Permission> {
    return this.backendService
      .put(`${environment.baseUrl}/${this.rolesEndpoint}/${roleId}/${permissionId}`, {});
  }

  deletePermission(roleId: number, permissionId: number): Observable<Permission> {
    return this.backendService.delete(`${environment.baseUrl}/${this.rolesEndpoint}/${roleId}/${permissionId}`);
  }

  public getAllRolesAndPermissions(): Observable<Role[]> {
    return this.backendService
      .get(`${environment.baseUrl}/${this.rolesEndpoint}`);
  }

  public getAllAvailablePermissions(roleId: number): Observable<Permission[]> {
    return this.backendService
      .get(`${environment.baseUrl}/${this.rolesEndpoint}/${this.permissionsByRoleEndpoint}/${roleId}`);
  }

}
