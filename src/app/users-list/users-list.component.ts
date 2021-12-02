import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  emailSearch: string = '';
  nameSearch: string = '';
  lastnameSearch: string = '';
  idSearch: string = '';
  birthStartSearch: string = '';
  birthEndSearch: string = '';

  users: any = [];

  usersPerPage = 8;
  recentPage: number = 1;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  onDeleteUser(id: number) {
    this.usersService.onDeleteUser(id).subscribe((data) => {
      this.users = data;
      if (
        this.users.length % this.usersPerPage === 0 &&
        this.recentPage !== 1
      ) {
        this.onPageChange(this.recentPage - 1);
      }
      console.log(this.recentPage);
    });
  }

  onClear(form: NgForm) {
    form.setValue({
      'email-search': '',
      'name-search': '',
      'lastname-search': '',
      'id-search': '',
      'birth-search-start-date': '',
      'birth-search-end-date': '',
    });
    this.onPageChange(1);
  }

  onPageChange(page: number) {
    this.recentPage = page;
    this.usersService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  onFormChange() {
    this.onPageChange(1);
  }
}
