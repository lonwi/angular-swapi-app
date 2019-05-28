import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newLine'
})
export class NewLinePipe implements PipeTransform {

  transform(value: string): any {
    return value.replace(/(?:\r\n\r\n|\r\r|\n\n)/g, '<br /><br />');
  }
}
