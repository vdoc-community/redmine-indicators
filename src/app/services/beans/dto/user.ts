import {AbstractBean} from './abstract-bean';

export class User extends AbstractBean {
  firstname: string;
  lastname: string;

  constructor(id: number, name: string) {
    super(id, name);
  }
}

export function parseUser(json: any): User {
  const user = new User(json.id, json.login);
  user.firstname = json.firstname;
  user.lastname = json.lastname;
  return user;
}
