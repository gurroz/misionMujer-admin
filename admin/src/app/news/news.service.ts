import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {News} from './news.model';

@Injectable()
export class NewsService {

  private newsUrl = environment.baseURL + '/news/';  // URL to web api

  constructor(private http: HttpClient) {}

  getNews(): Observable<any> {
    return this.http.get<any>(this.newsUrl);
  }

  saveNews(data: any): Observable<any> {
    return this.http.post<any>(this.newsUrl, data);
  }

  deleteNews(categoryId: number): Observable<any> {
    return this.http.delete<any>(this.newsUrl + categoryId);
  }

  editNews(news: News): Observable<any> {
    return this.http.put<any>(this.newsUrl + news.id, news);
  }

}
