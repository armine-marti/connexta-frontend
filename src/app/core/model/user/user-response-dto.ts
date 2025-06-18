import {UserType} from './enum/user-type.enum';
import {UserStatus} from './enum/user-status.enum';
/**
 * Interface representing the detailed information of a user.
 */
export interface UserResponseDto {

  id: number;
  name: string;
  surname: string;
  email: string;
  birthday: string;
  address: string;
  userType: UserType;
  userStatus: UserStatus;
}
