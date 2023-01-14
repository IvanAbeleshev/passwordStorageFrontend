import Routing from './components/Routing'
import AuthWrapper from './layouts/AuthWrapper'

function App() {
  return(
    <AuthWrapper>
      <Routing />
    </AuthWrapper>
  ) 
}

export default App
