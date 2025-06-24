import { Component, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
export { signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss'
})
export class AuthComponent {

  authForm: FormGroup;
  private auth: Auth = inject(Auth);

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  async SignIn() {
    try {
      const auth = await signInWithEmailAndPassword(
        this.auth,
        this.authForm.value.email,
        this.authForm.value.password
      );

      this.router.navigate(['/admin/project/list']);
    } catch (err) {
      console.log('Error signing in:', err);
      
    }
  }

}
