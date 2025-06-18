import {RelationType} from './enum/relation-type.enum';
import {ContactStatus} from './enum/contact-status.enum';
/**
 * Data structure used to create or update a contact.
 * Sent from the frontend to the backend during save operations.
 */
export interface SaveContactRequest {
  name: string;
  surname?: string;
  email: string;
  phone: string;
  birthday?: Date;
  address?: string;
  relationType?: RelationType;
  contactStatus?: ContactStatus;

}
