import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {SaveUserRequest} from '../model/user/save-user-request';
import {UserAuthRequest} from '../model/user/user-auth-request';
import {UserAuthResponse} from '../model/user/user-auth-response';

/**
 * Service for handling user authentication, including login and registration.
 * This service interacts with the backend API to authenticate users and manage user data.
 */
@Injectable({
  providedIn: 'root'
})

export class UserAuthService {

  private apiUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {
  }

  /**
   * Logs a user in by sending a login request to the backend API.
   * On successful login, the authentication token and user data are stored in localStorage.
   *
   * @param request - The credentials provided by the user for login.
   * @returns An observable that emits the response containing the authentication details.
   */
  login(request: UserAuthRequest): Observable<UserAuthResponse> {
    return this.http.post<UserAuthResponse>(`${this.apiUrl}/login`, request).pipe(
      tap((response: UserAuthResponse) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId.toString());
        localStorage.setItem('name', response.name);
        localStorage.setItem('surname', response.surname);
        localStorage.setItem('userType', response.userType);
      })
    );
  }

  /**
   * Registers a new user by sending the user data to the backend API.
   *
   * @param request - The user data for registration.
   * @returns An observable that emits the response from the registration API.
   */
  register(request: SaveUserRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, request);
  }

}
