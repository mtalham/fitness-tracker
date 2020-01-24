import {AuthData} from './user.model';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {TrainingService} from '../training/training.service';
import {UIService} from '../shared/UI.service';
import {Store} from '@ngrx/store';
import {getIsAuthenticated, State} from '../app.reducer';
import {StartLoading, StopLoading} from '../shared/ui.actions';
import {ToggleAuthentication} from './auth.reducer';
import {auth} from 'firebase/app';

@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<State>
  ) {
  }

  googleSignIn() {
    const provider = new auth.GoogleAuthProvider();

    this.afAuth.auth.signInWithPopup(provider)
      .then(res => console.log(res))
      .catch(err => this.handleError(err.message));
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
    this.store.dispatch(new StartLoading());
    // this.uiService.loadingChange.next(true);
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => {
        this.store.dispatch(new StopLoading());
        // this.uiService.loadingChange.next(false);
        this.reroute();
      })
      .catch(err => this.handleError(err.message));
  }

  loginUser(authData: AuthData) {
    this.store.dispatch(new StartLoading());
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => this.store.dispatch(new StopLoading()))
      .catch(err => this.handleError(err.message));
  }

  logout(): void {
    this.afAuth.auth.signOut();
  }

  isAuthenticated() {
    return this.store.select(getIsAuthenticated);
  }

  private handleError(message: string) {
    this.store.dispatch(new StopLoading());
    this.uiService.showSnackbar(message);
  }

  private reroute(authChange = false, url = '/login') {
    this.store.dispatch(ToggleAuthentication({payload: authChange}));
    this.router.navigate([url]);
  }
}
