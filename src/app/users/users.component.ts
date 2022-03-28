import { Component, OnInit } from '@angular/core';
import { User, UsersService } from '../users.service';

import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  pageNumber: number = 1
  pageSize: number = 0
  totalPages: number = 0
  selectedUser: any = {}
  firstName: string = ''
  lastName: string = ''
  newJob: string = ''

  userDetails: any = {
    name: "",
    job: ""
  }


  users: User[] = []


  displayedColumns: string[] = ['email', 'first_name', 'last_name', 'avatar', 'actions'];
  dataSource = this.users

  constructor(private _users: UsersService) { }

  ngOnInit(): void {
    this.getAllUsers()
  }

  addNewUserForm = new FormGroup({
    name: new FormControl(this.userDetails.name),
    job: new FormControl(this.userDetails.job)
  })

  getAllUsers() {
    this._users.fetchUsers(this.pageNumber)
      .subscribe(
        res => {
          let newUsers = res.data.map((item: User) => {
            item["job"] = ""

            return item
          })

          this.users = newUsers
          this.pageSize = res.per_page
          this.totalPages = res.total_pages
        },
        err => {
          console.log(err)
        }
      )
  }

  fetchPrevPageData() {

    if (this.pageNumber > 0) {
      let newPage = this.pageNumber -= 1

      // get page data
      this._users.fetchUsers(newPage)
        .subscribe(
          res => {
            this.users = res.data
            this.pageSize = res.per_page
          },
          err => {
            console.log(err)
          }
        )
    }
  }

  fetchNextPageData() {
    let newPage = this.pageNumber += 1

    // get page data
    this._users.fetchUsers(newPage)
      .subscribe(
        res => {
          this.users = res.data
          this.pageSize = res.per_page
        },
        err => {
          console.log(err)
        }
      )
  }

  selectSingleUser(item: User) {
    console.log(item)

    this.selectedUser = item

    this.firstName = item.first_name
    this.lastName = item.last_name
    this.newJob = item.job
  }

  createUser() {

    let newUser = {
      name: this.addNewUserForm.get('name')?.value,
      job: this.addNewUserForm.get('job')?.value
    }

    console.log(newUser)

    this._users.createUser(newUser)
    .subscribe(res => console.log(res), err => console.log(err))
  }

  editUser() {

    this._users.updateUser({
      id: this.selectedUser.id,
      email: '',
      first_name: this.firstName,
      last_name: this.lastName,
      job: this.newJob,
      avatar: ''
    })
    .subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

  removeUser(user: User){
    this.selectedUser = user
  }

  confirmRemoveUser() {
    this._users.deleteUser(this.selectedUser)
    .subscribe(res => console.log(res), err=> console.log(err))
  }
}
