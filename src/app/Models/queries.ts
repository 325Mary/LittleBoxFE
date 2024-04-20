export class Query {
  _id?: string;
  identifier: string;
  question: string;
  answer: string;
  subcategory: {
    _id?: string;
    name: string;
  };

  constructor(
    identifier: string,
    question: string,
    answer: string,
    subcategory: { _id?: string; name: string }
  ) {
    this.identifier = identifier;
    this.question = question;
    this.answer = answer;
    this.subcategory = subcategory;
  }
}
