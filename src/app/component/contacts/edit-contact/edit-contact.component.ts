import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactService} from '../../../core/service/contact.service';
import {ContactResponseDto} from '../../../core/model/contact/contact-response-dto';
import {ErrorMessages} from '../../../core/constants/error-messages.constants';

/**
 * Component responsible for editing an existing contact.
 * It loads the contact by ID, pre-fills the form, and handles contact updates with error feedback.
 */
@Component({
  selector: 'app-edit-contact',
  standalone: false,
  templateUrl: './edit-contact.component.html',
  styleUrl: './edit-contact.component.scss'
})
export class EditContactComponent implements OnInit {
  form!: FormGroup;
  contactId!: number;
  serverError: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) {
  }

  /**
   * Initializes the form and loads contact data based on the ID in the route.
   */
  ngOnInit(): void {
    this.contactId = Number(this.route.snapshot.paramMap.get('id'));

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      surname: [''],
      email: ['', [Validators.email]],
      phone: ['', Validators.required],
      birthday: [''],
      address: [''],
      relationType: ['']
    });

    this.loadContact();
  }

  /**
   * Loads contact details from the server and patches the form with the retrieved values.
   */
  loadContact(): void {
    this.contactService.getById(this.contactId).subscribe({
      next: (contact: ContactResponseDto) => {

        const formattedBirthday = contact.birthday
          ? new Date(contact.birthday).toISOString().split('T')[0]
          : '';

        this.form.patchValue({
          ...contact,
          birthday: formattedBirthday
        });
      },
      error: (err) => {
        console.error('Failed to load contact', err);
      }
    });
  }

  /**
   * Submits the form to update the contact.
   * If valid, it sends the update request to the backend and navigates on success.
   * Displays errors if the update fails (e.g., duplicate phone number).
   */
  save(): void {
    if (this.form.valid) {
      this.contactService.update(this.contactId, this.form.value).subscribe({
        next: () => this.router.navigate(['/contacts']),
        error: (err) => {
          if (err.status === 409) {
            this.serverError = ErrorMessages.repeating_phone_number;
          } else {
            this.serverError = ErrorMessages.save_contact_error;
          }
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
