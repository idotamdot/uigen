// Simple utility to track if anonymous user has created work
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
  
  // Only set if there's actual content
  if (messages.length > 0 || Object.keys(fileSystemData).length > 1) { // > 1 because root "/" always exists
    sessionStorage.setItem(STORAGE_KEY, "true");
    sessionStorage.setItem(DATA_KEY, JSON.stringify({ messages, fileSystemData }));
  }
}

export function getHasAnonWork(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(STORAGE_KEY) === "true";
}

export function getAnonWorkData(): {
  messages: ChatMessage[];
  fileSystemData: SerializedFileSystem;
} | null {
  if (typeof window === "undefined") return null;
  
  const data = sessionStorage.getItem(DATA_KEY);
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
  sessionStorage.removeItem(STORAGE_KEY);
  sessionStorage.removeItem(DATA_KEY);
}
