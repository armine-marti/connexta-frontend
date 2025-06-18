import {UserType} from './enum/user-type.enum';
import {UserStatus} from './enum/user-status.enum';

/**
 * Interface representing the payload used to register or save a user.
 */
export interface SaveUserRequest {
  name: string;
  surname?: string;
  email: string;
  password: string;
  birthday?: string;
  address?: string;
  userType: UserType;
  userStatus?: UserStatus;
}
