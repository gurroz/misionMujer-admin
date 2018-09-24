import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Teaching} from './teaching.model';

@Injectable()
export class TeachingsService {

  private teachingUrl = environment.baseURL + '/teachings/';  // URL to web api

  constructor(private http: HttpClient) {}

  getTeachings(): Observable<any> {
    return this.http.get<any>(this.teachingUrl);
  }

  saveTeachings(data: any): Observable<any> {
    return this.http.post<any>(this.teachingUrl, data);
  }

  deleteTeachings(teachingId: number): Observable<any> {
    return this.http.delete<any>(this.teachingUrl + teachingId);
  }

  editTeachings(teaching: Teaching): Observable<any> {
    return this.http.put<any>(this.teachingUrl + teaching.id, teaching);
  }

}
