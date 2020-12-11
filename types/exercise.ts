import {v4 as uuid} from 'uuid';

export class Exercise {
  title: string;
  id: string;

  constructor(title: string) {
    this.title = title;
    this.id = uuid();
  }
}
