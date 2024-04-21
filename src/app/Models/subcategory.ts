export class Subcategory {
    _id?: string;
    identifier: string;
    name: string;
    description: string;
    category: {
      _id?: string;
      name: string;
    };
  
    constructor( name: string, identifier:string, description:string, category:  { _id?: string; name: string }) {
      this.name = name;
      this.identifier = identifier
      this.category = category;
      this.description = description
    }
  }
  