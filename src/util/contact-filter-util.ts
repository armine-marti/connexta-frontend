import {ContactResponseDto} from '../app/core/model/contact/contact-response-dto';
import {RelationType} from '../app/core/model/contact/enum/relation-type.enum';
/**
 * Utility class for filtering contacts based on different criteria.
 */
export class ContactFilterUtil {


  static filterByBirthday(contacts: ContactResponseDto[]): ContactResponseDto[] {
    return contacts.slice().sort((a, b) => {
      const daysA = a.birthday ? this.daysUntilNextBirthday(new Date(a.birthday)) : Infinity;
      const daysB = b.birthday ? this.daysUntilNextBirthday(new Date(b.birthday)) : Infinity;
      return daysA - daysB;
    });
  }

  /**
   * Selects the relation type for filtering the contacts.
   */
  static filterByRelationType(contacts: ContactResponseDto[], relationType: RelationType): ContactResponseDto[] {
    return contacts.filter(contact => contact.relationType === relationType);
  }


  /**
   * Calculates the number of days until the next birthday for the given birthday.
   * @returns The number of days until the next birthday.
   */
  private static daysUntilNextBirthday(birthday: Date): number {
    const now = new Date();
    let nextBirthday = new Date(now.getFullYear(), birthday.getMonth(), birthday.getDate());

    if (nextBirthday < now) {
      nextBirthday = new Date(now.getFullYear() + 1, birthday.getMonth(), birthday.getDate());
    }

    const diffTime = nextBirthday.getTime() - now.getTime();
    return diffTime / (1000 * 60 * 60 * 24);
  }
}
