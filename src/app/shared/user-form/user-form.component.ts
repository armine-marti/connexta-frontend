import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserType} from '../../core/model/user/enum/user-type.enum';
import {UserStatus} from '../../core/model/user/enum/user-status.enum';
import {FormGroup} from '@angular/forms';
/**
 * Component for displaying a user form.
 * It allows users to create or update a user.
 * The form includes inputs for user details such as name, email, birthday, user type, etc.
 */
@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  @Input() form!: FormGroup;
  @Input() buttonLabel: string = 'Save';
  @Input() serverError: string | null = null;
  @Output() submitted = new EventEmitter<void>();

  userTypes = Object.values(UserType);
  userStatuses = Object.values(UserStatus);

  onSubmit(): void {
    this.submitted.emit();
  }

}
