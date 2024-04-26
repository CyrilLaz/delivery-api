type TBook = Record<"book", IBook>;
type TBooks = Record<"books", IBook[]>;

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;

export type TController = (
  req: import("express").Request,
  res: import("express").Response,
  next?: import("express").NextFunction
) => void;

