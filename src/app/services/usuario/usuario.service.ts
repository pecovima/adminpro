import { URL_SERVICIOS } from './../../config/config';
import { Injectable } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import {HttpClient} from '@angular/common/http';
import { Observable, Subscriber, Subscription,throwError,of  } from 'rxjs';
import { retry, map, filter,catchError } from 'rxjs/operators';
//import 'rxjs/add/operator/map';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

  
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario:Usuario;
  token:string;
  menu:any=[];

  constructor(public http: HttpClient,
  public router:Router,
  public _subirArchivoService:SubirArchivoService ) { 
    this.cargarStorage();
    console.log('servicio de usuario listo');
  }

  estaLogueado(){
    return (this.token.length>5)?true:false;
  }

  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token=localStorage.getItem('token');
      this.usuario=JSON.parse(localStorage.getItem('usuario'));
      this.menu=JSON.parse(localStorage.getItem('menu'));
    }else{
      this.token='';
      this.usuario=null;
      this.menu=[];
    }
  }

  guardarStorage(id:string,token:string,usuario:Usuario, menu:any ){
        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        localStorage.setItem('menu', JSON.stringify(menu));

        this.usuario=usuario;
        this.token=token;
        this.menu=menu;
  }

  logout(){
    this.usuario=null;
    this.token='';
    this.menu=[];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

  loginGoogle(token:string){

    let url=URL_SERVICIOS+'/login/google';

    return this.http.post(url,{token})
     .pipe(
      map((resp:any)=>{
      this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);       
        return true;
      })
    );

  }

  login(usuario:Usuario, recordar:boolean=false){

    if(recordar){
      localStorage.setItem('email', usuario.email);
    }else{
      localStorage.removeItem('email');
    }


    let url=URL_SERVICIOS+'/login';

    return this.http.post(url,usuario).
    pipe(
      map((resp:any)=>{

        this.guardarStorage(resp.id, resp.token, resp.usuario,resp.menu);
        //localStorage.setItem('id', resp.id);
        //localStorage.setItem('token', resp.token);
        //localStorage.setItem('usuario', JSON.stringify(resp.usuario));
        
        return true;
      }),
    catchError(err => {     
      swal('Error en el Login', err.error.mensaje, 'error');
      return Observable.throw(err);
      })
    )

  }

  crearUsuario(usuario:Usuario){
    let url=URL_SERVICIOS+'/usuario';
    return this.http.post(url,usuario)
    .pipe(
    map((res:any)=>{
      swal('Usuario Creado', usuario.email, 'success');
      return res.usuario;      
    }),
      catchError(err => {     
      swal(err.error.mensaje, err.error.errors.message, 'error');
      return Observable.throw(err);
      })
    );

  }

  actualizarUsuario(usuario:Usuario){
    let url=URL_SERVICIOS+'/usuario/'+usuario._id;
    url+='?token='+this.token;
    console.log('URLACTU',url);
    console.log('USUSERACCT', usuario);

    return this.http.put(url,usuario)
     .pipe(
      map((resp:any)=>{

        if(usuario._id===this.usuario._id){
         let usuarioDb:Ucsuario=resp.usuario;
         this.guardarStorage(usuarioDb._id, this.token, usuarioDb,this.menu);
        }
      //this.usuario=res.usuario;  
   
      swal('Usuario Actualizado', usuario.nombre, 'success');
      return true;      
    }),
     catchError(err => {     
      swal(err.error.mensaje, err.error.errors.message, 'error');
      return Observable.throw(err);
      })
    );
  }

cambiarImagen(archivo:File, id:string){

  this._subirArchivoService.subirArchivo(archivo,'usuarios',id)
  .then((resp:any)=>{

    this.usuario.img=resp.usuario.img;
    swal('Imagen Actualizada', this.usuario.nombre, 'success');
    this.guardarStorage(id,this.token,this.usuario,this.menu);
    console.log(resp);
  })
  .catch(resp=>{
    console.log('Error', resp);
  });

  
}

cargarUsuarios(desde:number=0){
    let url= URL_SERVICIOS+'/usuario?desde='+desde;

    return this.http.get(url);


}

  buscarUsuarios(termino:string){

    let url=URL_SERVICIOS+'/busqueda/coleccion/usuarios/'+termino;
    return this.http.get(url)
      .pipe(
      map((resp:any)=>resp.usuarios)
    );
      console.log(termino)
  }

  borrarUsuario(id:string){
    let url=URL_SERVICIOS+'/usuario/'+id;
    url+='?token='+this.token;
    return this.http.delete(url)
       .pipe(
      map(resp=>{
      swal('Usuario borrado','El usuario ha sido eliminado correctamente', 'success');
      return true;   

      })
       );
  }

}
