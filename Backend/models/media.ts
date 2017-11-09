import { injectable } from 'inversify';

interface IMedia {
  url: string;
  type: string;
  _id?: string;
}

@injectable()
export class Media implements IMedia {
  constructor(
    public url: string,
    public type: string,
    public _id?: string
  ) { }
}
