import {Component, OnInit} from '@angular/core';
import {UserAuthService} from '../../core/service/user-auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SaveUserRequest} from '../../core/model/user/save-user-request';
/**
 * Component for user registration.
 * Handles the user registration form and communicates with the authentication service.
 */
@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  constructor(private userAuthService: UserAuthService, private fb: FormBuilder, private router: Router) {
  }

  form!: FormGroup;
  registrationError = '';

  /**
   * Initializes the component.
   * Sets up the registration form with validation rules for the user inputs.
   */
  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      birthday: [''],
      address: [''],
      userType: ['', Validators.required],
      userStatus: ['ACTIVE_USER']
    });
  }

  /**
   * Handles form submission.
   * Submits the registration request and navigates to the login page on success.
   * Displays an error message on failure.
   */
  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const request: SaveUserRequest = this.form.value;

    this.userAuthService.register(request).subscribe({
      next: () => {
        this.router.navigate(['/login'], {
          queryParams: {registered: 'true'}
        });
      },
      error: (err) => {
        if (err.status === 409) {
          this.registrationError = 'Email already exists.';
        } else {
          this.registrationError = 'Registration failed. Please try again.';
        }
      }
    });
  }
}
