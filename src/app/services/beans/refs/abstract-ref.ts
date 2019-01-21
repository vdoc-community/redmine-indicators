import { AbstractBean } from '../dto/abstract-bean';

export abstract class AbstractRef {

  public id: number;
  public name: string;

  constructor(bean?: AbstractBean) {
    if (bean) {
      if (bean.id) {
        this.id = bean.id;
      }
      if (bean.name) {
        this.name = bean.name;
      }
    }
  }


}
