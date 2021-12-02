import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginateData',
})
export class PaginateDataPipe implements PipeTransform {
  transform(value: any, args: { usersPerPage: number; recentPage: number }) {
    let arrToReturn = [...value].splice(
      (args.recentPage - 1) * args.usersPerPage,
      args.usersPerPage
    );

    return arrToReturn;
  }
}
