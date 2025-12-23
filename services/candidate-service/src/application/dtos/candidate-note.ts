import { CandidateNote } from "../../domain/entities/candidate-note";

export interface CandidateNoteDTO {
  id: string;
  candidateId: string;
  authorId: string;
  content: string;
  createdAt: Date;
}

export class CandidateNoteMapper {
  static toDTO(note: CandidateNote): CandidateNoteDTO {
    return {
      id: note.id.toString(),
      candidateId: note.candidateId.toString(),
      authorId: note.authorId.toString(),
      content: note.content.value,
      createdAt: note.createdAt,
    };
  }

  static toDTOList(notes: CandidateNote[]): CandidateNoteDTO[] {
    return notes.map((note) => this.toDTO(note));
  }
}
