import { AbstractRef, parserRef as parseRef } from './abstract-ref';
export class ReleaseNoteRef extends AbstractRef {

}

export function parseReleaseNoteRef(json: any): ReleaseNoteRef {
  return parseRef(json, new ReleaseNoteRef());
}
