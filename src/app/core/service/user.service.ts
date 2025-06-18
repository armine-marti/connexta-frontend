import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UserResponseDto} from '../model/user/user-response-dto';
import {Observable} from 'rxjs';
import {UserPageResponse} from '../model/user/user-page-response';
/**
 * Service for managing user-related operations, such as fetching, updating, and deleting users.
 * This service interacts with the backend API to perform CRUD operations on users.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/admin';

  constructor(private http: HttpClient) {
  }

  getAllUsers(pageNumber = 1, pageSize = 10, search: string = ''): Observable<UserPageResponse> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    if (search.trim()) {
      params = params.set('search', search);
    }

    return this.http.get<UserPageResponse>('http://localhost:8080/admin', {params});
  }

  getById(id: number): Observable<UserResponseDto> {
    return this.http.get<UserResponseDto>(`${this.apiUrl}/${id}`);
  }

  updateUser(id: number, user: UserResponseDto): Observable<UserResponseDto> {
    return this.http.put<UserResponseDto>(`${this.apiUrl}/update/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

}
