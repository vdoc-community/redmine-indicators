export class Pager {
  offset: number;
  limit: number;
  constructor(offset?: number, limit?: number) {
    if (offset) {
      this.offset = offset;
    } else {
      this.offset = 0;
    }
    if (limit) {
      this.limit = limit;
    } else {
      this.limit = 25;
    }
  }
}
