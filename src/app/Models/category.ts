export class Category {
  _id?: number;
  identifier: string;
  name: string;
  description: string;

  constructor(identifier: string, name: string, description: string) {
    this.name = name;
    this.identifier = identifier
    this.description = description;
  }
}
