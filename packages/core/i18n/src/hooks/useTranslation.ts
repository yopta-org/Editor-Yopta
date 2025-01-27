import { useYooptaEditor } from '@yoopta/editor';

export function useTranslation() {
  const editor = useYooptaEditor();
  return { t: editor.getLabelText };
}
