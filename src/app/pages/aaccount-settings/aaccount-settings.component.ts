import { SettingsService } from './../../services/service.index';
import { Component, OnInit, Inject } from '@angular/core';
//import { DOCUMENT } from '@angular/platform-browser';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-aaccount-settings',
  templateUrl: './aaccount-settings.component.html',
  styleUrls: ['./aaccount-settings.component.css']
})
export class AaccountSettingsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document, public _ajustes:SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(tema: string , link:any){
    console.log(tema);
    this.aplicarCheck(link);
     this._ajustes.aplicarTema(tema);

   /* let url=`assets/css/colors/${ tema }.css`;
     this._document.getElementById('tema').setAttribute('href',url);
     this._ajustes.ajustes.tema=tema;
     this._ajustes.ajustes.temaUrl=url;
     this._ajustes.guardarAjustes();*/
  }

  aplicarCheck(link: any){

    let selectores: any=document.getElementsByClassName('selector');

    for(let ref of selectores){
    ref.classList.remove('working');
    }

    link.classList.add('working');

  }

  colocarCheck(){

  let selectores: any=document.getElementsByClassName('selector');

  let tema=this._ajustes.ajustes.tema;

    for(let ref of selectores){

      if(ref.getAttribute('data-theme') === tema){
        ref.classList.add('working');
        break;
      }

    }


  }

 

}
