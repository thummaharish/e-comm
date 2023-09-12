import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm !: FormGroup
  dataPost: any

  constructor(private FB: FormBuilder, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.FB.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    })

  }

  SignUp() {

    if (this.signUpForm.value.name === '' || this.signUpForm.value.email === '' || this.signUpForm.value.password === '') {
      alert('enter valid details')
    } else {
      this.api.postSignUp(this.signUpForm.value).subscribe(postData => {
        this.dataPost = postData
      })

      alert('Details added successfully')
      this.router.navigate(['/login'])
    }






  }

}
