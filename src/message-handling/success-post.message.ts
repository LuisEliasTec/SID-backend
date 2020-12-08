import { HttpException } from '@nestjs/common';

export class SuccessPostMessage extends HttpException {
  private _data = {};

  constructor() {
    super('OK', 201);
    this.message = 'Petición completada con exito.';
  }

  set data(data: any) {
    this._data = data;
  }
}
