import {Component, OnInit} from '@angular/core';
import {ContactResponseDto} from '../../core/model/contact/contact-response-dto';
import {ContactService} from '../../core/service/contact.service';
import {Router} from '@angular/router';
import {RelationType} from '../../core/model/contact/enum/relation-type.enum';

/**
 * Component responsible for managing and displaying contacts.
 * It includes functionality for searching, filtering, viewing, editing, and deleting contacts.
 */
@Component({
  selector: 'app-contacts',
  standalone: false,
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent implements OnInit {
  contacts: ContactResponseDto[] = [];
  search = ''
  searchName: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalContacts: number = 0;
  protected readonly Math = Math;

  confirmDeleteOpen = false;
  contactToDeleteId: number | null = null;

  selectedContact: ContactResponseDto | null = null;
  contactViewlOpen: boolean = false;


  filteredContacts: ContactResponseDto[] = [];

  filterBy: 'ALL' | 'BIRTHDAY' | 'RELATION' = 'ALL';
  selectedRelationType: RelationType | null = null;
  relationTypes: RelationType[] = Object.values(RelationType) as RelationType[];

  constructor(private contactService: ContactService, private router: Router) {
  }

  /**
   * Initializes the component by loading contacts on component initialization.
   */
  ngOnInit(): void {
    this.loadContacts();
  }

  /**
   * Loads the list of contacts from the server.
   */
  loadContacts(): void {
    this.contactService.getAll(this.currentPage, this.pageSize, this.search).subscribe({
      next: (res) => {
        this.contacts = res.contacts;
        this.totalContacts = res.totalElements;
        this.applyFilters();
      },
      error: (err) => {
        console.error('Error loading contacts:', err);
      }
    });
  }

  /**
   * Triggers the search and reloads contacts based on the search term.
   */
  onSearch() {
    console.log('Searching:', this.search);
    this.loadContacts();
  }

  /**
   * Views a contact's details by fetching it from the server using the provided ID.
   *
   * @param id The ID of the contact to view.
   */
  viewContact(id: number): void {
    this.contactService.getById(id).subscribe({
      next: (res) => {
        this.selectedContact = res;
        this.contactViewlOpen = true;
      },
      error: (err) => console.error('Error while accessing the contact', err)
    });
  }

  /**
   * Closes the contact view modal and resets the selected contact.
   */
  closeModal(): void {
    this.contactViewlOpen = false;
    this.selectedContact = null;
  }


  /**
   * Deletes the contact specified by `contactToDeleteId` and reloads the contacts.
   */
  deleteContact(): void {
    if (this.contactToDeleteId !== null) {
      this.contactService.delete(this.contactToDeleteId).subscribe(() => {
        this.loadContacts();
        this.closeDeleteModal();
      });
    }
  }

  /**
   * Opens the delete confirmation modal for the contact with the given ID.
   *
   * @param id The ID of the contact to delete.
   */
  openDeleteModal(id: number): void {
    this.contactToDeleteId = id;
    this.confirmDeleteOpen = true;
  }

  /**
   * Closes the delete confirmation modal.
   */
  closeDeleteModal(): void {
    this.confirmDeleteOpen = false;
    this.contactToDeleteId = null;
  }

  /**
   * Navigates to the edit page for the contact with the given ID.
   *
   * @param id The ID of the contact to edit.
   */
  editContact(id: number): void {
    this.router.navigate(['/contacts/edit', id]);
  }

  get totalPagesArray(): number[] {
    const totalPages = Math.ceil(this.totalContacts / this.pageSize);
    return Array.from({length: totalPages}, (_, i) => i + 1);
  }

  /**
   * Navigates to the specified page number and reloads the contacts.
   *
   * @param page The page number to navigate to.
   */
  goToPage(page: number): void {
    const totalPages = Math.ceil(this.totalContacts / this.pageSize);
    if (page < 1 || page > totalPages || page === this.currentPage) return;

    this.currentPage = page;
    this.loadContacts();
  }

  /**
   * Applies filters to the contacts based on the selected filter criteria.
   */
  applyFilters(): void {
    let filtered = [...this.contacts];

    if (this.filterBy === 'BIRTHDAY') {
      filtered = filtered.sort((a, b) => {
        const daysA = a.birthday ? this.daysUntilNextBirthday(new Date(a.birthday)) : Infinity;
        const daysB = b.birthday ? this.daysUntilNextBirthday(new Date(b.birthday)) : Infinity;
        return daysA - daysB;
      });
    }

    if (this.filterBy === 'RELATION' && this.selectedRelationType) {
      filtered = filtered.filter(contact => contact.relationType === this.selectedRelationType);
    }

    this.totalContacts = filtered.length;

    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.filteredContacts = filtered.slice(start, end);
  }

  /**
   * Calculates the number of days until the next birthday for the given birthday.
   *
   * @param birthday The date of the contact's birthday.
   * @returns The number of days until the next birthday.
   */
  daysUntilNextBirthday(birthday: Date): number {
    const now = new Date();
    let nextBirthday = new Date(now.getFullYear(), birthday.getMonth(), birthday.getDate());

    if (nextBirthday < now) {
      nextBirthday = new Date(now.getFullYear() + 1, birthday.getMonth(), birthday.getDate());
    }

    const diffTime = nextBirthday.getTime() - now.getTime();
    return diffTime / (1000 * 60 * 60 * 24);
  }

  /**
   * Applies the selected filter type to the contact list.
   *
   * @param type The type of filter to apply: 'ALL', 'BIRTHDAY', or 'RELATION'.
   */
  applyFilter(type: 'ALL' | 'BIRTHDAY' | 'RELATION') {
    this.filterBy = type;
    this.currentPage = 1;
    if (type !== 'RELATION') {
      this.selectedRelationType = null;
    }
    this.applyFilters();
  }

  /**
   * Selects the relation type for filtering the contacts.
   *
   * @param type The relation type to filter by.
   */
  selectRelationType(type: RelationType) {
    this.selectedRelationType = type;
    this.currentPage = 1;
    this.applyFilters();
  }

  /**
   * Logs the user out by clearing localStorage and navigating to the login page.
   */
  logout(): void {

    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
