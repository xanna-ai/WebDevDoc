/**
 * Интерфейс для описания модели проекта
 */
export interface IProject {
    id: number      // уникальный номер
    name: string    // наименование проекта
    files: IFile[]  // список файлов в проекте
}

/**
 * Интерфейс для описания модели файла
 */
export interface IFile {
    id: number          // уникальный номер
    name: string        // наименование файла
    rows: ITechReqRow[] // список строк в файле
}

/**
 * Интерфейс для описания модели строки
 */
export interface ITechReqRow {
    id: string              // уникальный номер
    type: string            // тип строки - строка, таблица или картинка
    value: string           // содержимое строки
    styles: IFormatText     // стили строки
    children: ITechReqRow[] // список дочерних строк
    link: IDataLink[],      // список связей
    tableData?: {
        col1: string,
        col2: string,
        col3: string,
        col4: string
    }[]                     // массив данных для таблицы, необязательный параметр, только если строка является таблицей
}

/**
 * Интерфейс для описания модели стиля строки
 */
export interface IFormatText {
    bold: boolean       // насыщенность шрифта
    italic: boolean     // наклон шрифта
    underline: boolean  // подчеркнутость
    left: boolean       // выровнить влево
    center: boolean     // выровнить по центру
    right: boolean      // выровнить вправо
}

/**
 * Интерфейс для описания модели связи
 */
export interface IDataLink {
    fileId: number  // ид файла
    rowId: string   // ид строки
}