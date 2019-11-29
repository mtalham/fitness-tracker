import {AuthData, User} from './user.model';
import {Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  private user: User;
  authChange = new Subject<boolean>();

  constructor(private router: Router) {
  }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.reroute();
  }

  loginUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.reroute();
  }

  logout(): void {
    this.user = null;
    this.reroute(false, '/login');
  }

  getUser(): User {
    return {...this.user};
  }

  isAuthenticated(): boolean {
    return this.user != null;
  }

  private reroute(authChange = true, url = '/training') {
    this.authChange.next(authChange);
    this.router.navigate([url]);
  }
}
