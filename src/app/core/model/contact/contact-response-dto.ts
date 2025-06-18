import {RelationType} from './enum/relation-type.enum';
/**
 * Represents a contact returned from the backend.
 * Used to display contact details in the application.
 */
export interface ContactResponseDto {
  id: number;
  name: string;
  surname?: string;
  email: string;
  phone: string;
  birthday?: Date;
  address?: string;
  relationType?: RelationType;
}
