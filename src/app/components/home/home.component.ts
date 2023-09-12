import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Cart1Service } from 'src/app/api/cart1.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public cartItems: number = 0
  LogOut: boolean = false
  SignIn: boolean = true
  logInData !: any
  isLoginDetails !: any

  constructor(private cart1Api: Cart1Service, private router: Router) { }

  ngOnInit(): void {
    this.cart1Api.products().subscribe(res => {
      this.cartItems = res.length
    })

    this.logInData = localStorage.getItem('LogIn User')
    this.isLoginDetails = JSON.parse(this.logInData)

  }

  signIn() {
    if (this.isLoginDetails) {
      this.SignIn = true;
      this.LogOut = false;
    } else {
      this.SignIn = false
      this.LogOut = true
      this.router.navigate((['/login']))
    }
  }

  logOut() {
    this.SignIn = true
    this.LogOut = false
    localStorage.clear()
    this.router.navigate(['/AllProductsList'])
  }

 
}
