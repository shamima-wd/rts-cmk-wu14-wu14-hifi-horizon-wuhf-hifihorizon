import { RouterProvider } from "react-router"
import "./Styles/Main.sass"
import { router } from "./Pages/Router/Router"

function App() {

  return <RouterProvider router={router} />
}

export default App
