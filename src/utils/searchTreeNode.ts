import { IDataLink, IFile, ITechReqRow } from '../models/ITechReq'

/**
 * Рекурсивная функция, которая возвращает ссылку на нужную нам строку,
 * если она найдена или null
 * @param id - уникальный ид строки
 * @param items - список строк для поиска
 */
export const getItem = (id: string, items: ITechReqRow[]): ITechReqRow | null => {
    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item.id === id) {
            return item
        }
        if (Array.isArray(item.children)) {
            const temp = getItem(id, item.children)
            if (temp) return temp
        }
    }
    return null
}

/**
 * Рекурсивная функция, которая возвращает список детей и порядковый номер,
 * который среди них занимает элемент, который мы ищем
 * @param id - уникальный ид строки
 * @param items - список строк для поиска
 */
export const getNode = (id: string, items: ITechReqRow[]): { items: ITechReqRow[], ind: number } | null => {
    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item.id === id) {
            return { items, ind: i }
        }
        if (Array.isArray(item.children)) {
            const temp = getNode(id, item.children)
            if (temp) return temp
        }
    }
    return null
}

/**
 * Рекурсивная функция, которая возвращает список всех родителей элемента
 * @param id - уникальный ид строки
 * @param items - список строк для поиска
 * @param acc - аккумулирующий массив
 */
export const getParents = (id: string, items: ITechReqRow[], acc: string[] = []): string[] => {
    const result: string[] = [...acc]
    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item.id === id) {
            result.push(item.id)
            return result
        }
        if (Array.isArray(item.children)) {
            const temp = getParents(id, item.children, result)
            if (temp.length !== result.length) {
                temp.push(item.id)
                return temp
            }
        }
    }
    return result
}

/**
 * Вспомогательная рекурсивная функция, которая возвращает строку
 * поиск производится среди всех файлов
 * если не найдена - возвращаем null
 * @param files - список файлов
 * @param fileId - уникальный ид файла
 * @param rowId - уникальный ид строки
 */
const getRowFromFiles = (files: IFile[], fileId: number, rowId: string): ITechReqRow | null => {
    const file = files.filter(f => f.id === fileId)
    return file.length ? getItem(rowId, file[0].rows) : null
}

/**
 * Рекурсивная функция, которая возвращает список связей для выбранной строки
 * @param files - список файлов
 * @param fileId - уникальный ид файла
 * @param rowId - уникальный ид строки
 */
export const getLinks = (files: IFile[], fileId: number, rowId: string): IDataLink[] => {
    const row = getRowFromFiles(files, fileId, rowId)
    return row ? [...row.link] : []
}