export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string = 'Something wrong happened.',
  ) {
    super(message);
  }
}