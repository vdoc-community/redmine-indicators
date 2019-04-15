import {AbstractBean} from './abstract-bean';

export class Version extends AbstractBean {
}

export function parseVersion(json: any): Version {
  const version = new Version(json.id, json.name);
  return version;
}
