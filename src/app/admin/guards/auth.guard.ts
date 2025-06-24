import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class authGuard {
  constructor(private _router: Router, private auth: Auth) {}

  canActivate(): boolean {
    if (!this.auth.currentUser) {
      this._router.navigateByUrl('/admin/auth');
      return false;
    } else {
      return true;
    }
  }
}
