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
  board: Board = {
    name: '',
    columns: []
  };



  constructor(private dialog: MatDialog, private taskService: TaskServiceService) {}

  ngOnInit() {
    this.board = {
      name: 'Task Board',
      columns: [
        {
          name: 'OPEN',
          tasks: [],
        },
        {
          name: 'PENDING',
          tasks: [],
        },
        {
          name: 'IN PROGRESS',
          tasks: [],
        },
        {
          name: 'DONE',
          tasks: [],
        },
      ],
    };

    this.getTaskData();

    this.editTaskForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
      dueDate: new FormControl(null, [Validators.required]),
      status: new FormControl(null), // Include status in the form
    });


  }


  getTaskData(): void {
    this.taskService.getTasksObj().subscribe((data: any) => {
      console.log('Server Response:', data);

      if (data ) {
        const organizedTasks = this.organizeTasks(data);
        this.board.columns.forEach((column) => {
          const status = column.name.toUpperCase();
          column.tasks = organizedTasks[status] || [];
        });
      } else {
        console.error('Error: Task data or taskObj is undefined.');
      }
    });
  }



  organizeTasks(tasks: Task[]): { [key: string]: Task[] } {
    const organizedTasks: { [key: string]: Task[] } = {};

    tasks.forEach((task) => {
      const status = task.status.toUpperCase();
      if (!organizedTasks[status]) {
        organizedTasks[status] = [];
      }
      organizedTasks[status].push({ ...task });
    });

    return organizedTasks;
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
        const openColumnIndex = this.board?.columns.findIndex((column) => column.name === 'OPEN');

        if (openColumnIndex !== -1) {
          // Update the status of the task before adding it to the column
          result.status = 'OPEN';

          this.taskService.addOTaskObj(result).subscribe({
            next: (createdTask: Task) => {
              this.board?.columns[openColumnIndex].tasks.push(createdTask);

              // Optionally, you can move the task to the open column on the UI
              // this.moveTaskToOpenColumn(createdTask);

              // Refresh the data
              this.getTaskData();
            },
            error: (error: any) => {
              console.error('Error creating task:', error);
            },
          });
        }
      }
    });
  }



 openEditTaskDialog(task: Task): void {
    this.editTaskForm.patchValue({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      status: task.status,
    });

    const dialogRef = this.dialog.open(this.editTask, {
      width: '400px',
      data: {
        task,
        editTaskForm: this.editTaskForm,
      },
    });

    this.dialogRef = dialogRef;

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        Object.assign(task, result);

        this.taskService.editTaskObj(task).subscribe(() => {
          this.getTaskData();
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
      console.log('The dialog was closed', result);
      if (result) {
        this.taskService.deleteTaskObj(task).subscribe(
          () => {
            console.log('Task deleted successfully.');
            this.getTaskData();
            dialogRef.close();
          },
          (error) => {
            console.error('Error deleting task:', error);
          }
        );
      }
    });
  }





}


