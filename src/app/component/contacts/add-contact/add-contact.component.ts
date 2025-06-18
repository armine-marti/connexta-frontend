import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ContactService} from '../../../core/service/contact.service';
import {Router} from '@angular/router';
/**
 * Component responsible for adding a new contact.
 * It includes functionality for creating a contact and handling form validation errors.
 */
@Component({
  selector: 'app-add-contact',
  standalone: false,
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss'
})
export class AddContactComponent {
  form!: FormGroup;
  serverError: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
    private router: Router
  ) {
  }

  /**
   * Initializes the contact creation form with default values and validation rules.
   */
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      surname: [''],
      email: ['', [Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{10,15}$/)]],
      birthday: [''],
      address: [''],
      relationType: ['']
    });
  }

  /**
   * Handles the form submission to save a new contact.
   * If the form is valid, it calls the create method from the contact service.
   * If there's an error, it displays an appropriate error message.
   */
  save(): void {
    this.serverError = null;

    if (this.form.valid) {
      this.contactService.create(this.form.value).subscribe({
        next: () => this.router.navigate(['/contacts']),
        error: (err) => {
          if (err.status === 409) {
            this.serverError = 'A contact with this phone number already exists.';
          } else {
            this.serverError = 'An error occurred while saving the contact.';
          }
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
