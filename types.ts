export interface ITransaction {
  'transaction-id': string;
  'merchant-id': string;
  amount: number;
  // Assume datetime is always in format YYYY-MM-DD HH:MM:SS
  datetime: string;
  user: IUser;
  card: ICard;
}

interface IUser {
  id: string;
  name: string;
  surname: string;
}

interface ICard {
  number: number;
  // Assume number is always formatted YY-MM-DD
  "expiry-date": string
}
