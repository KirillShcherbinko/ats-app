import { CandidateMapper, CandidateDTO } from "../dtos/candidate";
import { CandidateNoteMapper, CandidateNoteDTO } from "../dtos/candidate-note";
import {
  CandidateDocumentMapper,
  CandidateDocumentDTO,
} from "../dtos/candidate-document";
import { IPaginatedResult } from "../types";
import {
  ICandidateRepository,
  ICandidateNoteRepository,
  ICandidateDocumentRepository,
} from "../../domain/repositories/types";

export class CandidateQueryService {
  constructor(
    private readonly candidateRepository: ICandidateRepository,
    private readonly noteRepository: ICandidateNoteRepository,
    private readonly documentRepository: ICandidateDocumentRepository
  ) {}

  async getCandidate(candidateId: string): Promise<CandidateDTO> {
    const candidate = await this.candidateRepository.findById(candidateId);
    if (!candidate) {
      throw new Error(`Кандидат с ID ${candidateId} не найден`);
    }
    return CandidateMapper.toDTO(candidate);
  }

  async listCandidates(params: {
    candidateIds?: string[];
    page: number;
    limit: number;
    searchQuery?: string;
  }): Promise<IPaginatedResult<CandidateDTO>> {
    const candidates = await this.candidateRepository.findAll(
      params.candidateIds ?? [],
      params.page,
      params.limit,
      params.searchQuery
    );

    // В реальном приложении здесь был бы запрос для получения общего количества
    // Для примера будем считать, что у нас есть метод getTotalCount
    const total = candidates.length; // Это упрощение, нужно реализовать отдельный метод

    return {
      data: CandidateMapper.toDTOList(candidates),
      total,
      page: params.page,
      limit: params.limit,
      totalPages: Math.ceil(total / params.limit),
    };
  }

  async getCandidateNotes(params: {
    candidateId: string;
    page: number;
    limit: number;
  }): Promise<IPaginatedResult<CandidateNoteDTO>> {
    const notes = await this.noteRepository.findByCandidateId(
      params.candidateId,
      params.page,
      params.limit
    );

    const total = notes.length; // Упрощение, нужен отдельный метод для подсчета

    return {
      data: CandidateNoteMapper.toDTOList(notes),
      total,
      page: params.page,
      limit: params.limit,
      totalPages: Math.ceil(total / params.limit),
    };
  }

  async getCandidateNote(noteId: string): Promise<CandidateNoteDTO> {
    const note = await this.noteRepository.findById(noteId);
    if (!note) {
      throw new Error(`Заметка с ID ${noteId} не найдена`);
    }
    return CandidateNoteMapper.toDTO(note);
  }

  async getCandidateDocuments(
    candidateId: string
  ): Promise<CandidateDocumentDTO[]> {
    const documents = await this.documentRepository.findByCandidateId(
      candidateId
    );
    return CandidateDocumentMapper.toDTOList(documents);
  }

  async getCandidateDocument(
    documentId: string
  ): Promise<CandidateDocumentDTO> {
    const document = await this.documentRepository.findById(documentId);
    if (!document) {
      throw new Error(`Документ с ID ${documentId} не найден`);
    }
    return CandidateDocumentMapper.toDTO(document);
  }
}
