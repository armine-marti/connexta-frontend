import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {RelationType} from '../../core/model/contact/enum/relation-type.enum';
/**
 * Component for displaying a contact form.
 * It allows users to create or update a contact.
 * The form includes inputs for contact details such as name, email, phone, birthday, etc.
 */
@Component({
  selector: 'app-contact-form',
  standalone: false,
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  @Input() form!: FormGroup;
  @Input() buttonLabel: string = 'Save';
  @Input() serverError: string | null = null;
  @Output() submitted = new EventEmitter<void>();


  relationTypes = Object.values(RelationType);

  onSubmit(): void {
    this.submitted.emit();
  }
}
