import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Inject } from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {
 const auth = Inject(Auth)
 const router = Inject(Router)
 if(auth.currentUser && auth.currentUser != null &&  auth.currentUser != undefined ){
    return true
 }else{
  router.navigate(['/admin/crudProjectsandBlogs'])
  return false;

 }
};
