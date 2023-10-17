import { Stack } from '@mui/material'
import { Sodoku } from './pages'
import { Header } from './components'

const App = () => {
  return (
    <Stack sx={{ width: '100%', maxWidth: '1920px' }}>
      <Header />
      <Sodoku />
    </Stack>
  )
}

export default App
