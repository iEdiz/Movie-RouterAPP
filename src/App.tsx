import { Nav } from './components/Nav/Nav.tsx'
import { RouterProvider } from './router/route.tsx'
import './index.css'

const App = () => {
  return (
    <>
      <Nav />
      <RouterProvider />
    </>
  )
}

export default App
