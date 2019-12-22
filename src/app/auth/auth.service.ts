import {AuthData} from './user.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {TrainingService} from '../training/training.service';
import {UIService} from '../shared/UI.service';
import {Store} from '@ngrx/store';
import {State} from '../app.reducer';
import {UIAction} from '../shared/ui.reducer';

@Injectable()
export class AuthService {
  private isAuth = false;
  authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<State>
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
    this.uiService.loadingChange.next(true);
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.uiService.loadingChange.next(false);
        this.reroute();
      })
      .catch(err => this.handleError(err.message));
  }

  loginUser(authData: AuthData) {
    // this.uiService.loadingChange.next(true);
    this.store.dispatch({type: UIAction.START_LOADING});
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => this.store.dispatch({type: UIAction.STOP_LOADING}))
      .catch(err => this.handleError(err.message));
  }

  logout(): void {
    this.afAuth.auth.signOut();
  }

  isAuthenticated(): boolean {
    return this.isAuth;
  }

  private handleError(message: string) {
    this.store.dispatch({type: UIAction.STOP_LOADING});
    // this.uiService.loadingChange.next(false);
    this.uiService.showSnackbar(message);
  }

  private reroute(authChange = false, url = '/login') {
    this.isAuth = authChange;
    this.authChange.next(authChange);
    this.router.navigate([url]);
  }
}
