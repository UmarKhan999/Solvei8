import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { RegisteruserComponent } from './registeruser/registeruser.component';
import { SuccessmessageComponent } from './successmessage/successmessage.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MockDataService } from './mock-data.service';
import { forkJoin } from 'rxjs';
import { log } from 'node:console';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginpageComponent,
    RegisteruserComponent,
    SuccessmessageComponent,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Solvei8';
  form1: FormGroup;
  pdata: any;
  showLoginPage: boolean = false;
  showFormContainer: boolean = true;
  showRegisterPage: boolean = false;
  showsuccessmessage: boolean = false;
  emptyerror: boolean = false;
  showSectionTwo: boolean = false;
  users: any[] = [];
  organizations: any[] = [];

  constructor(
    private fb: FormBuilder,
    private mockDataService: MockDataService
  ) {
    this.form1 = this.fb.group({
      username: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    });
  }

  ngOnInit(): void {
    this.showFormContainer = true;
    this.showLoginPage = false;

    forkJoin({
      users: this.mockDataService.getUsers(),
      organizations: this.mockDataService.getOrganizations(),
    }).subscribe((response) => {
      this.users = response.users;
      this.organizations = response.organizations;
      console.log('Users:', this.users);
    });
  }

  Submitform() {
    const _name = this.form1.get('username')?.value;
    const _mobile = this.form1.get('mobile')?.value;
    const mobileNumber = _mobile ? Number(_mobile) : null;

    let userExists = this.users.some((user) => user.fullName === _name);
    let mobileExists = this.users.some((user) => user.Number === mobileNumber);

    if (!_name && !_mobile) {
      this.emptyerror = true;
      console.log('Please fill in both fields');
      return;
    }
    this.emptyerror = false;

    if (userExists || mobileExists) {
      if (userExists) {
        console.log('User Exist');
      }
      if (mobileExists) {
        console.log('Mobile no Exist');
      }
      this.showLoginPage = true;
      this.showFormContainer = false;
      this.showRegisterPage = false;
    } else {
      console.log(`${_name} or mobile number does not exist in the list`);
      this.showFormContainer = false;
      this.showRegisterPage = true;
      this.showLoginPage = false;
      this.showSectionTwo = true;
    }
  }
}

export default AppComponent;
