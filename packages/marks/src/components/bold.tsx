import { createYooptaMark, YooptaMarkProps } from '@yoopta/editor';

type BoldMarkProps = YooptaMarkProps<'bold', boolean>;

export const Bold = createYooptaMark<BoldMarkProps>({
  type: 'bold',
  hotkey: 'mod+b',
  render: (props) => <strong className="yoo-marks-bold">{props.children}</strong>,
});
