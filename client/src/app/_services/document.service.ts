import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Document } from '../_models/document';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  baseUrl = 'http://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  //method for uploading document to API
  upload(model: any) {
    return this.http.post(this.baseUrl + 'document/upload', model).pipe(
      map((doc: Document) => {
        if (doc) {
          // Handle upload response
        }
      })
    );
  }

  //method for getting all file data from database
  list() {
    return this.http.get(this.baseUrl + 'document/list').pipe();
  }

  view(model: any) {
    return this.http.post(this.baseUrl + 'document/read', model).pipe(
      map((doc: Document) => {
        if (doc) {
          return doc;
        }
      })
    );
  }
}
