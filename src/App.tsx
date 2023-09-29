import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'

import './App.css'
import { ManagerPage, ProjectPage } from './pages'

/**
 * Главный файл приложения
 * здесь у нас стартует приложение и распределяет запросы
 * в зависимости от строки запроса загружаем разные страницы
 */
function App() {
  return (
      <HashRouter>
        <Routes>
          <Route path='/' element={<ManagerPage />} />
          <Route path='project/:id' element={<ProjectPage />} />
        </Routes>
      </HashRouter>
  )
}

export default App