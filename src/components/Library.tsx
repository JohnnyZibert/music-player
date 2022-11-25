import { LibrarySong } from './LibrarySong'
import { ICurrentSong, IData } from './Song'
import { Dispatch, SetStateAction } from 'react'

export interface ISongData {
  songs: {
    name: string
    artist: string
    cover: string
    id: string
    active: boolean
    color: string[]
    audio: string
  }[]
  setCurrentSong: Dispatch<SetStateAction<IData>>
}

export const Library = ({ songs, setCurrentSong }: ISongData) => {
  return (
    <div className="library">
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song: any) => (
          <LibrarySong
            song={song}
            songs={songs}
            setCurrentSong={setCurrentSong}
            id={song.id}
            key={song.id}
          />
        ))}
      </div>
    </div>
  )
}
