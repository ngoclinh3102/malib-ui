import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Stack } from '@mui/material'
import UndoRoundedIcon from '@mui/icons-material/UndoRounded'
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded'
import { boards } from '../../stores/sodokupuzzle'
import { checkValidSodoku, solveSodoku } from '../../utils/sodoku'

const INIT_BOARD = boards[1]

const NUMBER_PAD = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const stack = []

const COLOR = {
  selectedBg: '#E3F4F4',
  errorText: '#CD1818',
  inputText: '#8EA7E9',
  selectedBorder: '#71C9CE'
}

const Sodoku = () => {
  const [board, setBoard] = useState(INIT_BOARD.map((row) => [...row]))
  const [selected, setSelected] = useState({ i: -1, j: -1 })
  const [errors, setErrors] = useState(new Set())

  const handleSelectCell = (i, j) => {
    setSelected({ i, j })
  }

  const handleChooseNumber = (num) => {
    const { i, j } = selected
    if (i === -1 || j === -1) return

    saveHistory(i, j, board[i][j])

    const newBoard = [...board]
    newBoard[i][j] = num
    setBoard(newBoard)
  }

  const handleDeleteValue = () => {
    const { i, j } = selected
    if (i === -1 || j === -1) return

    saveHistory(i, j, board[i][j])

    const newBoard = [...board]
    newBoard[i][j] = 0
    setBoard(newBoard)
  }

  const saveHistory = (i, j, value) => {
    stack.push({ i, j, value })
    while (stack.length > 100) stack.shift()
  }

  const handleUndo = () => {
    if (stack.length === 0) return
    const { i, j, value } = stack.pop()

    if (selected.i !== i || selected.j !== j) {
      setSelected({ i, j })
      stack.push({ i, j, value })
      return
    }

    const newBoard = [...board]
    newBoard[i][j] = value
    setBoard(newBoard)
  }

  const getColor = (i, j) => {
    return INIT_BOARD[i][j] !== 0 ? 'black' : errors.has('' + i + j) ? COLOR.errorText : COLOR.inputText
  }

  const getBgColor = (i, j) => {
    return i === selected.i || j === selected.j ? COLOR.selectedBg : 'white'
  }

  const getInsideCellBorder = (i, j) => {
    return `4px solid ${
      selected.i === i && selected.j === j
        ? COLOR.selectedBorder
        : i === selected.i || j === selected.j
        ? COLOR.selectedBg
        : 'white'
    }`
  }

  const autoSolve = () => {
    const solvedBoard = solveSodoku(board.map((row) => [...row]))
    setBoard(solvedBoard)
  }

  useEffect(() => {
    setErrors(checkValidSodoku(board))
  }, [board])

  return (
    <Box display='flex' flexDirection='row' sx={{ pt: '100px', pl: '400px' }}>
      <Grid container sx={{ width: '600px', height: '600px', mr: '100px', border: '1px solid black' }}>
        {board.map((row, i) => {
          return board[i].map((cell, j) => {
            return (
              <Grid
                key={9 * i + j}
                xs={12 / 9}
                borderTop={`${i === 0 ? 3 : 1}px solid black`}
                borderLeft={`${j === 0 ? 3 : 1}px solid black`}
                borderRight={`${j % 3 === 2 ? 3 : 1}px solid black`}
                borderBottom={`${i % 3 === 2 ? 3 : 1}px solid black`}
              >
                <Stack
                  onClick={() => handleSelectCell(i, j)}
                  sx={{
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                    width: '100%',
                    height: '64px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: () => getColor(i, j),
                    bgcolor: () => getBgColor(i, j),
                    border: () => getInsideCellBorder(i, j),
                    fontWeight: 666,
                    fontSize: '2.4rem'
                  }}
                >
                  {board[i][j] || ''}
                </Stack>
              </Grid>
            )
          })
        })}
      </Grid>

      <Grid container spacing={2} sx={{ width: '240px', height: '420px' }}>
        <Grid item xs={8}>
          <Stack
            onClick={handleDeleteValue}
            sx={{
              cursor: 'pointer',
              width: '100%',
              height: '100%',
              bgcolor: '#B4CFB0',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 666,
              fontSize: '1.8rem',
              ':hover': {
                bgcolor: '#94B49F'
              },
              ':active': {
                bgcolor: '#789395'
              }
            }}
          >
            <BackspaceRoundedIcon fontSize='large' />
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack
            onClick={handleUndo}
            sx={{
              cursor: 'pointer',
              width: '100%',
              height: '100%',
              bgcolor: '#B4CFB0',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 666,
              fontSize: '1.8rem',
              ':hover': {
                bgcolor: '#94B49F'
              },
              ':active': {
                bgcolor: '#789395'
              }
            }}
          >
            <UndoRoundedIcon fontSize='large' />
          </Stack>
        </Grid>
        {NUMBER_PAD.map((number) => {
          return (
            <Grid item key={number} xs={4}>
              <Stack
                onClick={() => handleChooseNumber(number)}
                sx={{
                  cursor: 'pointer',
                  width: '100%',
                  height: '100%',
                  bgcolor: '#B4CFB0',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 666,
                  fontSize: '1.8rem',
                  ':hover': {
                    bgcolor: '#94B49F'
                  },
                  ':active': {
                    bgcolor: '#B4CFB0'
                  }
                }}
              >
                {number}
              </Stack>
            </Grid>
          )
        })}
        <Grid item xs={12}>
          <Stack
            sx={{
              cursor: 'pointer',
              width: '100%',
              height: '100%',
              bgcolor: '#B9D7EA',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 666,
              fontSize: '1.8rem',
              ':hover': {
                bgcolor: '#769FCD'
              },
              ':active': {
                bgcolor: '#B9D7EA'
              }
            }}
          >
            Check
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack
            onClick={autoSolve}
            sx={{
              cursor: 'pointer',
              width: '100%',
              height: '100%',
              bgcolor: '#B9D7EA',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 666,
              fontSize: '1.8rem',
              ':hover': {
                bgcolor: '#769FCD'
              },
              ':active': {
                bgcolor: '#B9D7EA'
              }
            }}
          >
            Auto Solve
          </Stack>
        </Grid>
      </Grid>

    </Box>
  )
}

export default React.memo(Sodoku)
