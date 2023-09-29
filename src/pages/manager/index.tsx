import React, { useEffect, useState } from 'react'
import { AppBar, Box, Card, CssBaseline, Grid, IconButton, Link, styled, Toolbar, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ClearIcon from '@mui/icons-material/Clear'

import { getData, setData } from '../../data/loadData'
import NewItems from '../../components/NewItems'
import { IProject } from '../../models/ITechReq'

const CardTheme = styled(Card)(
    ({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100px',
        cursor: 'pointer',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: '#eee'
        }
    })
)

/**
 * Компонент для отображения менеджера проектов
 * @constructor
 */
const ManagerProjects: React.FC = () => {

    const loadData: IProject[] | null = getData()
    const [ projects, setProjects ] = useState<IProject[]>(loadData ? loadData : [])
    const [ add, setAdd ] = useState<boolean>(false)

    const handlerAdd = (value: string) => {
        if (value) {
            setProjects([...projects, { id: projects.length > 0 ? projects[projects.length - 1].id + 1 : 1, name: value, files: [] }])
        }
        setAdd(!add)
    }

    const handlerClear = () => {
        setData([])
        setProjects(getData())
    }

    useEffect(() => {
        setData(projects)
    }, [projects])

    return (
        <>
            <CssBaseline />
            <Box>
                <AppBar>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" component="div">
                            WebDevDoc
                        </Typography>
                        <IconButton
                            aria-label="upload picture"
                            component="label" sx={{ color: '#fff' }}
                            onClick={handlerClear}
                        >
                            <ClearIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{ mt: 8 }}>
                <Grid container sx={{ height: 'calc(100vh - 64px)', paddingX: '20px', textAlign: 'center' }} spacing={2}>
                    <Grid item xs={2} sx={{ mt: 4 }}>
                        <CardTheme variant="outlined" onClick={() => handlerAdd('')}>
                            <AddIcon />
                        </CardTheme>
                    </Grid>
                    {projects.map(project => (
                        <Grid key={project.id} item xs={2} sx={{ mt: 4, textDecoration: 'none' }}>
                            <Link href={`/#/project/${project.id}`}>
                                <CardTheme variant="outlined">
                                    {project.name}
                                </CardTheme>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            {add && <NewItems handlerAdd={handlerAdd} labelValue={'Введите имя проекта'} />}
        </>
    )
}

export default ManagerProjects