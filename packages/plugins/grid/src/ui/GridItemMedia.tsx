import { PluginElementRenderProps } from '@yoopta/editor';
import cn from 'classnames';
import { UploadIcon } from 'lucide-react';
import { GridItemMediaElement, GridItemMediaElementProps } from '../types';

const GridItemMediaRender = ({ element, attributes, children }: PluginElementRenderProps<GridItemMediaElement>) => {
  const {
    fit = 'cover',
    alt,
    src = 'https://media.licdn.com/dms/image/v2/D4E16AQEOmztsQ4uujA/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1733144006529?e=1740009600&v=beta&t=ObyVQ_Bh9U44SJAeMbGCKl3KU4VyxMNytkDbNg2k5VY',
  } = element.props as GridItemMediaElementProps;

  return (
    <div
      {...attributes}
      contentEditable={false}
      draggable={false}
      className={cn('yoo-grid-relative yoo-grid-overflow-hidden')}
    >
      {typeof src === 'string' && src.length !== 0 ? (
        <img
          contentEditable={false}
          src={src}
          alt={alt}
          className={cn('yoo-grid-w-full yoo-grid-h-48', {
            'yoo-grid-object-cover': fit === 'cover',
            'yoo-grid-object-contain': fit === 'contain',
          })}
          decoding="async"
          loading="lazy"
        />
      ) : (
        <div className="yoo-grid-flex yoo-grid-items-center yoo-grid-justify-center yoo-grid-w-full yoo-grid-h-48 yoo-grid-bg-gray-100 yoo-grid-border-b-2 yoo-grid-border-gray-200">
          <UploadIcon className="yoo-grid-w-6 yoo-grid-h-6 yoo-grid-text-gray-400" />
        </div>
      )}
      {children}
    </div>
  );
};

export { GridItemMediaRender };
