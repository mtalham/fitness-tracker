import {AuthData} from './user.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {TrainingService} from '../training/training.service';

@Injectable()
export class AuthService {
  private isAuth = false;
  authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService
  ) {
  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.reroute(true, '/training');
      } else {
        this.trainingService.cancelSubscriptions();
        this.reroute();
      }
    });
  }

  registerUser(authData: AuthData) {
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(res => {
        console.log(res);
        this.reroute();
      })
      .catch(err => console.log(err));
  }

  loginUser(authData: AuthData) {
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .catch(err => console.log(err));
  }

  logout(): void {
    this.afAuth.auth.signOut();
  }

  isAuthenticated(): boolean {
    return this.isAuth;
  }

  private reroute(authChange = false, url = '/login') {
    this.isAuth = authChange;
    this.authChange.next(authChange);
    this.router.navigate([url]);
  }
}
