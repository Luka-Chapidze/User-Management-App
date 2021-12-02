import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate',
})
export class PaginatePipe implements PipeTransform {
  transform(value: number[], args: { usersPerPage: any }) {
    let pages = [];
    for (let i = 0; i < Math.ceil(value.length / args.usersPerPage); i++) {
      pages.push(i + 1);
    }
    if (value.length > args.usersPerPage) {
      return pages;
    }
    return;
  }
}
