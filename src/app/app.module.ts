import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFireModule} from '@angular/fire';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MaterialModule} from './material.module';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import {TrainingComponent} from './training/training.component';
import {CurrentTrainingComponent} from './training/current-training/current-training.component';
import {NewTrainingComponent} from './training/new-training/new-training.component';
import {PastTrainingsComponent} from './training/past-trainings/past-trainings.component';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './navigation/header/header.component';
import {SidenavListComponent} from './navigation/sidenav-list/sidenav-list.component';
import {TrainingConfirmationComponent} from './training/training-confirmation.component';
import {AuthService} from './auth/auth.service';
import {TrainingService} from './training/training.service';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {UIService} from './shared/UI.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent,
    TrainingConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [AuthService, TrainingService, UIService],
  bootstrap: [AppComponent],
  entryComponents: [TrainingConfirmationComponent]
})
export class AppModule {
}
