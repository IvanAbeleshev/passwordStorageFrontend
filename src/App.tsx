import Routing from './components/Routing'
import AuthWrapper from './layouts/AuthWrapper'
import Background from './layouts/Background'

function App() {
  return(
    <Background>
      <AuthWrapper>
        <Routing />
      </AuthWrapper>
    </Background>
  ) 
}

export default App
