import { HttpException } from '@nestjs/common';

export class DataErrorMessage extends HttpException {
  private _errorData = {};

  constructor(messageException = 'Algo salío mal con tu petición.') {
    super(messageException, 500);
    this.message =
      'Ocurrió un error con los datos que mandaste o con el servidor.';
  }

  set errorData(data: any) {
    this._errorData = data;
  }
}
