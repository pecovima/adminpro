import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css']
})
export class ModalUploadComponent implements OnInit {

  //oculto:string='';
  imagenSubir:File;
  imagenTemp:string;

  constructor(
    public _subirArchivoService:SubirArchivoService,
    public _modalUploadService:ModalUploadService
  ) {
    console.log('Modal listo');
   }

  ngOnInit() {
  }


  cerrarModal(){
    this.imagenSubir=null;
    this.imagenTemp=null;

    this._modalUploadService.ocultarModal();
  }

   seleccionImagen(archivo:File){
    if(!archivo){
      this.imagenSubir=null;
      return;
    }

    if(archivo.type.indexOf('image') <0){
      swal('Sólo imagenes','El archvio seleccionado no es una imagen', 'error');
      this.imagenSubir=null;
      return;
    }

    this.imagenSubir=archivo;

    let reader=new FileReader();
    let urlImagenTemp=reader.readAsDataURL(archivo);

    reader.onloadend=()=>this.imagenTemp=reader.result as string;

    console.log(event);
  }

  subirImagen(){
  this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
  .then(resp=>{
    console.log
    this._modalUploadService.notificacion.emit(resp);
    //this._modalUploadService.ocultarModal();
    this.cerrarModal();
  })
  .catch(err=>{
    console.log('Error emn la carga...')
  })
  }



}
