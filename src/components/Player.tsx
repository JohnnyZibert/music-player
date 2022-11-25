import {
  faAngleLeft,
  faAngleRight,
  faPlay,
  faPause,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ICurrentSong, IData } from './Song'
import React, { Dispatch, useRef, useState } from 'react'

interface IProps extends ICurrentSong {
  currentSong: IData
  isPlaying: boolean
  setIsPlaying: Dispatch<boolean>
}
interface ISongInfo {
  currentTime: number
  duration: number
}

export const Player = ({ currentSong, isPlaying, setIsPlaying }: IProps) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [songInfo, setSongInfo] = useState<ISongInfo>({
    currentTime: 0,
    duration: 0,
  })
  const checkAudioRef = audioRef.current !== null

  const audioClick = () => {
    if (isPlaying) {
      checkAudioRef && audioRef.current.pause()
      setIsPlaying(!isPlaying)
    } else {
      checkAudioRef && audioRef.current.play()
      setIsPlaying(!isPlaying)
    }
  }

  const getTime = (time: number) => {
    return time
      ? Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
      : '0:00'
  }

  const timeUpdateHandler = (e: any) => {
    const current = e.target.currentTime
    const duration = e.target.duration
    setSongInfo({ ...songInfo, currentTime: current, duration })
  }

  const dragHandler = (e: any) => {
    if (checkAudioRef) {
      audioRef.current.currentTime = e.target.value
    }

    setSongInfo({ ...songInfo, currentTime: e.target.value })
  }

  return (
    <div className="player-container">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          type="range"
          min={0}
          max={songInfo.duration}
          value={songInfo.currentTime}
          onChange={dragHandler}
        />
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon icon={faAngleLeft} size="2x" className="skip-back" />
        <FontAwesomeIcon
          icon={isPlaying ? faPause : faPlay}
          size="2x"
          className="play"
          onClick={audioClick}
        />
        <FontAwesomeIcon
          icon={faAngleRight}
          size="2x"
          className="skip-forward"
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        src={currentSong.audio}
        ref={audioRef}
        onLoadedMetadata={timeUpdateHandler}
      />
    </div>
  )
}
