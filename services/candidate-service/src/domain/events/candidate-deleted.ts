import { DomainEvent } from '../../shared/domain/domain-event';
import { ICandidateDeletedEventPayload } from './types';

export class CandidateDeletedEvent extends DomainEvent<ICandidateDeletedEventPayload> {
  constructor(payload: ICandidateDeletedEventPayload) {
    super('CandidateDeleted', payload.candidateId, payload);
  }
}
