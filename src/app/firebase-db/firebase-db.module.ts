import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseDBService } from './firebase-db.service';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import {
  getAnalytics,
  provideAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../../environments/environment.development';
import { RestAPIServiceService } from './MongodbRESTAPIDB/rest-apiservice.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    provideFirebaseApp(() =>
      initializeApp(environment.firebaseConfig)
    ),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [FirebaseDBService, ScreenTrackingService, UserTrackingService,RestAPIServiceService ],
})
export class FirebaseDBModule {}
