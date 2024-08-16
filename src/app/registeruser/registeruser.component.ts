import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { forkJoin } from 'rxjs';
import { MockDataService } from '../mock-data.service';
import { FormDataService } from '../form-data.service';
import { SuccessmessageregisterComponent } from '../successmessageregister/successmessageregister.component';
import { LoginpageComponent } from '../loginpage/loginpage.component';

interface Organization {
  organizationName: string;
  organizationId: string;
}

@Component({
  selector: 'app-registeruser',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SuccessmessageregisterComponent,
    LoginpageComponent,
  ],
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css'],
})
export class RegisteruserComponent implements OnInit {
  @ViewChild('imageSection') imageSection!: ElementRef;
  @ViewChild('container') container!: ElementRef;
  @Output() showSectionTwoChange = new EventEmitter<boolean>();
  registerform: FormGroup;
  organizations: Organization[] = [];
  organizationName: string = '';
  orgnameerror: string = '';
  orgiderror: string = '';
  organizationid: any;
  Showform3: boolean = true;
  showSectionTwo: boolean = false;
  showregistersuccess: boolean = false;
  showLoginPage: boolean = false;

  constructor(
    private mockDataService: MockDataService,
    private formDataService: FormDataService
  ) {
    this.registerform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      fullname: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      organizationname: new FormControl('', [Validators.required]),
      organizationid: new FormControl('', [Validators.required]),
      designation: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      pincode: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onInputChange(): void {
    const formValues = this.registerform.value;
    this.organizationName = formValues.organizationname;
    this.organizationid = formValues.organizationid;

    const isOrganizationValid = this.organizations.some(
      (organization) =>
        organization.organizationName.toLowerCase() ===
        this.organizationName.toLowerCase()
    );

    const isOrganizationidValid = this.organizations.some(
      (organization) => organization.organizationId === this.organizationid
    );

    if (isOrganizationValid) {
      this.orgnameerror = '';
    } else {
      this.orgnameerror = 'Unknown Organization Name';
    }

    if (isOrganizationidValid) {
      this.orgiderror = '';
    } else {
      this.orgiderror = 'Unknown Organization ID';
    }
  }

  ngOnInit(): void {
    forkJoin({
      organizations: this.mockDataService.getOrganizations(),
    }).subscribe((response) => {
      this.organizations = response.organizations as Organization[];
    });

    this.formDataService.currentFormData.subscribe((data: any) => {
      if (data) {
        this.registerform.patchValue(data);
      }
    });
  }

  onBack() {
    this.formDataService.updateFormData(this.registerform.value);
    this.showSectionTwo = false;
    this.showSectionTwoChange.emit(this.showSectionTwo);
  }

  onContinue() {
    console.log('Form Data:', this.registerform.value);
    this.showSectionTwo = true;
    this.showSectionTwoChange.emit(this.showSectionTwo);
  }
  onRegister() {
    if (this.registerform.invalid) {
      this.registerform.markAllAsTouched();
      return;
    }
    this.Showform3 = false;
    this.showSectionTwo = false;
    this.showregistersuccess = true;
    setTimeout(() => {
      console.log('Setting showLoginPage to true');
      this.showregistersuccess = false;
      this.showLoginPage = true;
    }, 2000);
    this.formDataService.updateFormData(this.registerform.value);
  }
}
