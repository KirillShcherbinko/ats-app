import { DomainEvent } from "../../shared/domain/domain-event";
import { ICandidateDocumentAddedEventPayload } from "./types";

export class CandidateNoteAddedEvent extends DomainEvent<ICandidateDocumentAddedEventPayload> {
  constructor(payload: ICandidateDocumentAddedEventPayload) {
    super("CandidateDocumentAdded", payload.candidateId, payload);
  }
}
