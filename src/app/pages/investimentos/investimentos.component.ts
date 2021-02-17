import { Component, OnInit, Inject  } from '@angular/core';
import { InvestimentosService } from '../../core/services/investimentos.service';
import { Investimentos } from '../../shared/models/investimentos';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogAlertComponent } from '../../shared/components/dialog-alert/dialog-alert.component';

@Component({
  selector: 'app-investimentos',
  templateUrl: './investimentos.component.html',
  styleUrls: ['./investimentos.component.css']
})
export class InvestimentosComponent implements OnInit {
  load = true;
  investimentos: Investimentos[] = [];
  displayedColumns: string[] = ['nome', 'objetivo', 'saldoTotalDisponivel'];

  constructor(
    private investimentoService: InvestimentosService,
    private router: Router,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAllInvestimentos();
  }

  getAllInvestimentos(): void {
    this.investimentoService.getAllInvestimentos().subscribe(
      res => {
        console.log(res);
        this.investimentos = res;
        this.load = false;
      }, error => {
        console.log(error);
      }
    );
  }

  resgate(row: Investimentos): void {
    if (row.indicadorCarencia === 'N' ){
      sessionStorage.setItem('data', JSON.stringify(row));
      this.router.navigate(['/resgate']);
    } else {
      this.openDialog(
        `O investimento "${row.nome}" não pode ser resgatado pois encontra-se em carência.`);
    }
  }

  openDialog(message?: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'my-dialog';
    dialogConfig.data = { message };
    this.matDialog.open(DialogAlertComponent, dialogConfig);
  }

}
