import {Component, OnInit} from '@angular/core';
import {UserResponseDto} from '../../core/model/user/user-response-dto';
import {UserService} from '../../core/service/user.service';
import {Router} from '@angular/router';
import {UserStatus} from '../../core/model/user/enum/user-status.enum';
import {UserPageResponse} from '../../core/model/user/user-page-response';
/**
 * Component responsible for displaying, filtering, paginating, and managing users.
 * Provides UI features such as search, status-based filtering, user detail view, deletion, and editing.
 */
@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  users: UserResponseDto[] = [];
  filteredUsers: UserResponseDto[] = [];
  userStatuses: UserStatus[] = Object.values(UserStatus);

  search: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalUsers: number = 0;

  confirmDeleteOpen = false;
  userToDeleteId: number | null = null;

  selectedUser: UserResponseDto | null = null;
  userViewOpen: boolean = false;

  selectedUserStatus: UserStatus | null = null;

  protected readonly Math = Math;

  constructor(private userService: UserService, private router: Router) {
  }

  /**
   * Initializes the component by loading user data from the backend.
   */
  ngOnInit(): void {
    this.loadUsers();
  }

  /**
   * Loads all users from the backend and applies filtering and pagination logic.
   */
  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (res: UserPageResponse) => {
        this.users = res.users;
        this.totalUsers = res.totalElements;
        this.applyFilters();
      },
      error: (err) => {
        console.error('Error with loading users:', err);
      }
    });
  }

  /**
   * Triggers a search filter and resets pagination to the first page.
   */
  onSearch(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  /**
   * Opens a modal showing the details of the selected user.
   * @param user The user to view
   */
  viewUser(user: UserResponseDto): void {
    this.selectedUser = user;
    this.userViewOpen = true;
  }

  /**
   * Closes the user detail view modal.
   */
  closeViewModal(): void {
    this.selectedUser = null;
    this.userViewOpen = false;
  }

  /**
   * Confirms and executes deletion of a selected user by ID.
   */
  deleteUser(): void {
    if (this.userToDeleteId !== null) {
      this.userService.deleteUser(this.userToDeleteId).subscribe(() => {
        this.loadUsers();
        this.closeDeleteModal();
      });
    }
  }

  /**
   * Opens the delete confirmation modal for the given user ID.
   * @param id The ID of the user to be deleted
   */
  openDeleteModal(id: number): void {
    this.userToDeleteId = id;
    this.confirmDeleteOpen = true;
  }

  /**
   * Closes the delete confirmation modal and resets the selected ID.
   */
  closeDeleteModal(): void {
    this.confirmDeleteOpen = false;
    this.userToDeleteId = null;
  }

  /**
   * Navigates to the edit form for the selected user.
   * @param id User ID to edit
   */
  editUser(id: number): void {
    this.router.navigate(['/admin/edit', id]);
  }

  get totalPagesArray(): number[] {
    const totalPages = Math.ceil(this.totalUsers / this.pageSize);
    return Array.from({length: totalPages}, (_, i) => i + 1);
  }

  /**
   * Navigates to the selected page number if it is within valid range.
   * @param page Target page number
   */
  goToPage(page: number): void {
    const totalPages = Math.ceil(this.totalUsers / this.pageSize);
    if (page < 1 || page > totalPages || page === this.currentPage) return;

    this.currentPage = page;
    this.applyFilters();
  }

  /**
   * Applies filters based on user status and email search.
   */
  applyFilters(): void {
    if (!Array.isArray(this.users)) {
      console.error('Expected this.users to be array, but got:', this.users);
      this.filteredUsers = [];
      return;
    }

    let filtered = this.users;

    if (this.selectedUserStatus) {
      filtered = filtered.filter(user => user.userStatus === this.selectedUserStatus);
    }

    if (this.search.trim()) {
      const searchLower = this.search.trim().toLowerCase();
      filtered = filtered.filter(user =>
        user.email?.toLowerCase().includes(searchLower)
      );
    }

    this.totalUsers = filtered.length;

    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.filteredUsers = filtered.slice(start, end);
  }


  /**
   * Applies status-based filtering for the selected user status.
   * @param status The user status to filter by
   */
  filterByStatus(status: UserStatus): void {
    this.selectedUserStatus = status;
    this.currentPage = 1;
    this.applyFilters();
  }

  /**
   * Logs out the current user and navigates to the login screen.
   */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
