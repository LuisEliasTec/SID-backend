import { HttpException } from '@nestjs/common';

export class SuccessDeleteMessage extends HttpException {
  private _data = {};

  constructor() {
    super('OK', 200);
  }

  set data(data: any) {
    this._data = data;
  }

  set customMessage(message: string) {
    if (message === 'zero') {
      this.message = 'No se encontró el registro.';
    } else {
      this.message = message;
    }
  }
}
