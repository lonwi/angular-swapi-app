import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'specie'
})
export class SpeciePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
