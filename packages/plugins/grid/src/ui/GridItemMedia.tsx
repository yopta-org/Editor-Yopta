import { PluginElementRenderProps } from '@yoopta/editor';
import cn from 'classnames';
import { GridItemMediaElement } from '../types';

const GridItemMediaRender = ({ element, attributes }: PluginElementRenderProps<GridItemMediaElement>) => {
  const {
    position = 'top',
    fit = 'cover',
    src = 'https://media.licdn.com/dms/image/v2/D4E16AQEOmztsQ4uujA/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1733144006529?e=1740009600&v=beta&t=ObyVQ_Bh9U44SJAeMbGCKl3KU4VyxMNytkDbNg2k5VY',
  } = element.props;

  return (
    <div
      {...attributes}
      contentEditable={false}
      draggable={false}
      className={cn('relative overflow-hidden', {
        // 'order-first': position === 'top',
        // 'order-last': position === 'bottom',
        'absolute inset-0 -z-10': position === 'background',
      })}
    >
      <img
        contentEditable={false}
        src="https://media.licdn.com/dms/image/v2/D4E16AQEOmztsQ4uujA/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1733144006529?e=1740009600&v=beta&t=ObyVQ_Bh9U44SJAeMbGCKl3KU4VyxMNytkDbNg2k5VY"
        alt=""
        className={cn('h-full w-full', {
          'object-cover': fit === 'cover',
          'object-contain': fit === 'contain',
        })}
      />
      {/* 
      {src ? (
        <img
          src={src}
          alt=""
          className={cn('h-full w-full', {
            'object-cover': fit === 'cover',
            'object-contain': fit === 'contain',
          })}
        />
      ) : (
        <div className="flex h-40 w-full items-center justify-center bg-gray-100">
          <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )} */}
    </div>
  );
};

export { GridItemMediaRender };
