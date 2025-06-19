import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ContactResponseDto} from '../model/contact/contact-response-dto';
import {SaveContactRequest} from '../model/contact/save-contact-request';
import {environment} from '../../../environments/environment';
import {AppConstants} from '../constants/app.constants';
/**
 * Service for managing contacts, including fetching, creating, updating, and deleting contacts.
 * This service interacts with the backend API to perform CRUD operations on contacts.
 */
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl = `${environment.apiUrl}/contacts`;

  constructor(private http: HttpClient) {
  }


  getAll(pageNumber: number = AppConstants.pagination.pageNumber,
         pageSize: number = AppConstants.pagination.pageSize, search: string = ''): Observable<{
    contacts: ContactResponseDto[],
    totalElements: number
  }> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<{ contacts: ContactResponseDto[], totalElements: number }>(this.baseUrl, {params});
  }


  getById(id: number): Observable<ContactResponseDto> {
    return this.http.get<ContactResponseDto>(`${this.baseUrl}/${id}`);
  }


  create(contact: SaveContactRequest): Observable<ContactResponseDto | string> {
    return this.http.post<ContactResponseDto | string>(`${this.baseUrl}/create`, contact);
  }


  update(id: number, contact: ContactResponseDto): Observable<ContactResponseDto | string> {
    return this.http.put<ContactResponseDto | string>(`${this.baseUrl}/update/${id}`, contact);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

}
