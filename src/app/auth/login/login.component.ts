import {Component, OnInit} from '@angular/core';
import {UserAuthService} from '../../core/service/user-auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserAuthRequest} from '../../core/model/user/user-auth-request';
import {ActivatedRoute, Router} from '@angular/router';

/**
 * Component for user login.
 * Handles the login form and state management.
 */
@Component({
  selector: 'app-login',
  standalone: false,
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private userAuthService: UserAuthService, private route: ActivatedRoute,
              private router: Router) {
  }

  form!: FormGroup;
  registrationSuccess: boolean = false;
  loginError: string | null = null;


  /**
   * Initializes the component.
   * Creates the form with validators and processes the 'registered' parameter in the URL.
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });


    this.route.queryParams.subscribe(params => {
      if (params['registered'] === 'true') {
        this.registrationSuccess = true;


        const url = this.router.url.split('?')[0];
        this.router.navigateByUrl(url);
      }
    });

  }

  /**
   * Handles form submission.
   * Attempts to log the user in and redirects based on user type.
   */
  onSubmit(): void {
    if (this.form.valid) {
      const loginData: UserAuthRequest = this.form.value;

      this.userAuthService.login(loginData).subscribe({
        next: (res) => {
          this.loginError = null;

          localStorage.setItem('token', res.token);
          localStorage.setItem('userType', res.userType);

          if (res.userType === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/contacts']);
          }
        },
        error: (err) => {
          if (err.error && err.error.message) {
            this.loginError = err.error.message;
          } else {
            this.loginError = 'An unknown error occurred. Please try again.';
          }
        }
      });
    } else {
      console.log('Invalid form');
    }
  }

  /**
   * Redirects the user to the registration page.
   */
  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}



