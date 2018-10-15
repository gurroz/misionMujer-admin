import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class ImageOptimizationService {

  private optimizationUrl = environment.optimizationUrl;

  constructor(private http: HttpClient) { }

  optimizeImages(imageUrl: String): Observable<any> {
    let body: any = {};
    body.action = 'optimize';
    body.imageUrl = imageUrl;

    console.log('Sending image to optimize', body);
    return this.http.post<any>(this.optimizationUrl, body);
  }

}
