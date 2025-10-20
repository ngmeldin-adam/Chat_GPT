import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Chat from './pages/Chat.jsx';
import Home from './pages/Home.jsx';
import Dashboardlayout from './Layout/Dashboardlayout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Rootlayout from './Layout/Root.jsx';

import { RouterProvider , createBrowserRouter  } from 'react-router-dom'
import Signup from './pages/Signup.jsx';
import Signin from './pages/Signin.jsx';

const router = createBrowserRouter([
  {
   element:<Rootlayout />,
   children:[
    {
      path:"/",
      element: <Home />,
    },
    {
      path:"/sign-in/*",
      element: <Signin />,
    },
    {
      path:"/sign-up/*",
      element: <Signup/>,
    },
    {
      element:<Dashboardlayout />,
      children:[
        {
          path:"/dashboard",
          element: <Dashboard/>,
        },
        {
          path:"/dashboard/chats/:id",
          element: <Chat/>,
        }
      ]
    }
   ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
