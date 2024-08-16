import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MockDataService } from '../mock-data.service';
import { forkJoin } from 'rxjs';
import { SuccessmessageComponent } from '../successmessage/successmessage.component';

interface User {
  email: string;
  fullName: string;
  Number: number;
  Password: string;
}

@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    JsonPipe,
    ReactiveFormsModule,
    SuccessmessageComponent,
  ],
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css'],
  inputs: ['pdata'],
})
export class LoginpageComponent {
  loginform: FormGroup;
  pdata: any;
  users: User[] = [];
  _emailaddress: string | undefined;
  showloginpage: boolean = true;
  showsuccessmessage: boolean = false;
  loginErrorMessage: string = '';

  constructor(private mockDataService: MockDataService) {
    this.loginform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    this._emailaddress = this.loginform.get('email')?.value;

    forkJoin({
      users: this.mockDataService.getUsers(),
    }).subscribe((response) => {
      this.users = response.users;
      console.log('Users:', this.users);
    });
  }

  get emailControl() {
    return this.loginform.get('email');
  }

  get passwordControl() {
    return this.loginform.get('password');
  }

  onSubmit() {
    if (this.loginform.valid) {
      const enteredEmail = this.loginform.get('email')?.value;
      const enteredPassword = this.loginform.get('password')?.value;
      const userExists = this.users.some(
        (user: User) =>
          user.email === enteredEmail && user.Password === enteredPassword
      );

      if (userExists) {
        this.showsuccessmessage = true;
        this.showloginpage = false;
        console.log('Form submitted with:', this.loginform.value);
        setTimeout(() => {
          window.location.href = 'https://solvei8.com/en-in/';
        }, 1000);
      } else {
        this.showsuccessmessage = false;
        console.log('Invalid username or password.');
        this.loginErrorMessage = 'Invalid username or password.';
      }
    } else {
      this.loginform.markAllAsTouched();
      if (!this.emailControl?.value) {
        this.loginErrorMessage = 'Email is required.';
      } else if (!this.passwordControl?.value) {
        this.loginErrorMessage = 'Password is required.';
      }
      console.log('Form is invalid.');
    }
  }
}
