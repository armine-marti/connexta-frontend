export class DateUtil {
  static toInputDateString(dateStr: string | null): string {
    if (!dateStr) return '';
    return new Date(dateStr).toISOString().split('T')[0];
  }
}
