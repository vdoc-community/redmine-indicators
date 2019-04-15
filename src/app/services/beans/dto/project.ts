import {AbstractBean} from './abstract-bean';

export class Project extends AbstractBean {
}

export function parseProject(json: any): Project {
  const project = new Project(json.id, json.name);
  return project;
}
