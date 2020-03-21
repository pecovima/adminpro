import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

declare function init_plugin();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {

    init_plugin();
  }

  ingresar(){
    console.log('Ingresando');
    this.router.navigate(['/dashboard']);
  }

}
