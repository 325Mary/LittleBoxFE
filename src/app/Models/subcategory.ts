export class Subcategory {
    _id?: string;
    identifier: string;
    name: string;
    category: {
      _id?: string;
      name: string;
    };
  
    constructor(identifier: string, name: string, category:  { _id?: string; name: string }) {
      this.identifier = identifier;
      this.name = name;
      this.category = category;
    }
  }
  