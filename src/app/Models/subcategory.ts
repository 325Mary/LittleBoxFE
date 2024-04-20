export class Subcategory {
    _id?: string;
    name: string;
    description: string;
    category: {
      _id?: string;
      name: string;
    };
  
    constructor( name: string, description:string, category:  { _id?: string; name: string }) {
      this.name = name;
      this.category = category;
      this.description = description
    }
  }
  