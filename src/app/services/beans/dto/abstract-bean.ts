export abstract class AbstractBean {

  public readonly id: number;
  public name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

}

export function stringifyAbstractBean(bean: AbstractBean): any {
  return {
    'id': bean.id,
    'name': bean.name
  };
}
