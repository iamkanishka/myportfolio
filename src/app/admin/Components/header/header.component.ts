import { Component, Inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css',
})
export class HeaderComponent {
 protected  auth :Auth = Inject(Auth);
   
constructor (private router :Router){}

signOut(){
  this.auth.signOut
  this.router.navigate(['/admin/crudProjectsandBlogs']);
}
}
