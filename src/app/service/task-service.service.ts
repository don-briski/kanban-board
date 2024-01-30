import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Task } from '../model/task'; // Update the path

@Injectable({
  providedIn: 'root',
})



export class TaskServiceService {
  private baseUrl = 'http://localhost:3000'; // Update the URL according to your backend

  constructor(private http: HttpClient) {}

  getTasksObj(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/taskObj`);
  }

  addOTaskObj(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/taskObj`, task);
  }

  editTaskObj(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/taskObj/${task.id}`, task);
  }

  deleteTaskObj(task: Task): Observable<void> {
    const url = `${this.baseUrl}/taskObj/${task.id}`;
    return this.http.delete<void>(url);
  }
}
