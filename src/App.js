import { Stack } from '@mui/material'
import { GithubFinder, MusicPlayer, Sodoku } from './pages'
import { Header } from './components'

const App = () => {
	return (
		<Stack sx={{ width: '100%', maxWidth: '1920px' }}>
			<Header />
			{false && <Sodoku />}
			{false && <MusicPlayer />}
			{true && <GithubFinder />}
		</Stack>
	)
}

export default App
