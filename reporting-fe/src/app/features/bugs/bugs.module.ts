import {NgModule} from '@angular/core';

import {HttpClientModule} from '@angular/common/http';

import {CommonModule} from '@angular/common';
import {BugsComponent} from './bugs.component';
import {BugsRoutingModule} from './bugs-routing.module';
import {BugsTableComponentComponent} from './components/bugs-table-component/bugs-table-component.component';
import {ChartsModule} from 'ng2-charts';
import {BugAddComponent} from './components/bug-add/bug-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BugEditComponent} from './components/bug-edit/bug-edit.component';
import {BugViewComponent} from './components/bug-view/bug-view.component';
import {BugsStatisticsComponent} from './components/bugs-statistics/bugs-statistics.component';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  NativeDateModule,
} from '@angular/material';


@NgModule({
  declarations: [
    BugsComponent,
    BugsTableComponentComponent,
    BugAddComponent,
    BugEditComponent,
    BugViewComponent,
    BugsStatisticsComponent
  ],

  entryComponents: [BugsTableComponentComponent, BugEditComponent, BugViewComponent],

  imports: [
    ChartsModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    CommonModule,
    MatSortModule,
    BugsRoutingModule,
    MatCardModule,
    MatListModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    NativeDateModule,
    MatSelectModule,
    MatPaginatorModule,
    MatButtonToggleModule
  ]
})
export class BugsModule {
}
