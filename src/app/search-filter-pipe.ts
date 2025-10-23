import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

transform(list: any[], filterText: string): any {
  console.log('transforming');
return  list.filter(item =>
      item.name?.toLowerCase().includes(filterText.toLowerCase()))
}


}
