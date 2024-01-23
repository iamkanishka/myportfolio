import { Component, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
export { signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  private auth: Auth = inject(Auth);

  constructor(private formBuilder: FormBuilder, private router:Router) {
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
     this.router.navigate(['/admin/project/list']);
      
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
