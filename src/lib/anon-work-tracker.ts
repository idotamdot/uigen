// Tracks anonymous work across the magic-link round trip.
import {
  ChatMessage,
  anonymousWorkSchema,
  SerializedFileSystem,
} from "@/lib/data-schemas";

const STORAGE_KEY = "uigen_has_anon_work";
const DATA_KEY = "uigen_anon_data";

export function setHasAnonWork(
  messages: ChatMessage[],
  fileSystemData: SerializedFileSystem
) {
  if (typeof window === "undefined") return;

  if (messages.length > 0 || Object.keys(fileSystemData).length > 1) {
    localStorage.setItem(STORAGE_KEY, "true");
    localStorage.setItem(DATA_KEY, JSON.stringify({ messages, fileSystemData }));
  }
}

export function getHasAnonWork(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEY) === "true";
}

export function getAnonWorkData(): {
  messages: ChatMessage[];
  fileSystemData: SerializedFileSystem;
} | null {
  if (typeof window === "undefined") return null;

  const data = localStorage.getItem(DATA_KEY);
  if (!data) return null;

  try {
    const raw: unknown = JSON.parse(data);
    const parsed = anonymousWorkSchema.safeParse(raw);
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export function clearAnonWork() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(DATA_KEY);
}
