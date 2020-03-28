import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable()
export class LoginGardGuard implements CanActivate {

  constructor(public _usuarioService:UsuarioService,
  public router:Router){

  }

  canActivate(){
  if(this._usuarioService.estaLogueado()){
    console.log('PASO EL GARD');
    return true;
  }else{
    this.router.navigate(['/login']);
    console.log('Bloqueado por el guard');
    return false;
  }
}
}
