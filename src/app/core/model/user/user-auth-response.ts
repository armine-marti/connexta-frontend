import {UserType} from './enum/user-type.enum';
/**
 * Interface representing the response returned after a successful user authentication.
 */
export interface UserAuthResponse {
  token: string;
  name: string;
  surname: string;
  userId: number;
  userType: UserType;
}
