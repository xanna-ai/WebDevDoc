import dataProjects from './data.json'
import { IProject } from '../models/ITechReq'

/**
 * Функция, которая загружает данные из localStorage,
 * если в localStorage ничего нет - загружаем из файла json
 * и сохраняем это в localStorage
 */
export const getData = (): IProject[] => {
    const data = localStorage.getItem('projects')
    if (data) return JSON.parse(data) as IProject[]
    setData(dataProjects.projects)
    return dataProjects.projects
}

/**
 * Функция для сохранения всех изменений в localStorage
 * @param data - данные для сохранения
 */
export const setData = (data: IProject[]): void => {
    if (data.length) {
        localStorage.setItem('projects', JSON.stringify(data))
    } else {
        localStorage.removeItem('projects')
    }
}

/**
 * Функция для сохранения выбранного проекта
 * @param data - данные для сохранения
 */
export const saveProject = (data: IProject): void => {
    const currentData = getData().filter(p => p.id !== data.id)
    currentData.unshift(data)
    setData(currentData)
}

/**
 * Функция для получения данных по выбранному проекту
 * @param id - уникальный ид проекта
 */
export const getProjectData = (id: number): IProject | null => {
    const data = getData()
    if (data) {
        const result = data.filter(project => project.id === id)
        return result.length > 0 ? result[0] : null
    } else {
        return null
    }
}