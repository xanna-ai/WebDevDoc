import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { AppBar, Box, CssBaseline, Grid, IconButton, Link, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'

import NoChoice from './NoChoice'
import TechReq from './tech-req'
import { IFile, IProject, ITechReqRow } from '../../models/ITechReq'
import {getProjectData, saveProject} from '../../data/loadData'
import FileList from './file-list'
import NewItems from '../../components/NewItems'

interface Params {
    id: string
}

const ProjectPage: React.FC = () => {

    const [ add, setAdd ] = useState<boolean>(false)
    const [ choiceFile, setChoiceFile ] = useState<{ fileId: number, sectionId: string }>({ fileId: 0, sectionId: '' })
    const [ fileData, setFileData ] = useState<IFile | null>(null)

    const params = useParams<keyof Params>() as Params
    const [ projectData, setProjectData ] = useState<IProject | null>(getProjectData(Number(params.id)))

    const [ contextMenu, setContextMenu ] = React.useState<{
        mouseX: number
        mouseY: number
    } | null>(null)

    const handleContextMenu = (event: React.MouseEvent) => {
        event.stopPropagation()
        event.preventDefault()
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 6,
                }
                :
                null,
        )
    }

    useEffect(() => {
        if (projectData && choiceFile.fileId) {
            const data = projectData.files.filter(file => file.id === choiceFile.fileId)
            if (data.length > 0) {
                setFileData(data[0])
            } else {
                setFileData(null)
            }
        }
    }, [choiceFile])

    if (!projectData) {
        return <Navigate to='/' replace={true} />
    }

    const handleClose = () => {
        setContextMenu(null)
    }

    const handleFileAdd = (event: React.MouseEvent) => {
        if ((event.target as Element).classList.contains('MuiTreeItem-label')) return
        event.preventDefault()
        handleContextMenu(event)
    }

    const saveChangeFile = (fileId: number, rows: ITechReqRow[]): void => {
        const copyData = [...projectData.files]
        for (let i = 0; i < copyData.length; i++) {
            if (copyData[i].id === fileId) {
                copyData[i].rows = rows
                break
            }
        }
        setProjectData({...projectData, files: copyData})
    }

    const handlerChoiceFile = (id: number): void => {
        setChoiceFile({ fileId: id, sectionId: '' })
    }

    const handlerSelectedSection = (fileId: number, sectionId: string): void => {
        setChoiceFile({ fileId, sectionId })
    }

    const handlerAddFile = (value: string): void => {
        handleClose()
        if (value) {
            const newFile: IFile = { id: projectData.files.length > 0 ? projectData.files[projectData.files.length - 1].id + 1 : 1, name: value, rows: [] }
            const copyData = [...projectData.files, newFile]
            setProjectData({...projectData, files: copyData})
        }
        setAdd(!add)
    }

    return (
        <>
            <CssBaseline />
            <Box>
                <AppBar>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" component="div">
                            <Link href={'/'} sx={{ color: '#fff', textDecoration: 'none' }}>WebDevDoc</Link>
                        </Typography>
                        <IconButton
                            aria-label="upload picture"
                            component="label" sx={{ color: '#fff' }}
                            onClick={() => saveProject(projectData)}
                        >
                            <SaveIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{ mt: 8 }}>
                <Grid container sx={{ height: 'calc(100vh - 64px)' }}>
                    <Grid
                        item
                        xs={3}
                        sx={{ borderRight: '1px solid #eee' }}
                        onContextMenu={handleFileAdd}
                    >
                        {projectData &&
                            <FileList
                                data={projectData}
                                handleChoiceFile={handlerChoiceFile}
                                handlerSelectedSection={handlerSelectedSection}
                            />
                        }
                    </Grid>
                    {!fileData
                        ?
                            <Grid item xs={9}><NoChoice /></Grid>
                        :
                            <Grid item xs={9}>
                                <Grid container>
                                    <TechReq data={fileData} handlerSave={saveChangeFile} selectedSection={choiceFile.sectionId} />
                                </Grid>
                            </Grid>
                    }
                </Grid>
            </Box>
            <Menu
                open={contextMenu !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null
                        ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                        : undefined
                }
            >
                <MenuItem onClick={() => handlerAddFile('')}>Добавить файл</MenuItem>
            </Menu>
            {add && <NewItems handlerAdd={handlerAddFile} labelValue={'Введите имя файла'} />}
        </>
    )
}

export default ProjectPage