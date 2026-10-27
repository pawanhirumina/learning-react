import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import Counter from './components/Counter'
import Notes from './components/Notes'
import Clock from './components/Clock'



const router = createBrowserRouter([
  {
    path: "/counter",
    element: <Counter />,
  },
  {
    path: "/notes",
    element: <Notes />,
  },
   {
    path: "/clock",
    element: <Clock />,
  },
 ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>
)
