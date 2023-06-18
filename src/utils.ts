import { AxiosError } from "axios";

/** Extracts the error message from an AxiosError instance */
export const logError = (err: AxiosError<any>): string => {
  if (!err.response) return err.message;
  return err.response.data.message;
};

/** Copies unique elements from src to dest */
export const copyUnique = <T>(dest: T[], src: T[], isUnique: (obj: T) => boolean) => {
  for (const obj of src) {
    if (isUnique(obj)) dest.push(obj);
  }
};
