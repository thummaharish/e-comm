import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup
  user: any
  loginData: any
  localdata: any

  constructor(private FB: FormBuilder, private api: ApiService, private router: Router,
    private _http: HttpClient) { }


  ngOnInit(): void {
    this.loginForm = this.FB.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


  logIn() {
    this._http.get('http://localhost:3000/signup').subscribe(loginRes => {

      this.loginData = JSON.stringify(loginRes)

      const loginUser = JSON.parse(this.loginData).find((a: any) =>
        a.email === this.loginForm.value.email && a.password === this.loginForm.value.password)

      if (loginUser) {
        alert('log in successs full')
      
        localStorage.setItem('LogIn User', JSON.stringify(loginUser))
        this.router.navigate(['/view-all-products'])
      } else {
        alert('The login details are not matched')
      }

    })
  }


}




