import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private _http: HttpClient) { }
  postComment(data) {
    return this._http.post('http://localhost:8000/api/comments', data);
  }

  getComments(post_id){
    return this._http.get(`http://localhost:8000/api/comments/${post_id}`);
  }

  
  getChildrenComments(post_id){
    return this._http.get(`http://localhost:8000/api/comments/${post_id}`);
  }

  deleteComment(comment_id)
  {
    return this._http.delete(`http://localhost:8000/api/comments/${comment_id}`);
  }

  updateComment(comment){
    const data = new HttpParams()
      .set('content', comment.content);
    return this._http.put(`http://localhost:8000/api/comments/${comment.id}`, data);
  }
}
