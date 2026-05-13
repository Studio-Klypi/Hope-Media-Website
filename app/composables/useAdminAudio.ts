import type { InjectionKey, Ref } from "vue";

export interface AdminAudioContext {
  paused: Ref<boolean>;
  toggleSound: () => void;
}

export const AdminAudioKey: InjectionKey<AdminAudioContext> = Symbol("AdminAudio");

export function useAdminAudio(): AdminAudioContext {
  const context = inject(AdminAudioKey);
  if (!context) throw new Error("useAdminAudio must be used within AdminAudioProvider");
  return context;
}
