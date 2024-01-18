// data.model.ts

export interface IDataElement {
  uid: number
  id: string;
  int: number;
  float: number;
  color: string;
  child: {
    id: string;
    color: string;
  };
}



export class DataElement implements IDataElement {
  uid: number;
  id: string;
  int: number;
  float: number;
  color: string;
  child: {
    id: string;
    color: string;
  };

  constructor(data: any) {
    this.uid = data.uid;
    this.id = data.id;
    this.int = data.int;
    this.float = data.float;
    this.color = data.color;
    this.child = {
      id: data.child.id,
      color: data.child.color,
    };
  }
}
