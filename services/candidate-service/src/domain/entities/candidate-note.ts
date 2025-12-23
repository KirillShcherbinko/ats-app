import { Entity } from "../../shared/domain/entity";
import { UniqueId } from "../../shared/kernel/unique-id";
import { Content } from "../value-objects/content";
import { ICandidateNoteProps } from "./types";

export class CandidateNote extends Entity<ICandidateNoteProps> {
  constructor(props: ICandidateNoteProps, id?: UniqueId) {
    super(props, id);
  }

  static create(
    candidateId: UniqueId,
    authorId: UniqueId,
    content: string
  ): CandidateNote {
    return new CandidateNote({
      candidateId,
      authorId,
      content: Content.create(content),
      createdAt: new Date(),
    });
  }

  get candidateId(): UniqueId {
    return this.props.candidateId;
  }

  get authorId(): UniqueId {
    return this.props.authorId;
  }

  get content(): Content {
    return this.props.content;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
