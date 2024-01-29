export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  status: string;
}

export class Tasks {
 constructor (
  public id: number,
  public title: string,
  public description: string,
  public dueDate: Date,
  public status: string

 ) {}
}


export class Board {
  constructor(public name: string, public columns: Column[]) {}
}


export class Column {
  constructor(public name: string, public tasks: Task[]) {}
}
