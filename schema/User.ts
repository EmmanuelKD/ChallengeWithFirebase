export class User {
  id: string = "";
  name: string = "";
  email: string = "";
  password: string = "";
  passwordConfirmation: string = "";
  deleted_at: Date = new Date;
  updated_date: Date = new Date;
  created_date: Date = new Date;

  toObj = () => (
    {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      passwordConfirmation: this.passwordConfirmation,
      deleted_at: this.deleted_at,
      updated_date: this.updated_date,
      created_date: this.created_date,
    }
  )
  fromObj({
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
    this.name = name;
    this.id = id;
    this.email = email;
    this.password = password;
    this.passwordConfirmation = passwordConfirmation;
    this.deleted_at = deleted_at;
    this.updated_date = updated_date;
    this.created_date = created_date;

    return this;
  }
}
