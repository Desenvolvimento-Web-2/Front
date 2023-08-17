import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Roupa } from 'src/app/shared/models/roupa.model';
import { RoupaService } from '../services/roupa.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inserir-editar-roupa',
  templateUrl: './inserir-editar-roupa.component.html'
})
export class InserirEditarRoupaComponent  implements OnInit {
  @ViewChild('formRoupa') formRoupa : NgForm;
  novaRoupa: boolean = true;
  // roupa : Roupa = new Roupa();
  roupa : Roupa;
  id!: string;
  loading!: boolean;

  constructor(
    private roupaService: RoupaService,
    private route: ActivatedRoute,
    private router: Router
  ){ }

  ngOnInit(): void {
    this.roupa = new Roupa();
    this.loading = false;

    this.id = this.route.snapshot.params['id'];
    this.novaRoupa = !this.id;

    if(!this.novaRoupa) {
      this.roupaService.buscarPorId(+this.id).subscribe(
        roupa => {
          this.roupa = roupa;
        }
      );
    }
  }
  salvar(): void {
    this.loading = true;
    if(this.formRoupa.form.valid) {
      if (this.novaRoupa) {
        this.roupaService.inserir(this.roupa).subscribe(
          roupa => {
            this.loading = false;
            this.router.navigate( ["/roupa/listar"]);
          }
        );
      }
      else {
        this.roupaService.alterar(this.roupa).subscribe(
          (roupa) => {
            console.log(this.roupa)
            this.loading = false;
            this.router.navigate( ["/roupa/listar"]);
          }
        );
      }
    }
    this.loading = false;
  }
}