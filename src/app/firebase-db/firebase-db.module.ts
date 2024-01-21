import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseDBService } from './firebase-db.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[FirebaseDBService]
})
export class FirebaseDBModule { }
