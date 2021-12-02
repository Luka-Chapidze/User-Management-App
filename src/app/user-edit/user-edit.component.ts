import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../users.service';
import { User } from './../users-list/user.interface';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  user: any = {};

  name: string = '';
  lastname: string = '';
  email: string = '';
  idNumber: string = '';
  birthDate: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    if (this.route.snapshot.params['id'] !== 'add') {
      this.usersService
        .getUser(+this.route.snapshot.params['id'])
        .subscribe((data) => {
          this.getUserData(data);
        });
    }
  }

  getUserData(data: any) {
    this.user = data;
    this.name = this.user.name;
    this.lastname = this.user.lastname;
    this.email = this.user.email;
    this.idNumber = this.user.idNumber;
    this.birthDate = this.user.birthDate;
  }

  onUserSave() {
    const user: User = {
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      idNumber: this.idNumber,
      birthDate: this.birthDate,
      id: this.user.id,
    };
    if (this.route.snapshot.params['id'] !== 'add') {
      this.usersService.editUser(user);
    } else {
      this.usersService.addUser(user);
    }
    this.router.navigateByUrl('');
  }
}
