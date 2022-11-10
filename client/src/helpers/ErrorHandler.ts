import { AxiosError } from 'axios';

export default class ErrorHandler {
  static handleRequestError(
    exception: AxiosError,
    setError: React.Dispatch<React.SetStateAction<string>>
  ): void {
    if (exception.response) {
      if (exception.response.status === 400 && exception.response.data) {
        const data = exception.response.data as {
          statusCode: number;
          error: string;
        };
        setError(data.error);
      } else {
        setError('Something went wrong, please try again later.');
      }
    } else if (exception.request) {
      setError('Something went wrong, please try again later.');
    } else {
      setError('Something went wrong, please try again later.');
    }
  }
}
