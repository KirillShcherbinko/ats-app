// src/application/dtos/candidate.dto.ts
import { Candidate } from "../../domain/entities/candidate";
import { ECandidateStatus } from "../../domain/enums/candidate-status";

export interface CandidateDTO {
  id: string;
  firstName: string;
  lastName: string;
  patronymic: string | null;
  email: string;
  phone: string | null;
  status: ECandidateStatus;
  photoUrl: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  history: Array<{
    id: string;
    eventType: string;
    payload: Record<string, unknown>;
    createdAt: Date;
  }>;
}

export class CandidateMapper {
  static toDTO(candidate: Candidate): CandidateDTO {
    return {
      id: candidate.id.toString(),
      firstName: candidate.fullName.firstName,
      lastName: candidate.fullName.lastName,
      patronymic: candidate.fullName.patronymic,
      email: candidate.email.value,
      phone: candidate.phone?.value ?? null,
      status: candidate.status,
      photoUrl: candidate.photoUrl?.value ?? null,
      description: candidate.description?.value ?? null,
      createdAt: candidate.createdAt,
      updatedAt: candidate.updatedAt,
      history: candidate.history.map((item) => ({
        id: item.id,
        eventType: item.eventType,
        payload: item.payload,
        createdAt: item.createdAt,
      })),
    };
  }

  static toDTOList(candidates: Candidate[]): CandidateDTO[] {
    return candidates.map((candidate) => this.toDTO(candidate));
  }
}
