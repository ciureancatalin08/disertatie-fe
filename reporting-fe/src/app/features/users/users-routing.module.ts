import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './users.component';
import {UsersInsertComponent} from './components/insert-user/users-insert.component';


const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  },
  {
    path: 'insert',
    component: UsersInsertComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
