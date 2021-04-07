import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {UserModel} from './user.model';
import {tap} from 'rxjs/operators';

interface AuthResponseData {
  kind?: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}


@Injectable({providedIn: 'root'})
export class AuthService {

  user = new BehaviorSubject<UserModel>(null);

  constructor(private http: HttpClient) {
  }

  signup(mail: string, pass: string): Observable<any> {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBkdPdNkWYVDF_NynOTuTt-japhgV8gso4',
      {
        email: mail,
        password: pass,
        returnSecureToken: true
      }
    )
      .pipe(
        tap(responseData => {
          const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
          const user = new UserModel(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            expirationDate
          );
          this.user.next(user);
          localStorage.setItem('userData', JSON.stringify(user));
        })
      );
  }

  login(mail: string, pass: string): Observable<any> {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBkdPdNkWYVDF_NynOTuTt-japhgV8gso4',
      {
        email: mail,
        password: pass,
        returnSecureToken: true
      }
    )
      .pipe(
        tap(responseData => {
          const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
          const user = new UserModel(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            expirationDate
          );
          this.user.next(user);
          localStorage.setItem('userData', JSON.stringify(user));
        })
      );
  }

  autoLogin(): any {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const  loadedUser = new UserModel(
      userData.email,
      userData.id,
      userData.TOKEN,
      new Date(userData.TOKENEXPIRATIONDATE)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  logout(): void {
    this.user.next(null);
    localStorage.clear();
  }


}
