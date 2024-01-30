import { Component, Inject, OnInit, TemplateRef, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})

export class TaskFormComponent implements OnInit {
  editTaskForm!: FormGroup;
  taskForm!: FormGroup;
  minDate = new Date();
  today = new Date();
  newTask = {
    title: '',
    description: '',
    dueDate: ''
  };

  constructor(
    public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {


      this.taskForm = new FormGroup({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('',),
        dueDate: new FormControl('', [Validators.required]),
        status: new FormControl('OPEN', )
      });

  }

  onSubmit(): void {
  if (this.taskForm.valid) {
    this.dialogRef.close(this.taskForm.value);
  }
}

  onCancel(): void {
    this.dialogRef.close();
  }

  dateFormater(event: any) {
    const date = event.value;
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  
}
