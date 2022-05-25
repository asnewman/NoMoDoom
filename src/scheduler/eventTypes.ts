interface ArchiveEvent {
  service: string;
  subservice?: string;
}

interface EmailEvent {
  email: string;
}

export { ArchiveEvent, EmailEvent };
