import { ECandidateStatus } from "../enums/candidate-status";
import { FullName } from "../value-objects/full-name";
import { Email } from "../value-objects/email";
import { Phone } from "../value-objects/phone";
import { Content } from "../value-objects/content";
import { FileUrl } from "../value-objects/file-url";
import { UniqueId } from "../../shared/kernel/unique-id";

export interface ICandidateHistoryItem {
  id: string;
  eventType: string;
  payload: Record<string, unknown>;
  createdAt: Date;
}

export interface ICandidateProps {
  fullName: FullName;
  email: Email;
  phone?: Phone;
  status: ECandidateStatus;
  photoUrl?: FileUrl;
  description?: Content;
  createdAt: Date;
  updatedAt: Date;
  history: ICandidateHistoryItem[];
}

export interface ICreateCandidateParams {
  firstName: string;
  lastName: string;
  patronymic: string | null;
  email: string;
  phone: string | null;
  photoUrl: string | null;
  description: string | null;
}

export interface ICandidateNoteProps {
  candidateId: UniqueId;
  authorId: UniqueId;
  content: Content;
  createdAt: Date;
}

export interface ICandidateDocumentProps {
  candidateId: UniqueId;
  fileUrl: FileUrl;
  uploadedAt: Date;
}
