import { Pipe, PipeTransform } from '@angular/core';
import { User } from './users-list/user.interface';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  userCheck(
    user: User,
    input: {
      name: string;
      lastname: string;
      email: string;
      id: string;
      birthStart: string;
      birthEnd: string;
    }
  ) {
    return (
      user.name.toLowerCase().includes(input.name.toLowerCase()) &&
      user.email.toLowerCase().includes(input.email.toLowerCase()) &&
      user.lastname.toLowerCase().includes(input.lastname.toLowerCase())
    );
  }

  transform(
    value: any,
    searchInput: {
      name: string;
      lastname: string;
      email: string;
      id: string;
      birthStart: string;
      birthEnd: string;
    }
  ) {
    if (
      searchInput.name !== '' ||
      searchInput.lastname !== '' ||
      searchInput.email !== '' ||
      searchInput.id !== '' ||
      searchInput.birthStart !== '' ||
      searchInput.birthEnd !== ''
    ) {
      return value.filter((user: User) => {
        if (searchInput.id !== '') {
          return user.idNumber === searchInput.id;
        }
        if (searchInput.birthStart !== '' || searchInput.birthEnd !== '') {
          if (searchInput.birthStart !== '' && searchInput.birthEnd !== '') {
            return (
              this.userCheck(user, searchInput) &&
              new Date(searchInput.birthStart).getTime() <=
                new Date(user.birthDate).getTime() &&
              new Date(searchInput.birthEnd).getTime() >=
                new Date(user.birthDate).getTime()
            );
          }
          if (searchInput.birthStart !== '' && searchInput.birthEnd === '') {
            return (
              this.userCheck(user, searchInput) &&
              new Date(searchInput.birthStart).getTime() <=
                new Date(user.birthDate).getTime()
            );
          }
          if (searchInput.birthStart === '' && searchInput.birthEnd !== '') {
            return (
              this.userCheck(user, searchInput) &&
              new Date(searchInput.birthEnd).getTime() >=
                new Date(user.birthDate).getTime()
            );
          }
        }
        return this.userCheck(user, searchInput);
      });
    }
    return value;
  }
}
