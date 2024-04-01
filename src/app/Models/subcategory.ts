export class Subcategory {
    _id?: string;
    name: string;
    category: {
      _id?: string;
      name: string;
    };
  
    constructor( name: string, category:  { _id?: string; name: string }) {
      this.name = name;
      this.category = category;
    }
  }
  