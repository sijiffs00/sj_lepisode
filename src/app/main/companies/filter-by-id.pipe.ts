import { Pipe, PipeTransform } from '@angular/core';
import { Company } from '../../services/company.service';

@Pipe({
  name: 'filterById'
})
export class FilterByIdPipe implements PipeTransform {
  transform(items: Company[], id: string | null): Company[] {
    if (!items || !id) return [];
    return items.filter(item => item.id === id);
  }
} 