import { map } from 'rxjs/operators';
import { Page } from './beans/dto';
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
    return this.redmineClient.get(`/${this.endpoint()}/${id}`);
  }

  public save(bean: T): Observable<T> {
    return this.redmineClient.post('/${this.endpoint()}', bean);
  }

  public update(bean: T): Observable<T> {
    return this.redmineClient.put(`/${this.endpoint()}/${bean.id}`, bean);
  }

  public delete(bean: T): Observable<T> {
    return this.redmineClient.delete(`/${this.endpoint()}/${bean.id}`);
  }

  public findAll(): Observable<Page<T>> {
    return this.redmineClient.get(`/${this.endpoint()}`).pipe(map(json => this.pageParser(json, this.parser)));
  }

  protected abstract endpoint(): string ;
  protected abstract parser(json: any): T ;

  protected parserRef<R extends AbstractRef>(json: any, ref: R): R {
    ref.id = json.id;
    ref.name = json.name;
    return ref;
  }

  protected pageParser(json: any, parser: (item: any) => T): Page<T> {
    const page = new Page<T>();
    page.limit = json.limit;
    page.offset = json.offset;
    page.total_count = json.total_count;
    page.elements = [];
    json.elements.forEach(element => {
      page.elements.push(parser(element));
    });
    return page;
  }

}
