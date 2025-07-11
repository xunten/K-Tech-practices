
import { Bounce, ToastContainer } from 'react-toastify'
import './App.css'
import ToDoApp from './ToDoApp'

function App() {

  return (
    <>
      <ToDoApp />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  )
}

export default App
