export class PaginationUtil {


  static getPages(totalItems: number, pageSize: number): number[] {
    const totalPages = Math.ceil(totalItems / pageSize);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  static isValidPage(page: number, total: number, pageSize: number, current: number): boolean {
    const totalPages = Math.ceil(total / pageSize);
    return page >= 1 && page <= totalPages && page !== current;
  }
}
