import {AbstractBean} from './abstract-bean';

export class Project extends AbstractBean {
}

export function parseProject(json: any): Project {
  const version = new Project(json.id, json.name);
  return version;
}
