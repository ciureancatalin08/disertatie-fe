import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersRoutingModule} from './users-routing.module';
import {UsersInsertButtonComponent} from './components/users-insert-button/users-insert-button.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UsersUpdateDialogComponent} from './components/users-update-dialog/users-update-dialog.component';

import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatListModule,
  MatOptionModule, MatPaginatorModule,
  MatRadioModule,
  MatSelectModule, MatSnackBarModule,
  MatTableModule
} from '@angular/material';
import {UsersTableComponent} from './components/users-table/users-table.component';
import {UsersComponent} from './users.component';
import {UsersInsertComponent} from './components/insert-user/users-insert.component';

@NgModule({
  declarations: [
    UsersComponent,
    UsersInsertButtonComponent,
    UsersInsertComponent,
    UsersTableComponent,
    UsersUpdateDialogComponent
  ],
  entryComponents: [
    UsersInsertComponent, UsersUpdateDialogComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatRadioModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatListModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule,
    MatPaginatorModule
  ],

})
export class UsersModule {
}
