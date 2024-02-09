import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'age'
})
export class AgePipe implements PipeTransform {
  transform(value: string): string | null {
    if (!value) return null; // Handle empty input

    // Calculate age
    const today = new Date();
    const birthDate = new Date(value);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // If current month is before birth month or if it's the birth month but the day is before the birth day
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age + ' y.o.';
  }
}
