import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MatDialogModule, MatDialogRef, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';



@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [MatButtonModule, 
            MatDialogModule, 
            MatFormFieldModule, 
            MatInputModule,
            MatDialogActions,
            MatDialogClose,
            MatDialogTitle,
            MatDialogContent
          ],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})
export class FeedbackComponent {
  EnterDuration: string = "400ms";
  ExitDuration: string = "300ms";
  DWidth: string = '250px';

  constructor(public dialog: MatDialog,
              ) {}

  openDialogue() {
    this.dialog.open(FeedbackD, {
      width: this.DWidth,
      enterAnimationDuration: this.EnterDuration,
      exitAnimationDuration: this.ExitDuration,
    });
  }
}

@Component({
    selector: 'FeedbackD',
    standalone: true,
    imports: [
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      MatButtonModule,
      MatDialogTitle,
      MatDialogContent,
      MatDialogActions,
      MatDialogClose,
    ],
    templateUrl: './feedbackD.html'
})
export class FeedbackD {
  constructor(
              public dialogRef: MatDialogRef<FeedbackD>
  ) {}

  onCloseClick() {
    this.dialogRef.close();
  }
}