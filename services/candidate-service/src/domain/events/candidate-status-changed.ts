import { DomainEvent } from "../../shared/domain/domain-event";
import { ICandidateStatusChangedEventPayload } from "./types";

export class CandidateStatusChangedEvent extends DomainEvent<ICandidateStatusChangedEventPayload> {
  constructor(payload: ICandidateStatusChangedEventPayload) {
    super("CandidateStatusChanged", payload.candidateId, payload);
  }
}
