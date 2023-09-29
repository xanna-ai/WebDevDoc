import { v4 as uuidv4 } from 'uuid'

import { ITechReqRow } from '../models/ITechReq'

export const getEmptySection = (type: 'str' | 'txt'): ITechReqRow => {
    return {
        id: uuidv4(),
        type: type,
        value: '',
        styles: {
            bold: false,
            italic: false,
            underline: false,
            left: false,
            center: false,
            right: false
        },
        link: [],
        children: []
    }
}

export const getEmptyImg = (path: string): ITechReqRow => {
    return {
        id: uuidv4(),
        type: 'img',
        value: path,
        styles: {
            bold: false,
            italic: false,
            underline: false,
            left: false,
            center: false,
            right: false
        },
        link: [],
        children: []
    }
}

export const getEmptyTable = (): ITechReqRow => {
    return {
        id: uuidv4(),
        type: 'table',
        value: '',
        styles: {
            bold: false,
            italic: false,
            underline: false,
            left: false,
            center: false,
            right: false
        },
        link: [],
        children: [],
        tableData: [
            { col1: '1', col2: '2', col3: '3', col4: '4' },
            { col1: '5', col2: '6', col3: '7', col4: '8' },
            { col1: '9', col2: '10', col3: '11', col4: '12' },
            { col1: '13', col2: '14', col3: '15', col4: '16' },
        ]
    }
}