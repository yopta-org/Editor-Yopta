import YooptaEditor, {
  YooptaOnChangeOptions,
  YooEditor,
  YooptaContentValue,
  YooptaPath,
  createYooptaEditor,
} from '@yoopta/editor';
import { useMemo, useRef, useState } from 'react';
import { withTranslations } from '@yoopta/i18n';

import { MARKS } from '../../utils/yoopta/marks';
import { YOOPTA_PLUGINS } from '../../utils/yoopta/plugins';
import { TOOLS } from '../../utils/yoopta/tools';
import { FixedToolbar } from '../../components/FixedToolbar/FixedToolbar';
import { YOOPTA_DEFAULT_VALUE } from '@/utils/yoopta/value';

const EDITOR_STYLE = {
  width: 750,
};

const TRANSLATIONS = {
  es: {
    plugins: {
      Paragraph: {
        display: {
          title: 'Párrafo',
          description: 'Párrafo de texto',
        },
      },
      Blockquote: {
        display: {
          title: 'Cita',
          description: 'Bloque de cita',
        },
      },
      Callout: {
        display: {
          title: 'Llamada',
          description: 'Bloque de llamada',
        },
      },
      Accordion: {
        display: {
          title: 'Acordeón',
          description: 'Bloque de acordeón',
        },
      },
      BulletedList: {
        display: {
          title: 'Lista con viñetas',
          description: 'Lista con viñetas',
        },
      },
      NumberedList: {
        display: {
          title: 'Lista numerada',
          description: 'Lista numerada',
        },
      },
      TodoList: {
        display: {
          title: 'Lista de tareas',
          description: 'Lista de tareas',
        },
      },
      Image: {
        display: {
          title: 'Imagen',
          description: 'Imagen',
        },
      },
      Video: {
        display: {
          title: 'Vídeo',
          description: 'Vídeo',
        },
      },
      File: {
        display: {
          title: 'Archivo',
          description: 'Archivo para descargar',
        },
      },
      Table: {
        display: {
          title: 'Tabla',
          description: 'Tabla',
        },
      },
      Code: {
        display: {
          title: 'Código',
          description: 'Bloque de código',
        },
      },
      Divider: {
        display: {
          title: 'Separador',
          description: 'Separador',
        },
      },
      HeadingOne: {
        display: {
          title: 'Título 1',
          description: 'Título de primer nivel',
        },
      },
      HeadingTwo: {
        display: {
          title: 'Título 2',
          description: 'Título de segundo nivel',
        },
      },
      HeadingThree: {
        display: {
          title: 'Título 3',
          description: 'Título de tercer nivel',
        },
      },
    },
    editor: {
      blockOptions: {
        delete: 'Borrar',
        duplicate: 'Duplicar',
        turnInto: 'Convertir en',
        copyBlockLink: 'Copiar enlace al bloque',
      },
      placeholder: "Escribe '/' para comandos",
    },
    tools: {
      toolbar: {
        highlightColor: {
          text: 'Texto',
          background: 'Fondo',
          customColor: 'Color personalizado',
        },
        linkTitle: 'Enlace',
      },
      link: {
        target: 'Objetivo del enlace',
        rel: 'Relación del enlace',
        update: 'Actualizar',
        add: 'Añadir',
        delete: 'Eliminar enlace',
        url: 'URL',
        title: 'Título',
        additionalProps: 'Propiedades adicionales',
        titlePlaceholder: 'Editar título del enlace',
        urlPlaceholder: 'Editar URL del enlace',
        targetPlaceholder: 'Editar objetivo del enlace',
        relPlaceholder: 'Editar relación del enlace',
      },
    },
  },
  ru: {
    editor: {
      blockOptions: {
        delete: 'Удалить',
        duplicate: 'Дублировать',
        turnInto: 'Преобразовать в',
        copyBlockLink: 'Скопировать ссылку на блок',
      },
      placeholder: "Введите '/' для команд",
    },
    plugins: {
      Paragraph: {
        display: {
          title: 'Параграф',
          description: 'Текстовый параграф',
        },
      },
      Blockquote: {
        display: {
          title: 'Цитата',
          description: 'Цитата блока',
        },
      },
      Callout: {
        display: {
          title: 'Вызов',
          description: 'Блок вызова',
        },
      },
      Accordion: {
        display: {
          title: 'Аккордеон',
          description: 'Блок аккордеона',
        },
      },
      BulletedList: {
        display: {
          title: 'Маркированный список',
          description: 'Маркированный список',
        },
      },
      NumberedList: {
        display: {
          title: 'Нумерованный список',
          description: 'Нумерованный список',
        },
      },
      TodoList: {
        display: {
          title: 'Список задач',
          description: 'Список задач',
        },
      },
      Image: {
        display: {
          title: 'Изображение',
          description: 'Изображение',
        },
      },
      Video: {
        display: {
          title: 'Видео',
          description: 'Видео',
        },
      },
      File: {
        display: {
          title: 'Файл',
          description: 'Файл для скачивания',
        },
      },
      Table: {
        display: {
          title: 'Таблица',
          description: 'Таблица',
        },
      },
      Code: {
        display: {
          title: 'Код',
          description: 'Блок кода',
        },
      },
      Divider: {
        display: {
          title: 'Разделитель',
          description: 'Разделитель',
        },
      },
      HeadingOne: {
        display: {
          title: 'Заголовок 1',
          description: 'Заголовок 1 уровня',
        },
      },
      HeadingTwo: {
        display: {
          title: 'Заголовок 2',
          description: 'Заголовок 2 уровня',
        },
      },
      HeadingThree: {
        display: {
          title: 'Заголовок 3',
          description: 'Заголовок 3 уровня',
        },
      },
    },
    tools: {
      toolbar: {
        highlightColor: {
          text: 'Текст',
          background: 'Фон',
          customColor: 'Пользовательский цвет',
        },
        linkTitle: 'Ссылка',
      },
      link: {
        target: 'Цель ссылки',
        rel: 'Рел',
        update: 'Обновить',
        add: 'Добавить',
        delete: 'Удалить ссылку',
        edit: 'Редактировать',
        url: 'URL',
        title: 'Заголовок',
        additionalProps: 'Дополнительные свойства',
        titlePlaceholder: 'Изменить заголовок ссылки',
        urlPlaceholder: 'Изменить URL ссылки',
        targetPlaceholder: 'Изменить цель ссылки',
        relPlaceholder: 'Изменить rel ссылки',
      },
    },
  },
  cz: {
    editor: {
      blockOptions: {
        delete: 'Smazat',
        duplicate: 'Duplikovat',
        turnInto: 'Převést na',
        copyBlockLink: 'Kopírovat odkaz na blok',
      },
      placeholder: "Zadejte '/' pro příkazy",
    },
    tools: {
      toolbar: {
        highlightColor: {
          text: 'Text',
          background: 'Pozadí',
          customColor: 'Vlastní barva',
        },
        linkTitle: 'Odkaz',
      },
      link: {
        target: 'Target',
        rel: 'Rel',
        update: 'Obnovit',
        add: 'Pridat',
        delete: 'Smazat',
        url: 'URL',
        title: 'Titul',
        additionalProps: 'Další vlastnosti',
        titlePlaceholder: 'Upravit titul odkazu',
        urlPlaceholder: 'Upravit URL odkazu',
        targetPlaceholder: 'Upravit cíl odkazu',
        relPlaceholder: 'Upravit rel odkazu',
      },
    },
  },
};

const BasicExample = () => {
  const editor: YooEditor = useMemo(
    () =>
      withTranslations(createYooptaEditor(), {
        translations: TRANSLATIONS,
        defaultLanguage: 'en',
        language: 'ru',
      }),
    [],
  );

  const selectionRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<YooptaContentValue>(YOOPTA_DEFAULT_VALUE);

  const onChange = (value: YooptaContentValue, options: YooptaOnChangeOptions) => {
    console.log('onChange', value, options);
    setValue(value);
  };

  const onPathChange = (path: YooptaPath) => {};

  return (
    <>
      <div className="px-[100px] max-w-[900px] mx-auto my-10 flex flex-col items-center" ref={selectionRef}>
        <FixedToolbar editor={editor} DEFAULT_DATA={YOOPTA_DEFAULT_VALUE} />
        <YooptaEditor
          editor={editor}
          plugins={YOOPTA_PLUGINS}
          selectionBoxRoot={selectionRef}
          marks={MARKS}
          tools={TOOLS}
          style={EDITOR_STYLE}
          value={value}
          onChange={onChange}
          onPathChange={onPathChange}
          autoFocus={true}
          readOnly={false}
        />
      </div>
    </>
  );
};

export default BasicExample;
