import { PluginElementRenderProps, useBlockData, useYooptaEditor, useYooptaReadOnly } from '@yoopta/editor';
import { CALLOUT_THEME_STYLES } from '../utils';
import { CalloutBlockOptions } from './CalloutBlockOptions';

const CalloutRender = ({ element, attributes, children, blockId }: PluginElementRenderProps) => {
  const block = useBlockData(blockId);
  const editor = useYooptaEditor();
  const isReadOnly = useYooptaReadOnly();
  const { theme = 'default' } = element.props || {};
  const styles = CALLOUT_THEME_STYLES[theme];

  return (
    <div
      data-element-type={element.type}
      {...attributes}
      style={styles}
      className={`yoo-c-rounded-md yoo-c-mt-2 yoo-c-p-2 yoo-c-pl-4 yoo-c-leading-7 yoo-c-bg-info yoo-c-text-info-foreground yoo-c-text-[16px] yoopta-callout yoopta-callout-theme-${theme}`}
    >
      {!isReadOnly && <CalloutBlockOptions block={block} editor={editor} props={element.props} />}
      {children}
    </div>
  );
};

CalloutRender.displayName = 'Callout';

export { CalloutRender };
