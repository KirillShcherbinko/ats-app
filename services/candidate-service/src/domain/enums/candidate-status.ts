// src/domain/enums/candidate-status.enum.ts
export enum ECandidateStatus {
  NEW = "NEW",
  REVIEW = "REVIEW",
  INTERVIEW = "INTERVIEW",
  TEST_TASK = "TEST_TASK",
  REJECTED = "REJECTED",
  ACCEPTED = "ACCEPTED",
  ON_HOLD = "ON_HOLD",
}

export const CandidateStatusValues = Object.values(
  ECandidateStatus
) as ECandidateStatus[];

export type CandidateStatusType = keyof typeof ECandidateStatus;

export function isCandidateStatus(value: unknown): value is ECandidateStatus {
  return CandidateStatusValues.includes(value as ECandidateStatus);
}

export function validateCandidateStatus(status: string): ECandidateStatus {
  if (!isCandidateStatus(status)) {
    throw new Error(
      `Invalid candidate status: ${status}. Valid values: ${CandidateStatusValues.join(
        ", "
      )}`
    );
  }
  return status;
}
