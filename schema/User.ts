export class User {
  id: string = "";
  name: string = "";
  email: string = "";
  password: string = "";
  passwordConfirmation: string = "";
  deleted_at: Date = new Date;
  updated_date: Date = new Date;
  created_date: Date = new Date;


}




export namespace User {

  export function toObject(usr: User): Object {
    return (
      {
        id: usr.id,
        name: usr.name,
        email: usr.email,
        password: usr.password,
        passwordConfirmation: usr.passwordConfirmation,
        deleted_at: usr.deleted_at,
        updated_date: usr.updated_date,
        created_date: usr.created_date,
      }
    )
  }



  export function fromObj({
    id,
    name,
    email,
    password,
    passwordConfirmation,
    deleted_at,
    updated_date,
    created_date
  }: {
    id: string,
    name?: string,
    email: string,
    password?: string,
    passwordConfirmation?: string,
    deleted_at?: Date,
    updated_date?: Date,
    created_date?: Date
  }): User {
    var usr = new User();

    usr.name = name;
    usr.id = id;
    usr.email = email;
    usr.password = password;
    usr.passwordConfirmation = passwordConfirmation;
    usr.deleted_at = deleted_at;
    usr.updated_date = updated_date;
    usr.created_date = created_date;

    return usr;
  }
}