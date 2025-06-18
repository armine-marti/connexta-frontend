import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ContactResponseDto} from '../model/contact/contact-response-dto';
import {SaveContactRequest} from '../model/contact/save-contact-request';
/**
 * Service for managing contacts, including fetching, creating, updating, and deleting contacts.
 * This service interacts with the backend API to perform CRUD operations on contacts.
 */
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:8080/contacts';

  constructor(private http: HttpClient) {
  }


  getAll(pageNumber = 1, pageSize = 10, search: string = ''): Observable<{
    contacts: ContactResponseDto[],
    totalElements: number
  }> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<{ contacts: ContactResponseDto[], totalElements: number }>(this.apiUrl, {params});
  }


  getById(id: number): Observable<ContactResponseDto> {
    return this.http.get<ContactResponseDto>(`${this.apiUrl}/${id}`);
  }


  create(contact: SaveContactRequest): Observable<ContactResponseDto | string> {
    return this.http.post<ContactResponseDto | string>(`${this.apiUrl}/create`, contact);
  }


  update(id: number, contact: ContactResponseDto): Observable<ContactResponseDto | string> {
    return this.http.put<ContactResponseDto | string>(`${this.apiUrl}/update/${id}`, contact);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

}
