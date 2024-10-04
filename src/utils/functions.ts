import { Timestamp } from 'firebase/firestore';

export function convertTimestamp(timestamp: Timestamp): string {
  const date = timestamp.toDate();
  const mm = date.getMonth();
  const dd = date.getDate();
  const yyyy = date.getFullYear();

  return mm + '/' + dd + '/' + yyyy;
}

export function convertNumberToDate(number: number): string {
  const date = new Date(number);
  const mm = (date.getMonth() + 1).toString().padStart(2, '0');
  const dd = date.getDate().toString().padStart(2, '0');
  const yyyy = date.getFullYear();

  return mm + '/' + dd + '/' + yyyy;
}
