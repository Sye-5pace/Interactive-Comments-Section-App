import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICommentInfo } from './icomments-info'


@Injectable({
  providedIn: 'root'
})

export class CommentService {
  private jsonUrl = '../assets/data.json'

  constructor(private http: HttpClient) { }

  getCommentInfo() : Observable<ICommentInfo> {
    return this.http.get<ICommentInfo>(this.jsonUrl)
  }
}
