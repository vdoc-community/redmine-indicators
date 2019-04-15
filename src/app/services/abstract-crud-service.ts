import { HttpResponse } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Page, Pager } from './beans/dto';
import { RedmineClient } from './http/redmine-client.service';
import { Observable } from 'rxjs';
import { AbstractBean } from './beans/dto/abstract-bean';
import { AbstractRef } from './beans/refs/abstract-ref';

export abstract class AbstractCrudService<T extends AbstractBean> {

  protected redmineClient: RedmineClient;

  constructor(redmineClient: RedmineClient) {
    this.redmineClient = redmineClient;
  }

  public findById(id: number): Observable<T> {
    return this.redmineClient.get(`/${this.endpoint()}/${id}`).pipe(map(json => this.parser(json)));
  }

  public save(bean: T): Observable<T> {
    return this.redmineClient.post(`/${this.endpoint()}`, this.stringify(bean));
  }

  public update(bean: T): Observable<T> {
    return this.redmineClient.put(`/${this.endpoint()}/${bean.id}`, this.stringify(bean));
  }

  public delete(bean: T): Observable<HttpResponse<any>> {
    return this.redmineClient.delete(`/${this.endpoint()}/${bean.id}`);
  }

  public findAll(pager?: Pager): Observable<Page<T>> {
    let uri = `/${this.endpoint()}`;
    if (pager) {
      uri += `?offset=${pager.offset}&limit=${pager.limit}`;
    }
    return this.redmineClient.get(uri).pipe(map(json => this.pageParser(json, this.parser)));
  }

  protected abstract endpoint(): string;
  protected stringify(bean: T): any {
    return bean;
  }
  protected abstract parser(json: any): T;

  protected pageParser(json: any, parser: (item: any) => T): Page<T> {
    const page = new Page<T>();
    page.limit = json.limit;
    page.offset = json.offset;
    page.total_count = json.total_count;
    page.elements = [];
    if (json.elements) {
      json.elements.forEach(element => {
        page.elements.push(parser(element));
      });
    }
    return page;
  }

}
