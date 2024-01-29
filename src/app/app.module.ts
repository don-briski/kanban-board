import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { KanbanBoardComponent } from './component/kanban-board/kanban-board.component';
import { TaskComponent } from './component/task/task.component';
import {TaskFormComponent} from './component/task-form/task-form.component';



import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    KanbanBoardComponent,
    TaskComponent,
    TaskFormComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
