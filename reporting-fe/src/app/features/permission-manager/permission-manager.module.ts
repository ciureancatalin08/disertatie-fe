import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PermissionRoutingModule} from './permission-manager-routing.module';
import {InsertComponent} from './containers/addpermission/insert.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PermissionManagerInsertComponent} from './containers/permission-manager/permission-manager.component';


import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatOptionModule,
  MatRadioModule,
  MatSelectModule
} from '@angular/material';

@NgModule({
  declarations: [
    PermissionManagerInsertComponent,
    InsertComponent,
  ],
  entryComponents: [
    InsertComponent
  ],
  imports: [
    CommonModule,
    PermissionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatCheckboxModule,
    MatListModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatOptionModule,
    MatRadioModule

  ]
})
export class PermissionManagerModule {
}
