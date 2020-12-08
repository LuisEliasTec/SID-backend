import { HttpException } from '@nestjs/common';

export class SuccessGetMessage extends HttpException {
  private _data = {};

  constructor() {
    super('OK', 200);
    this.message = 'Petición completada con exito.';
  }

  set data(data: any) {
    this._data = data;
  }
}
