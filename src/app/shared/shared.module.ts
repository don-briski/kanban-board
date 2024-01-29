import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {matDialogAnimations, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatStepperModule} from '@angular/material/stepper';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatBadgeModule} from '@angular/material/badge';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';

const AngularMaterialComps: any = [
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatTableModule,
  MatStepperModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMenuModule,
  MatPaginatorModule,
  MatTabsModule,
  MatDialogModule,
  MatSnackBarModule,
  MatRadioModule,
  MatBadgeModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatGridListModule,
  MatTableModule,
  MatTooltipModule,
];





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DragDropModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    AngularMaterialComps,

  ],
  exports: [
    DragDropModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    AngularMaterialComps,
  ]
})
export class SharedModule { }
