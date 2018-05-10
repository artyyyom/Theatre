import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import {PaginatorModule} from 'primeng/paginator';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    PaginatorModule
  ]
  
})
export class SharedModule { }
