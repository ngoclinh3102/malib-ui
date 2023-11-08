const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const secondToTime = (seconds) => {
	if (seconds > 0) {
		const min = parseInt(seconds / 60)
		const sec = seconds % 60
		return (min < 10 ? '0' : '') + min + ':' + (sec < 10 ? '0' : '') + sec
	}
	return '00:00'
}

export { delay, secondToTime }
