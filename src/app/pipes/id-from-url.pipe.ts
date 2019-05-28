import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'idFromUrl'
})
export class IdFromUrlPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    const parts = value.split('/');
    const id = parts.pop() || parts.pop();
    return id;
  }

}