import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages-routing.module';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatCurrencyFormatModule } from 'mat-currency-format';
import { NgxCurrencyModule } from 'ngx-currency';

import { ResgateComponent } from './resgate/resgate.component';
import { InvestimentosComponent } from './investimentos/investimentos.component';
import { DialogAlertComponent } from '../shared/components/dialog-alert/dialog-alert.component';
import { DialogConfirmComponent } from '../shared/components/dialog-confirm/dialog-confirm.component';
import { DialogSuccessComponent } from '../shared/components/dialog-success/dialog-success.component';

@NgModule({
  declarations: [
    ResgateComponent,
    InvestimentosComponent,
    DialogAlertComponent,
    DialogConfirmComponent,
    DialogSuccessComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    RouterModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatButtonModule,
    MatGridListModule,
    MatDividerModule,
    MatInputModule,
    MatCurrencyFormatModule,
    NgxCurrencyModule
  ]
})
export class PagesModule { }
