import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutocadastroComponent } from '../autocadastro/autocadastro.component';
import {
  VisualizacaoPedidoComponent,
  PaginaInicialFuncionarioComponent,
  ListarRoupaComponent,
  InserirEditarRoupaComponent,
  ListarFuncionarioComponent,
  InserirFuncionarioComponent,
  EditarFuncionarioComponent,
  RelatorioComponent,
  RelatorioClientesFieisComponent,
  RelatorioReceitasComponent,
} from '../perfil-funcionario';
import {
  PaginaInicialClienteComponent,
  ConsultaPedidosComponent,
  PedidoOnlineComponent,
  OrcamentosComponent,
  PagarPedidoComponent,
  ListagemPedidosComponent
} from '../perfil-cliente';
import { LoginRoutes } from '../auth/auth-routing.module';
import { AuthGuard } from '../auth/auth.guard';
import { Perfil } from '../shared';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'cadastro', component: AutocadastroComponent },
  {
    path: 'home',
    component: PaginaInicialClienteComponent,
    canActivate: [AuthGuard],
    data: {
      role: [Perfil.CLIENTE]
    }
  },
  {
    path: 'pedido',
    component: PedidoOnlineComponent,
    canActivate: [AuthGuard],
    data: {
      role: [Perfil.CLIENTE]
    }
  },
  {
    path: 'pedido/orcamento',
    component: OrcamentosComponent,
    canActivate: [AuthGuard],
    data: {
      role: [Perfil.CLIENTE]
    }
  },
  {
    path: 'pedido/:id/pagar',
    component: PagarPedidoComponent,
    canActivate: [AuthGuard],
    data: {
      role: [Perfil.CLIENTE]
    }
  },
  {
    path: 'pedidos',
    component: ListagemPedidosComponent,
    canActivate: [AuthGuard],
    data: {
      role: [Perfil.CLIENTE]
    }
  },
  {
    path: 'pedidos/consulta',
    component: ConsultaPedidosComponent,
    canActivate: [AuthGuard],
    data: {
      role: [Perfil.CLIENTE]
    }
   },
  {
    path: 'visualizao/pedido/funcionario',
    component: VisualizacaoPedidoComponent,
    canActivate: [AuthGuard],
    data: {
      role: [Perfil.FUNCIONARIO]
    }
  },
  {
    path: 'pagina/inicial/funcionario',
    component: PaginaInicialFuncionarioComponent,
    canActivate: [AuthGuard],
    data: {
      role: [Perfil.FUNCIONARIO]
    }
  },
  {
    path: 'roupa/listar',
    component: ListarRoupaComponent ,
    canActivate: [AuthGuard],
    data: {
      role: [Perfil.FUNCIONARIO]
    }
  },
  {
    path: 'roupa/inserir',
    component: InserirEditarRoupaComponent ,
    canActivate: [AuthGuard],
    data: {
      role: [Perfil.FUNCIONARIO]
    }
  },
  {
    path: 'roupa/editar/:id',
    component: InserirEditarRoupaComponent,
    canActivate: [AuthGuard],
    data: {
      role: [Perfil.FUNCIONARIO]
    }
  },
  {
    path: 'relatorios',
    component: RelatorioComponent ,
    canActivate: [AuthGuard],
    data: {
      role: [Perfil.FUNCIONARIO]
    }
  },
  {
    path: 'relatorios-clientes-fieis',
    component: RelatorioClientesFieisComponent,
    canActivate: [AuthGuard],
    data: {
      role: [Perfil.FUNCIONARIO]
    }
  },
  {
    path: 'relatorios-receitas',
    component: RelatorioReceitasComponent,
    canActivate: [AuthGuard],
    data: {
      role: [Perfil.FUNCIONARIO]
    }
  },
  {
    path: 'funcionario/listar',
    component: ListarFuncionarioComponent,
    canActivate: [AuthGuard],
    data: {
      role: [Perfil.FUNCIONARIO]
    }
  },
  {
    path: 'funcionario/inserir',
    component: InserirFuncionarioComponent,
    canActivate: [AuthGuard],
    data: {
      role: [Perfil.FUNCIONARIO]
    }
  },
  {
    path: 'funcionario/editar/:id',
    component: EditarFuncionarioComponent,
    canActivate: [AuthGuard],
    data: {
      role: [Perfil.FUNCIONARIO]
    }
  },
  ...LoginRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
