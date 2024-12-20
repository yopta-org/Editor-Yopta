import React, { memo } from 'react';
import { useYooptaEditor } from '../../contexts/YooptaContext/YooptaContext';
import { useSortable } from '@dnd-kit/sortable';
import { YooptaBlockData } from '../../editor/types';
import { useBlockStyles } from './hooks';
import { Paths } from '../../editor/paths';
import { useSetFocusedElement } from '../../contexts/FocusManager/FocusManager';

type BlockProps = {
  children: React.ReactNode;
  block: YooptaBlockData;
  blockId: string;
  onActiveDragHandleChange: (props: any) => void;
};

const Block = memo(({ children, block, blockId, onActiveDragHandleChange }: BlockProps) => {
  const editor = useYooptaEditor();
  const setFocusElement = useSetFocusedElement();

  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isOver, isDragging } =
    useSortable({ id: blockId, disabled: editor.readOnly });
  const styles = useBlockStyles(block, transform, transition, isDragging, isOver);

  const align = block.meta.align || 'left';
  const className = `yoopta-block yoopta-align-${align}`;

  const isSelected = Paths.isBlockSelected(editor, block);

  const handleMouseEnter = () => {
    if (!editor.readOnly && onActiveDragHandleChange) {
      onActiveDragHandleChange({
        attributes,
        listeners,
        setActivatorNodeRef,
      });
    }
  };

  const onBlur = (event: React.FocusEvent) => {
    setFocusElement(null);
  };

  return (
    <div
      ref={setNodeRef}
      className={className}
      style={styles.container}
      data-yoopta-block
      data-yoopta-block-id={blockId}
      onMouseEnter={handleMouseEnter}
      onBlur={onBlur}
    >
      <div style={styles.content}>{children}</div>
      {isSelected && !editor.readOnly && <div className="yoopta-selection-block" />}
    </div>
  );
});

Block.displayName = 'Block';

export { Block };
