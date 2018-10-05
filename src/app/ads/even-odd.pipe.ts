import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'evenOdd'
})
export class EvenOddPipe implements PipeTransform {

  transform(value:any[], filter:string): any {
    if(!value || (filter !== 'even' && filter !== 'odd')) {
      return value;
    }
    //return value.filter(item, idx => return filter === 'even' ? idx % 2 === 1);
    return value.filter(item => {
      if(filter === 'even') {
        if(value.indexOf(item) % 2 == 0)
          return value;
        return null;
      }
      else {
        if(value.indexOf(item) % 2 == 1)
          return value;
        return null;

      }
    });

  }

}
