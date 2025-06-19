import {UserResponseDto} from '../app/core/model/user/user-response-dto';
import {UserStatus} from '../app/core/model/user/enum/user-status.enum';

export class UserFilterUtil {
  static filterByStatus(users: UserResponseDto[], status: UserStatus): UserResponseDto[] {
    return users.filter(user => user.userStatus === status);
  }

  static filterByEmail(users: UserResponseDto[], search: string): UserResponseDto[] {
    const searchLower = search.trim().toLowerCase();
    return users.filter(user => user.email?.toLowerCase().includes(searchLower));
  }
}
