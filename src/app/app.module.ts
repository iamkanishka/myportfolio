import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { PublicModule } from './public/public.module';
import { TestingComponent } from './testing/testing.component';
import { ReactiveFormsModule } from '@angular/forms';

 
@NgModule({
  declarations: [
    AppComponent,
    TestingComponent,
 
   
  ],
  imports: [
    BrowserModule,
    AdminModule,
    PublicModule,
    AppRoutingModule,
    ReactiveFormsModule

  ],
  providers: [
 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
