import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroupDirective, NgForm, Validators, FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LoadingComponent } from '../../features/loading/loading.component';
import { Router, RouterLink } from '@angular/router';
import { AuthStore } from '../../app-services/auth/auth.store';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    LoadingComponent,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //Variables
  hidePass = true;
  isLoading: Boolean = false;
  tbd: any = '';

  //Form
  logForm: FormGroup;

  constructor (private auth: AuthStore,
               private fbuild: FormBuilder,
               private r: Router
              //  private auth: AuthStore
               ) {
                this.logForm = fbuild.group({
                  username:  ['stellavi', [Validators.required]],
                  password: ['Stellvi24', [Validators.required]]
                }); 
               }

  //emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  

  matcher = new MyErrorStateMatcher();

  isLoginMode = true;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  login() {
    const val = this.logForm.value;

    this.auth.login(val.username, val.password)
      .subscribe(
        () => {
          this.r.navigateByUrl('/dashboard')
        },
        err => {
          alert("Login Failed!");
        }
      )
  }

  onSubmit(form: NgForm) {
    // console.log(form.value);
    // this.auth.login(this.logForm.value.username, form.value.password).subscribe(
    //   () => {}
    // );
    // form.reset();
  }
}
