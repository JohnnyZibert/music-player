import React from 'react'

export interface IData {
  name: string
  artist: string
  cover: string
  id: string
  active: boolean
  color: string[]
  audio: string
}
export interface ICurrentSong {
  currentSong: IData
}

export const Song = ({ currentSong }: ICurrentSong) => {
  return (
    <div className="song-container">
      <img src={currentSong.cover} alt="ImgSong" />
      <h1>{currentSong.name}</h1>
      <h3>{currentSong.artist}</h3>
    </div>
  )
}
