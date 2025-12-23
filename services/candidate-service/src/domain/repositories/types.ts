import { Candidate } from "../entities/candidate";
import { CandidateDocument } from "../entities/candidate-document";
import { CandidateNote } from "../entities/candidate-note";

export interface ICandidateRepository {
  findById(id: string): Promise<Candidate | null>;
  findByEmail(email: string): Promise<Candidate | null>;
  findAll(
    candidateIds: string[],
    page: number,
    limit: number,
    searchQuery?: string
  ): Promise<Candidate[]>;
  save(candidate: Candidate): Promise<void>;
  update(id: string, candidate: Candidate): Promise<void>;
  delete(id: string): Promise<void>;
}

export interface ICandidateNoteRepository {
  findById(id: string): Promise<CandidateNote | null>;
  findByCandidateId(
    candidateId: string,
    page: number,
    limit: number
  ): Promise<CandidateNote[]>;
  save(note: CandidateNote): Promise<void>;
  delete(id: string): Promise<void>;
}

export interface ICandidateDocumentRepository {
  findById(id: string): Promise<CandidateDocument | null>;
  findByCandidateId(candidateId: string): Promise<CandidateDocument[]>;
  save(document: CandidateDocument): Promise<void>;
  delete(id: string): Promise<void>;
}
