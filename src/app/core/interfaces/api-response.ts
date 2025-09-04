export interface ApiResponse<T = any> {
  message: string;
  response: T;
  code: number;
}
