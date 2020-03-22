import { Component, OnInit,OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit,OnDestroy {

  subscription: Subscription;

  constructor() {

    /*const obs=new Observable((observer: Subscriber<number>) => {
       
       let contador=0; 
      let intervalo=setInterval(() =>{

      contador+=1;
        
      observer.next(contador);
      if(contador===3){
        clearInterval(intervalo);
        observer.complete();
      }
      if(contador===2){
         //clearInterval(intervalo);
        observer.error('Auxilio!');
      }

      },1000);

    });*/

   /* this.regresaObservable().pipe(
      retry(2)
    )*/
    this.subscription = this.regresaObservable()
    
    .subscribe(numero => console.log('Sub ' , numero),
    error => console.error('Error en el obs' , error),
    () => console.log('El observable termino!')
    );
   }

  ngOnInit() {
  }

  ngOnDestroy(){
    console.log('La pagina se va a cerrar');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any>{

     return new Observable( (observer: Subscriber<any>) => {
       
       let contador=0;
       
      let intervalo=setInterval(() =>{

      contador++;

      const salida = {
        valor:contador

      }

        
      observer.next(salida);
      /*if(contador===3){
        clearInterval(intervalo);
        observer.complete();
      }*/
      /*if(contador===2){
         //clearInterval(intervalo);
        observer.error('Auxilio!');
      }*/

      },1000);

    }).pipe(
      map(resp =>  resp.valor),
      filter((valor, index) =>{

      if( (valor %2) ===1 ){
        //impar
        return true;
      }else{
        //par

        return false;
        
      }

      })      
    );



  }

}
