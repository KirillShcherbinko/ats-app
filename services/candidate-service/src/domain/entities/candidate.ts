import { AggregateRoot } from "../../shared/domain/aggregate-root";
import { UniqueId } from "../../shared/kernel/unique-id";
import {
  ECandidateStatus,
  validateCandidateStatus,
} from "../enums/candidate-status";
import { FullName } from "../value-objects/full-name";
import { Email } from "../value-objects/email";
import { Phone } from "../value-objects/phone";
import { Content } from "../value-objects/content";
import { CandidateCreatedEvent } from "../events/candidate-created";
import { CandidateStatusChangedEvent } from "../events/candidate-status-changed";
import { CandidateInfoUpdatedEvent } from "../events/candidate-info-updated";
import {
  ICandidateProps,
  ICreateCandidateParams,
  ICandidateHistoryItem,
} from "./types";
import { FileUrl } from "../value-objects/file-url";
import { CandidateDeletedEvent } from "../events/candidate-deleted";
import { DomainEvent } from "../../shared/domain/domain-event";

export class Candidate extends AggregateRoot<
  ICandidateProps,
  DomainEvent<any>
> {
  constructor(props: ICandidateProps, id?: UniqueId) {
    super(props, id);
  }

  static create(params: ICreateCandidateParams): Candidate {
    const fullName = FullName.create(
      params.firstName,
      params.lastName,
      params.patronymic ?? null
    );
    const email = Email.create(params.email);
    const phone = params.phone ? Phone.create(params.phone) : null;
    const description = params.description
      ? Content.create(params.description)
      : null;
    const photoUrl = params.photoUrl ? FileUrl.create(params.photoUrl) : null;

    const candidate = new Candidate({
      fullName,
      email,
      phone: phone ?? undefined,
      status: ECandidateStatus.NEW,
      photoUrl: photoUrl ?? undefined,
      description: description ?? undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      history: [],
    });

    candidate.apply(
      new CandidateCreatedEvent({
        candidateId: candidate.id.toString(),
        firstName: candidate.fullName.firstName,
        lastName: candidate.fullName.lastName,
        email: candidate.email.value,
        status: candidate.status,
      })
    );

    return candidate;
  }

  changeStatus(newStatus: string, reason?: string): void {
    const validatedStatus = validateCandidateStatus(newStatus);

    if (this.props.status === validatedStatus) {
      return;
    }

    const oldStatus = this.props.status;
    this.props.status = validatedStatus;
    this.props.updatedAt = new Date();

    this.addHistoryItem("STATUS_CHANGED", {
      oldStatus,
      newStatus: validatedStatus,
      reason,
    });

    this.apply(
      new CandidateStatusChangedEvent({
        candidateId: this.id.toString(),
        oldStatus,
        newStatus: validatedStatus,
        reason,
      })
    );
  }

  update(data: {
    firstName?: string;
    lastName?: string;
    patronymic?: string | null;
    email?: string;
    phone?: string | null;
    photoUrl?: string | null;
    description?: string | null;
  }): void {
    let hasChanges = false;

    const changes: Record<string, unknown> = {};

    // CONTACT
    if (data.email) {
      const newEmail = Email.create(data.email);
      if (!this.props.email.equals(newEmail)) {
        this.props.email = newEmail;
        changes.email = newEmail.value;
        hasChanges = true;
      }
    }

    if (data.phone) {
      const newPhone = Phone.create(data.phone);
      if (!this.props.phone || !this.props.phone.equals(newPhone)) {
        this.props.phone = newPhone;
        changes.phone = newPhone.value;
        hasChanges = true;
      }
    }

    // FULL NAME
    if (data.firstName || data.lastName || data.patronymic !== undefined) {
      const newFullName = FullName.create(
        data.firstName ?? this.props.fullName.firstName,
        data.lastName ?? this.props.fullName.lastName,
        data.patronymic ?? this.props.fullName.patronymic
      );

      if (!this.props.fullName.equals(newFullName)) {
        this.props.fullName = newFullName;
        changes.fullName = newFullName.value;
        hasChanges = true;
      }
    }

    // DESCRIPTION
    if (data.description !== undefined) {
      const newDescription = data.description
        ? Content.create(data.description)
        : undefined;

      if (
        (!this.props.description && newDescription) ||
        (this.props.description && !newDescription) ||
        (this.props.description &&
          newDescription &&
          !this.props.description.equals(newDescription))
      ) {
        this.props.description = newDescription;
        changes.description = newDescription?.value;
        hasChanges = true;
      }
    }

    if (!hasChanges) return;

    this.props.updatedAt = new Date();

    this.addHistoryItem("PROFILE_UPDATED", changes);

    this.apply(
      new CandidateInfoUpdatedEvent({
        candidateId: this.id.toString(),
        ...changes,
      })
    );
  }

  delete(reason?: string): void {
    this.apply(
      new CandidateDeletedEvent({
        candidateId: this.id.toString(),
        reason,
      })
    );
  }

  private addHistoryItem(
    eventType: string,
    payload: Record<string, unknown>
  ): void {
    this.props.history.push({
      id: UniqueId.create().toString(),
      eventType,
      payload,
      createdAt: new Date(),
    });
  }

  // Геттеры с явными типами возвращаемых значений
  get fullName(): FullName {
    return this.props.fullName;
  }

  get email(): Email {
    return this.props.email;
  }

  get phone(): Phone | undefined {
    return this.props.phone;
  }

  get status(): ECandidateStatus {
    return this.props.status;
  }

  get photoUrl(): FileUrl | undefined {
    return this.props.photoUrl;
  }

  get description(): Content | undefined {
    return this.props.description;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get history(): ReadonlyArray<ICandidateHistoryItem> {
    return [...this.props.history];
  }
}
