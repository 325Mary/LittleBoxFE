
export class Subcategory {

    _id?: number;
    identifier: string;
    name: string;
    category: {
        _id: string;
        name: string;
      };



    constructor(identifier: string, name: string, category: any){
        this.identifier = identifier
        this.name = name
        this.category = category
    }
}
