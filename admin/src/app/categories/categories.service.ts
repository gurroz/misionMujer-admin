import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Category} from './category.model';

@Injectable()
export class CategoriesService {

  private categoriesUrl = environment.baseURL + '/categories/';  // URL to web api

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get<any>(this.categoriesUrl);
  }

  saveCategories(data: any): Observable<any> {
    return this.http.post<any>(this.categoriesUrl, data);
  }

  deleteCategories(categoryId: number): Observable<any> {
    return this.http.delete<any>(this.categoriesUrl + categoryId);
  }

  editCategory(category: Category): Observable<any> {
    return this.http.put<any>(this.categoriesUrl + category.id, category);
  }
}
