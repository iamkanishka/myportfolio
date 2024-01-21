import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Auth, signInWithEmailAndPassword  } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  // private auth: Auth = inject(Auth);
  // private signInWithEmailAndPassword = inject(signInWithEmailAndPassword);


  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],

    });
  }

  // SignIn( ) {
  //   return this.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
  //     .then((result:any) => {
  //       console.log(result);
  //     })
  //     .catch((error:any) => {
  //       window.alert(error.message);
  //     });
  // }

}
