import { pgTable, text, varchar, timestamp, json, uuid, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Кандидаты
export const candidates = pgTable('candidates', {
  id: uuid('id').defaultRandom().primaryKey(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  patronymic: varchar('patronymic', { length: 100 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phoneNumber: varchar('phone_number', { length: 20 }).notNull(),
  status: varchar('status', { length: 50 }).default('new').notNull(),
  photoUrl: text('photo_url'),
  description: text('description'),
  skills: json('skills').$type<string[]>().default([]),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// История кандидата
export const candidateHistory = pgTable('candidate_history', {
  id: uuid('id').defaultRandom().primaryKey(),
  candidateId: uuid('candidate_id').references(() => candidates.id, { onDelete: 'cascade' }).notNull(),
  eventType: varchar('event_type', { length: 100 }).notNull(),
  payload: json('payload').$type<Record<string, any>>().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Заметки кандидата
export const candidateNotes = pgTable('candidate_notes', {
  id: uuid('id').defaultRandom().primaryKey(),
  candidateId: uuid('candidate_id').references(() => candidates.id, { onDelete: 'cascade' }).notNull(),
  authorId: uuid('author_id').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Документы кандидата
export const candidateDocuments = pgTable('candidate_documents', {
  id: uuid('id').defaultRandom().primaryKey(),
  candidateId: uuid('candidate_id').references(() => candidates.id, { onDelete: 'cascade' }).notNull(),
  fileUrl: text('file_url').notNull(),
  fileName: varchar('file_name', { length: 255 }),
  fileSize: integer('file_size'),
  mimeType: varchar('mime_type', { length: 100 }),
  uploadedAt: timestamp('uploaded_at').defaultNow().notNull(),
});

// Relations
export const candidateRelations = relations(candidates, ({ many }) => ({
  history: many(candidateHistory),
  notes: many(candidateNotes),
  documents: many(candidateDocuments),
}));

export const candidateHistoryRelations = relations(candidateHistory, ({ one }) => ({
  candidate: one(candidates, {
    fields: [candidateHistory.candidateId],
    references: [candidates.id],
  }),
}));

export const candidateNotesRelations = relations(candidateNotes, ({ one }) => ({
  candidate: one(candidates, {
    fields: [candidateNotes.candidateId],
    references: [candidates.id],
  }),
}));

export const candidateDocumentsRelations = relations(candidateDocuments, ({ one }) => ({
  candidate: one(candidates, {
    fields: [candidateDocuments.candidateId],
    references: [candidates.id],
  }),
}));

export type Candidate = typeof candidates.$inferSelect;
export type NewCandidate = typeof candidates.$inferInsert;

export type CandidateHistory = typeof candidateHistory.$inferSelect;
export type NewCandidateHistory = typeof candidateHistory.$inferInsert;

export type CandidateNote = typeof candidateNotes.$inferSelect;
export type NewCandidateNote = typeof candidateNotes.$inferInsert;

export type CandidateDocument = typeof candidateDocuments.$inferSelect;
export type NewCandidateDocument = typeof candidateDocuments.$inferInsert;