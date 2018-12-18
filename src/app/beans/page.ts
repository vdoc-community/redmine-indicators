export class Page<T> {
  total_count: number;
  offset: number;
  limit: number;
  elements: Array<T>;
}
