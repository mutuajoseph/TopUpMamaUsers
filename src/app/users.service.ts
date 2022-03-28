import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  job: string
  avatar: string
}

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private _getUsersUrl = 'https://reqres.in/api/users'
  private _createUserUrl = ''
  private _updateUserUrl = ''
  private _deleteUserUrl = ''
  constructor(private http: HttpClient) { }

  fetchUsers(pageNumber: number) {
    return this.http.get<any>(`${this._getUsersUrl}?page=${pageNumber}`)
  }

  createUser(userDetails: any) {
    return this.http.post<any>(this._getUsersUrl, userDetails)
  }

  updateUser(user: User) {
    return this.http.post<any>(`${this._getUsersUrl}/${user.id}`, {
      name: user.first_name + ' ' + user.last_name,
      job: user.job
    })
  }

  deleteUser(user: User) {
    return this.http.delete<any>(`${this._getUsersUrl}/${user.id}`)
  }
}
