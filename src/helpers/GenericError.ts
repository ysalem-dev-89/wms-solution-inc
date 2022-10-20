export default class GenericError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'GenericError';
    this.message = message;
    this.status = status;
  }
}
