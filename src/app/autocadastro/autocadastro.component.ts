import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ViaCepService, CadastroService } from './services';
import { Endereco, Perfil, Usuario } from '../shared';
import { LoginService } from '../auth/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autocadastro',
  templateUrl: './autocadastro.component.html',
})
export class AutocadastroComponent implements OnInit {
  public endereco: Endereco;
  public usuario: Usuario;
  public message: string;
  public loading: boolean;
  @ViewChild('formCadastro') formCadastro: NgForm;

  constructor(
    private viacepService: ViaCepService, 
    private cadastroService: CadastroService,
    private loginService: LoginService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.endereco = new Endereco();
    this.usuario = new Usuario();
  }

  buscaEndereco() {
    this.viacepService.getAddress(this.formCadastro.form.get('cep')?.value)
      .subscribe((address) => {
        this.formCadastro.form.patchValue({
          rua: address.logradouro,
          bairro: address.bairro,
          estado: address.uf,
          cidade: address.localidade,
        });
      });
  }

  limparForm() {
    this.formCadastro.reset({});
  }

  cadastro() {
    if (this.formCadastro.invalid) return;
    this.usuario.endereco = this.endereco.toString();
    this.usuario.perfil = 'cliente';
    this.cadastroService.cadastro(this.usuario)
      .subscribe((usu) => {
        if (usu != null) {
          this.loginService.usuarioLogado = usu;
          this.loading = false;
          this.redirecionaUsuarioLogado();
        } else {
          this.message = "Erro ao fazer cadastro";
        }
      });
  }

  redirecionaUsuarioLogado() {
    if (this.loginService.usuarioLogado.perfil === Perfil.CLIENTE)
      this.router.navigate(["/home"]);
    else {
      this.router.navigate(["/pagina/inicial/funcionario"]);
    }
  }
}