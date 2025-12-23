import { DomainEvent } from "../../shared/domain/domain-event";
import { ICandidateInfoUpdatedEventPayload } from "./types";

export class CandidateInfoUpdatedEvent extends DomainEvent<ICandidateInfoUpdatedEventPayload> {
  constructor(payload: ICandidateInfoUpdatedEventPayload) {
    super("CandidateInfoUpdated", payload.candidateId, payload);
  }
}
