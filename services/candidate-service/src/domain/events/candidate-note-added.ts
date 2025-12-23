import { DomainEvent } from "../../shared/domain/domain-event";
import { ICandidateNoteAddedEventPayload } from "./types";

export class CandidateNoteAddedEvent extends DomainEvent<ICandidateNoteAddedEventPayload> {
  constructor(payload: ICandidateNoteAddedEventPayload) {
    super("CandidateNoteAdded", payload.candidateId, payload);
  }
}
