import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import {environment} from "../../../../environments/environment";
import {BackendService} from "../../../core/services/backend/backend.service";
import {Role, User, UserChangePasswordDTO, UserJSON, UserUpdate} from "../models/users.model";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersEndpoint = 'users';

  constructor(private backendService: BackendService) {
  }

  insertUser(user: User): Observable<any> {
    return this.backendService
      .post(`jbugs/jbugs-api/users/insert`, user, {responseType: 'text'});

  }

  getRoles(roles: Role[]): Observable<any> {
    return this.backendService.get(`${environment.baseUrl}/roles/types`);
  }

  getAllUsers(): Observable<any> {
    return this.backendService.get(`${environment.baseUrl}/${this.usersEndpoint}`);
  }

  updateUser(user: UserUpdate): Observable<any> {
    return this.backendService.patch(`${environment.baseUrl}/${this.usersEndpoint}`, user);
  }

  loadAllUsers(): Observable<User[]> {
    return this.backendService.get(`${environment.baseUrl}/${this.usersEndpoint}`);
  }
}
