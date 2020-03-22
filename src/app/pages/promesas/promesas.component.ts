import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() {
/*let promesa= new Promise((resolve, reject) =>{
   let contador=0;

    let intervalo=setInterval(()=>{
    contador+=1;
    console.log('Contador promesa' , contador);
      
     if(contador===3){
       //resolve();
       resolve('Ok!');
       //reject('Simplemente un error');
       clearInterval(intervalo);
     } 

    },1000);

});

promesa.then(
  mensaje => console.log('Termino!', mensaje)
  //() => console.log('Termino!')
  //() => console.log('Error')
  ).catch(error => console.error('Error en la promesa', error));*/
  

  //MetodocargarTres
  this.contarTres().then(
  mensaje => console.log('Termino!', mensaje)
  //() => console.log('Termino!')
  //() => console.log('Error')
  ).catch(error => console.error('Error en la promesa', error));

   }

  ngOnInit() {
  }

  contarTres():Promise<boolean>{

    //let promesa= new Promise((resolve, reject) =>{
    return new Promise((resolve, reject) =>{
   let contador=0;

    let intervalo=setInterval(()=>{
    contador+=1;
    console.log('Contador promesa' , contador);
      
     if(contador===3){
       //resolve();
       resolve(true);
       //reject('Simplemente un error');
       clearInterval(intervalo);
     } 

    },1000);

});

//return promesa;

  }

}
