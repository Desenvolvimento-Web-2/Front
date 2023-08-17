export class UsuarioLogado {
  constructor (
    public id?: number,
    public nome?: string,
    public email?: string,
    public senha?: string,
    public perfil?: 'cliente' | 'funcionario',
  ){}
}