import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from './users-list/user.interface';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: any = [];

  constructor(private http: HttpClient) {}

  getUser(id: number) {
    return this.http.get('http://localhost:3000/user/' + id);
  }

  getUsers() {
    return this.http.get('http://localhost:3000/');
  }

  onDeleteUser(id: number) {
    return this.http.delete('http://localhost:3000/' + id);
  }

  resetUserData(form: NgForm) {
    form.setValue({
      name: '',
      lastName: '',
      idNumber: '',
      email: '',
      birthDate: '',
    });
  }

  addUser(user: User) {
    return this.http.post('http://localhost:3000/user/add', user).subscribe();
  }

  editUser(user: User) {
    // let userToChange: any = this.users.find((u: User) => u.id === user.id);
    // user.id = userToChange.id;
    // let index = this.users.indexOf(userToChange);
    // this.users.splice(index, 1, user);
    return this.http
      .patch('http://localhost:3000/user/' + user.id, user)
      .subscribe();
  }
}
