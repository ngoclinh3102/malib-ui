import React, { useEffect, useState } from 'react'
import useSound from 'use-sound'

import PauseCircleIcon from '@mui/icons-material/PauseCircle'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Slider from '@mui/material/Slider'
import Stack from '@mui/material/Stack'

import { secondToTime } from '../../utils/helpers'

import audio from '../../assets/audio/taytraichitrang.mp3'

const MusicPlayer = () => {
	const [play, { pause, duration, sound }] = useSound(audio)
	const [isPlaying, setIsPlaying] = useState(false)
	const [seconds, setSeconds] = useState(0)

	const playingButton = () => {
		if (isPlaying) {
			pause()
			setIsPlaying(false)
		} else {
			play()
			setIsPlaying(true)
		}
	}

	const setTime = (e) => {
		const sec = e?.target?.value || 10
		setSeconds(sec)
		sound.seek([sec])
	}

	useEffect(() => {
		setInterval(() => {
			if (sound) {
				setSeconds(parseInt(sound.seek([])))
			}
		}, 1000)
	}, [sound])

	useEffect(() => {
		setSeconds(0)
	}, [])

	return (
		<Stack>
			<h1>Playing</h1>
			<Stack sx={{ width: '50%', margin: 'auto' }}>
				<Slider
					size='small'
					min={0}
					max={parseInt(duration / 1000)}
					value={seconds}
					onChange={setTime}
					valueLabelDisplay='auto'
				/>
				<Stack direction='row' justifyContent='space-between'>
					<Typography>{secondToTime(seconds)}</Typography>
					<Typography>{secondToTime(parseInt(duration / 1000))}</Typography>
				</Stack>
				<Stack>
					<IconButton onClick={playingButton}>{isPlaying ? <PauseCircleIcon /> : <PlayCircleIcon />}</IconButton>
				</Stack>
			</Stack>
		</Stack>
	)
}

export default React.memo(MusicPlayer)
