export interface ICandidateCreatedEventPayload {
  candidateId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
}

export interface ICandidateStatusChangedEventPayload {
  candidateId: string;
  oldStatus: string;
  newStatus: string;
  reason?: string;
}

export interface ICandidateNoteAddedEventPayload {
  candidateId: string;
  noteId: string;
  authorId: string;
  content: string;
}

export interface ICandidateDocumentAddedEventPayload {
  candidateId: string;
  documentId: string;
  fileUrl: string;
}

export interface ICandidateInfoUpdatedEventPayload {
  candidateId: string;
  firstName?: string;
  lastName?: string;
  patronymic?: string;
  email?: string;
  phone?: string;
  description?: string;
}
