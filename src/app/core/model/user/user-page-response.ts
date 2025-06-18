import {UserResponseDto} from './user-response-dto';
/**
 * Interface representing the response structure for a paginated list of users.
 */
export interface UserPageResponse {
  users: UserResponseDto[];
  totalElements: number;
}
