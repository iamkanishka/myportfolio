import { Component, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
export { signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  private auth: Auth = inject(Auth);

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  SignIn() {
    signInWithEmailAndPassword(
      this.auth,
      this.loginForm.value.email,
      this.loginForm.value.password
    ).then((res: any) => {
      console.log(res);
     console.log(this.auth.currentUser);
      
    }).catch((err)=>{
      console.log(err);
      
    })

    // return this.auth.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
    //   .then((result:any) => {
    //     console.log(result);
    //   })
    //   .catch((error:any) => {
    //     window.alert(error.message);
    //   });

    // return this.auth.
  }
}
