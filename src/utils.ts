import { AxiosError } from "axios";

/** Extracts the error message from an AxiosError instance */
export const logError = (err: AxiosError<any>): string => {
  if (!err.response) return err.message;
  return err.response.data.message;
};
