import './styles/app.scss'
import data from './util'

import { Player } from './components/Player'
import { IData, Song } from './components/Song'
import React, { useState } from 'react'
import { Library } from './components/Library'

function App() {
  const [songs, setSong] = useState(data())
  const [currentSong, setCurrentSong] = useState<IData>(songs[0])
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  return (
    <div>
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <Library songs={songs} setCurrentSong={setCurrentSong} />
    </div>
  )
}

export default App
