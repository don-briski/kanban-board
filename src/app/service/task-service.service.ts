import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Task } from '../model/task'; // Update the path

@Injectable({
  providedIn: 'root',
})



export class TaskServiceService {
  private baseUrl = 'http://localhost:3000/boards';  //http://localhost:3000/boards/1/columns/0/task

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}`).pipe(
      map((res) => {
        console.log(res);
        return res;
      })

    );
  }

  addTask(task: Task) {
   return this.http.post<any>(`${this.baseUrl}`, task)
    .pipe(
      map((res) => {
        console.log(res, 'result, list');
        return res
      })
    )

  }

  editTask(task: Task, columnIndex: number): Observable<any> {
    return this.http.put<any>(
      `${this.baseUrl}/${task.id}`,
      task
    );
  }

  deleteTask(task: Task, columnIndex: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${task.id}`
    );
  }
}
