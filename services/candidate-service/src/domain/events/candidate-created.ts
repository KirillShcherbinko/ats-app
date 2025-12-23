import { DomainEvent } from "../../shared/domain/domain-event";
import { ICandidateCreatedEventPayload } from "./types";

export class CandidateCreatedEvent extends DomainEvent<ICandidateCreatedEventPayload> {
  constructor(payload: ICandidateCreatedEventPayload) {
    super("CandidateCreated", payload.candidateId, payload);
  }
}
