import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataTableComponent } from './data-table/data-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableItemComponent } from './data-table/data-table-item/data-table-item.component';

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    DataTableItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
