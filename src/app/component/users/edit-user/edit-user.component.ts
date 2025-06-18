import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../core/service/user.service';
import {UserResponseDto} from '../../../core/model/user/user-response-dto';
/**
 * Component responsible for editing an existing user's information.
 * Fetches user data by ID, pre-fills the form, and allows updating user details.
 */
@Component({
  selector: 'app-edit-user',
  standalone: false,
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit {

  form!: FormGroup;
  userId!: number;
  serverError: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
  }

  /**
   * Initializes the component by retrieving the user ID from the route
   * and building the form structure. Loads user data from the server.
   */
  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      surname: [''],
      email: ['', [Validators.email]],
      birthday: [''],
      address: [''],
      userType: ['', Validators.required],
      userStatus: ['']
    });

    this.loadUser();
  }

  /**
   * Loads user data from the server using the user ID.
   * Patches the form with received user data and formats the birthday field.
   */
  loadUser(): void {
    this.userService.getById(this.userId).subscribe({
      next: (user: UserResponseDto) => {
        const formattedBirthday = user.birthday
          ? new Date(user.birthday).toISOString().split('T')[0]
          : '';
        this.form.patchValue({
          ...user,
          birthday: formattedBirthday
        });
      },
      error: (err) => {
        console.error('Failed to load user', err);
      }
    });
  }

  /**
   * Sends the updated user data to the backend.
   * On success, navigates back to the admin panel.
   * On failure, sets a server error message.
   */
  save(): void {
    if (this.form.valid) {
      this.userService.updateUser(this.userId, this.form.value).subscribe({
        next: () => this.router.navigate(['/admin']),
        error: (error) => {
          if (error?.error?.message) {
            this.serverError = error.error.message;
          } else {
            this.serverError = 'An error occurred while saving the user.';
          }
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
