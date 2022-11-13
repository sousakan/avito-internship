export default function prettyDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString();
}
