import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UserResponseDto} from '../model/user/user-response-dto';
import {Observable} from 'rxjs';
import {UserPageResponse} from '../model/user/user-page-response';
import {environment} from '../../../environments/environment';
import {AppConstants} from '../constants/app.constants';
/**
 * Service for managing user-related operations, such as fetching, updating, and deleting users.
 * This service interacts with the backend API to perform CRUD operations on users.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {
  }

  getAllUsers(  pageNumber: number =  AppConstants.pagination.pageNumber,
                pageSize: number =  AppConstants.pagination.pageSize, search: string = ''): Observable<UserPageResponse> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    if (search.trim()) {
      params = params.set('search', search);
    }

    return this.http.get<UserPageResponse>(this.baseUrl, {params});
  }

  getById(id: number): Observable<UserResponseDto> {
    return this.http.get<UserResponseDto>(`${this.baseUrl}/${id}`);
  }

  updateUser(id: number, user: UserResponseDto): Observable<UserResponseDto> {
    return this.http.put<UserResponseDto>(`${this.baseUrl}/update/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

}
