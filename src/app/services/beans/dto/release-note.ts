import {AbstractBean} from './abstract-bean';

export class ReleaseNote extends AbstractBean {
  projectId: number;
  versionId: number;

  constructor(id: number, name: string, projectId?: number, versionId?: number) {
    super(id, name);
    this.name = name;
    this.projectId = projectId;
    this.versionId = versionId;
  }
}

export function parseReleaseNote(json: any): ReleaseNote {
  const releaseNote = new ReleaseNote(json.id, json.name);
  releaseNote.projectId = json.projectId;
  releaseNote.versionId = json.versionId;
  return releaseNote;
}
