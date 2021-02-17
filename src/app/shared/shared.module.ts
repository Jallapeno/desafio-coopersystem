import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoneyDirective } from './directives/money.directive';
import { DialogAlertComponent } from './components/dialog-alert/dialog-alert.component';
import { DialogSuccessComponent } from './components/dialog-success/dialog-success.component';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    MoneyDirective, 
    DialogAlertComponent, 
    DialogSuccessComponent, 
    DialogConfirmComponent
  ],
  exports: [
    DialogAlertComponent, 
    DialogSuccessComponent, 
    DialogConfirmComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule
  ]
})
export class SharedModule { }
