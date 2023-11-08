import { Stack } from '@mui/material'
import { MusicPlayer, Sodoku } from './pages'
import { Header } from './components'

const App = () => {
	return (
		<Stack sx={{ width: '100%', maxWidth: '1920px' }}>
			<Header />
			{false && <Sodoku />}
			{true && <MusicPlayer />}
		</Stack>
	)
}

export default App
