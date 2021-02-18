import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Investimentos } from '../../shared/models/investimentos';
import { Erros } from '../../shared/models/erros';
import { DialogSuccessComponent } from '../../shared/components/dialog-success/dialog-success.component';
import { DialogAlertComponent } from 'src/app/shared/components/dialog-alert/dialog-alert.component';

@Component({
  selector: 'app-resgate',
  templateUrl: './resgate.component.html',
  styleUrls: ['./resgate.component.css']
})
export class ResgateComponent implements OnInit {

  investimentos: Investimentos;
  // acoes: Acoes[] = [];
  resgateForm: FormGroup;
  erro: Array<Erros> = [];

  constructor(
    private router: Router,
    private matDialog: MatDialog
  ) {
    this.resgateForm = new FormGroup({
      acoes: new FormArray([], []),
    });
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('data')) {
        this.investimentos = JSON.parse(sessionStorage.getItem('data')) as Investimentos;
        for (const acao of this.investimentos.acoes) {
          const f = this.createForm();
          f.patchValue({
            id: acao.id,
            nome: acao.nome,
            saldo: (acao.percentual / 100) * this.investimentos.saldoTotalDisponivel,
          });
          this.acoes.push(f);
        }
    } else {
      this.router.navigate(['/investimentos']);
    }
  }

  createForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(null, [Validators.required]),
      nome: new FormControl(null, [Validators.required]),
      saldo: new FormControl(null, [Validators.required]),
      valor: new FormControl(null),
    }, {
      validators: (abstractControll: AbstractControl) => {
        if (abstractControll.value.valor) {
          const idErroInArrayErros = this.erro.find(x => x.id === abstractControll.value.id);
          if (abstractControll.value.valor as number > abstractControll.value.saldo) {
              if (!idErroInArrayErros){
                const erros = new Erros();
                erros.id = abstractControll.value.id;
                erros.nome = abstractControll.value.nome;
                erros.saldo = abstractControll.value.saldo;
                erros.valor = abstractControll.value.valor;
                this.erro.push(erros);
              }
              return {error: 'required'};
          } else {
              const index: number = this.erro.indexOf(idErroInArrayErros);
              if (index !== -1) {
                  this.erro.splice(index, 1);
              }
          }
        }
        return null;
      }
    });
  }

  get acoes(): FormArray {
    return this.resgateForm.get('acoes') as FormArray;
  }

  get resgateTotal(): number {
    return this.acoes.value.map(i => i.valor).reduce((a, b) => (a + b));
  }

  submitForm(valor): void {
    console.log(this.erro);
    if (this.erro){
      for (const err of this.erro) {
        // if(err.valor > err.saldo){
          this.openDialog(`O limite máximo de resgate na ação ${err.nome} é de R$ ${err.saldo.toFixed(2)}.`);
        // }
      }
    }
    if (this.resgateTotal < 0.01) {
      this.openDialog('Por favor, preencha pelo menos um dos campos com um valor acima de R$ 0,00!', 2);
    } else if (valor.status === 'INVALID'){
      this.openDialog('Um ou mais dos valores solicitados excedem o valor do saldo total disponível!', 2);
    } else  {
      this.openDialog('SUCESSO! O valor solicitado estará em sua conta em até 5 dias úteis.', 1);
    }
  }

  openDialog(message?: string, type?: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'my-dialog';
    dialogConfig.data = { message };
    type === 1 ? this.matDialog.open(DialogSuccessComponent, dialogConfig)
    :  this.matDialog.open(DialogAlertComponent, dialogConfig);
  }

}
