import { Timestamp } from 'firebase/firestore';

export function convertTimestamp(timestamp: Timestamp): string {
  const date = timestamp.toDate();
  const mm = date.getMonth();
  const dd = date.getDate();
  const yyyy = date.getFullYear();

  return mm + '/' + dd + '/' + yyyy;
}
