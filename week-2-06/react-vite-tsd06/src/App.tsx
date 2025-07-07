

import './App.css'
import ListCustomer from './components/ListCustomer'
import WeatherApp from './components/WeatherApp'
// import CreateCustomer from './components/CreateCustomer'

function App() {

  return (
    <>
      {/* <CreateCustomer onCreated={handleOnCreated} /> */}
      <ListCustomer />
      <WeatherApp />
    </>
  )
}

export default App
