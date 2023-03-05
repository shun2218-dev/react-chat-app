import './App.scss'

import React, {Suspense} from 'react'
import {BrowserRouter} from 'react-router-dom'
import {RecoilRoot} from 'recoil'

import Router from '@/routes/router'

import Header from './components/header'

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>loading...</div>}>
        <BrowserRouter>
          <Header />
          <Router />
        </BrowserRouter>
      </Suspense>
    </RecoilRoot>
  )
}

export default App
