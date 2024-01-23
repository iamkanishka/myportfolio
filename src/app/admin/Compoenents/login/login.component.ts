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

  async SignIn() {
    try{
    const auth = await  signInWithEmailAndPassword(
        this.auth,
        this.loginForm.value.email,
        this.loginForm.value.password
      )

      this.router.navigate(["/admin/project/list"])



    }catch(err){

    }
  

    
  }
}
