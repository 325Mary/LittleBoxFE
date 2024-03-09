export class Query {
    _id?: number;
    identifier: number;
    question: string;
    answer: string;
    subcategory: {
        _id: string;
        name: string;
      };


    constructor(identifier: number, question: string, answer: string, subcategory: any){
        this.identifier = identifier
        this.question = question
        this.answer = answer
        this.subcategory = subcategory
    }
}

