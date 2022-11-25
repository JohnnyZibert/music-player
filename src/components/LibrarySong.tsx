import React, {
  DetailedHTMLProps,
  Dispatch,
  HTMLAttributes,
  MouseEventHandler,
  SetStateAction,
} from 'react'
import { IData } from './Song'

interface IProps {
  songs: IData[]
  setCurrentSong: Dispatch<SetStateAction<IData>>
  id: string
  song: IData
}

export const LibrarySong = ({ song, songs, setCurrentSong, id }: IProps) => {
  const selectTrack = songs.filter((state) => state.id === id)
  const selectHandler = () => {
    setCurrentSong(selectTrack[0])
  }

  return (
    <div onClick={selectHandler} className="library-song">
      <img src={song.cover} alt="ImgSong" />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  )
}
