// src/application/services/candidate.service.ts
import { Candidate } from "../../domain/entities/candidate";
import { CandidateNote } from "../../domain/entities/candidate-note";
import { CandidateDocument } from "../../domain/entities/candidate-document";
import {
  ICandidateRepository,
  ICandidateNoteRepository,
  ICandidateDocumentRepository,
} from "../../domain/repositories/types";
import { IEventPublisher } from "../../shared/application/ports/event-publisher";
import { UniqueId } from "../../shared/kernel/unique-id";

export class CandidateService {
  constructor(
    private readonly candidateRepository: ICandidateRepository,
    private readonly noteRepository: ICandidateNoteRepository,
    private readonly documentRepository: ICandidateDocumentRepository,
    private readonly eventPublisher: IEventPublisher
  ) {}

  async createCandidate(params: {
    firstName: string;
    lastName: string;
    patronymic: string | null;
    email: string;
    phone: string | null;
    photoUrl: string | null;
    description: string | null;
  }): Promise<string> {
    // Проверка уникальности email
    const existingCandidate = await this.candidateRepository.findByEmail(
      params.email
    );
    if (existingCandidate) {
      throw new Error(`Кандидат с email ${params.email} уже существует`);
    }

    const candidate = Candidate.create(params);

    await this.candidateRepository.save(candidate);

    // Публикация событий
    await this.publishDomainEvents(candidate);

    return candidate.id.toString();
  }

  async updateCandidate(params: {
    candidateId: string;
    firstName?: string;
    lastName?: string;
    patronymic?: string | null;
    email?: string;
    phone?: string | null;
    photoUrl?: string | null;
    description?: string | null;
  }): Promise<void> {
    const candidate = await this.getCandidate(params.candidateId);

    candidate.update(params);

    await this.candidateRepository.update(params.candidateId, candidate);

    // Публикация событий
    await this.publishDomainEvents(candidate);
  }

  async changeCandidateStatus(params: {
    candidateId: string;
    status: string;
    reason?: string;
  }): Promise<void> {
    const candidate = await this.getCandidate(params.candidateId);

    candidate.changeStatus(params.status, params.reason);

    await this.candidateRepository.update(params.candidateId, candidate);

    // Публикация событий
    await this.publishDomainEvents(candidate);
  }

  async deleteCandidate(params: {
    candidateId: string;
    reason?: string;
  }): Promise<void> {
    const candidate = await this.getCandidate(params.candidateId);

    candidate.delete(params.reason);

    await this.candidateRepository.delete(params.candidateId);

    // Публикация событий
    await this.publishDomainEvents(candidate);
  }

  async addNote(params: {
    candidateId: string;
    authorId: string;
    content: string;
  }): Promise<string> {
    const candidate = await this.getCandidate(params.candidateId);

    const note = CandidateNote.create(
      UniqueId.fromString(params.candidateId),
      UniqueId.fromString(params.authorId),
      params.content
    );

    await this.noteRepository.save(note);

    return note.id.toString();
  }

  async deleteNote(params: { noteId: string }): Promise<void> {
    await this.noteRepository.delete(params.noteId);
  }

  async addDocument(params: {
    candidateId: string;
    fileUrl: string;
  }): Promise<string> {
    const candidate = await this.getCandidate(params.candidateId);

    const document = CandidateDocument.create(
      UniqueId.fromString(params.candidateId),
      params.fileUrl
    );

    await this.documentRepository.save(document);

    return document.id.toString();
  }

  async deleteDocument(params: { documentId: string }): Promise<void> {
    await this.documentRepository.delete(params.documentId);
  }

  async getCandidate(candidateId: string): Promise<Candidate> {
    const candidate = await this.candidateRepository.findById(candidateId);
    if (!candidate) {
      throw new Error(`Кандидат с ID ${candidateId} не найден`);
    }
    return candidate;
  }

  private async publishDomainEvents(aggregate: Candidate): Promise<void> {
    const events = aggregate.domainEvents;
    if (events.length > 0) {
      await this.eventPublisher.publishAll([...aggregate.domainEvents]);
      aggregate.clearDomainEvents();
    }
  }
}
