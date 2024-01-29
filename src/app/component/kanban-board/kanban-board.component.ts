import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { Task, Column, Board, Tasks } from '../../model/task';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskComponent } from '../task/task.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskServiceService } from '../../service/task-service.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})


export class KanbanBoardComponent implements OnInit {
  task!: Task;
  @ViewChild('deleteTaskDialog', { static: true })
  deleteTaskDialog!: TemplateRef<any>;
  @ViewChild('editTask', { static: true })
  editTask!: TemplateRef<any>;
  editTaskForm: any;
  dialogRef!: MatDialogRef<any>;
  board!: Board;

  constructor(private dialog: MatDialog, private taskService: TaskServiceService) {}

  ngOnInit() {
    this.getTaskdata();

    this.editTaskForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
      dueDate: new FormControl(null, [Validators.required]),
    });
  }


  getTaskdata(): void {
    this.taskService.getTasks().subscribe((data: any) => {
      console.log(data);
      const boardData = data[0];
      console.log(boardData);
      this.board = new Board(boardData.name, boardData.columns.map((column: any) => {
        return new Column(column.name, column.tasks.map((task: any) => {
          return new Tasks(task.id, task.title, task.description, task.dueDate, task.status);
        }
        ));
      }
      ));
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  openNewTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {

        // Get the index of the "OPEN" column
        const openColumnIndex = this.board?.columns?.findIndex((column) => column.name === 'OPEN');

        console.log(this.board, 'our board');

        if (openColumnIndex !== -1) {
          // Add the new task to the "OPEN" column
          this.taskService.addTask(result).subscribe(() => {
            openColumnIndex !== -1 && this.board?.columns[openColumnIndex].tasks.push(result);
            
            this.getTaskdata(); // This will refresh the data, including the new task
          });
        } else {
          console.error('The "OPEN" column was not found.');
        }
      }
    });
  }


  openEditTaskDialog(task: Task): void {
    this.task = task;

    this.editTaskForm.patchValue({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
    });

    const dialogRef = this.dialog.open(this.editTask, {
      width: '400px',
      data: {
        task,
        isEdit: true,
      },
    });

    this.dialogRef = dialogRef;

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const columnIndex = this.board?.columns?.findIndex((column) =>
          column.tasks.includes(task)
        );
        this.taskService.editTask(result, columnIndex).subscribe(() => {
          this.getTaskdata();
        });
      }
    });
  }

  onSubmit(): void {
    if (this.editTaskForm.valid) {
      this.dialogRef.close(this.editTaskForm.value);
    }
  }

  deleteTask(task: Task): void {
    const dialogRef = this.dialog.open(this.deleteTaskDialog, {
      width: '400px',
      data: task,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.task = task;
      if (result === 'delete') {
        const columnIndex = this.board?.columns?.findIndex((column) =>
          column.tasks.includes(task)
        );
        this.taskService.deleteTask(task, columnIndex).subscribe(() => {
          this.getTaskdata();
        });
      }
    });
  }
}


