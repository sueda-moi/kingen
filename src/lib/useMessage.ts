import { useLocaleStore } from '@/store/useLocaleStore';
import type { MessageFile } from '@/store/useLocaleStore';

export function useMessage() {
  const { messages } = useLocaleStore();

  return <T = string>(file: MessageFile, key: string): T => {
    return (messages[file]?.[key] ?? `[${key}]`) as T;
  };
}
