import {
  faAngleLeft,
  faAngleRight,
  faPause,
  faPlay,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {
  ChangeEvent,
  Dispatch,
  useEffect,
  useRef,
  useState,
} from 'react'

import { playAudio } from '../util/util'
import { ICurrentSong, IData, ISongInfo } from './types'

interface IProps extends ICurrentSong {
  currentSong: IData
  isPlaying: boolean
  setIsPlaying: Dispatch<boolean>
  songs: IData[]
  setCurrentSong: Dispatch<IData>
  setSong: Dispatch<IData[]>
}

export const Player = ({
  isPlaying,
  setIsPlaying,
  currentSong,
  songs,
  setCurrentSong,
  setSong,
}: IProps) => {
  const audioRef = useRef<HTMLAudioElement>(null)
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
  const timeUpdateHandler = (e: ChangeEvent<HTMLAudioElement>) => {
    const current = e.target.currentTime
    const duration = e.target.duration
    setSongInfo({ ...songInfo, currentTime: current, duration })
  }
  const [songInfo, setSongInfo] = useState<ISongInfo>({
    currentTime: 0,
    duration: 0,
  })

  const getTime = (time: number) => {
    return time
      ? Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
      : '0:00'
  }

  const dragHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (checkAudioRef) {
      audioRef.current.currentTime = Number(e.target.value)
    }

    setSongInfo({ ...songInfo, currentTime: Number(e.target.value) })
  }
  const handleSkipTrack = (direction: string) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id)
    if (direction === 'skip-forward') {
      setCurrentSong(songs[(currentIndex + 1) % songs.length])
    }
    if (direction === 'skip-back') {
      if ((currentIndex - 1) % songs.length === -1) {
        setCurrentSong(songs[songs.length - 1])
        playAudio(audioRef, isPlaying)
        return
      }
      setCurrentSong(songs[(currentIndex - 1) % songs.length])
    }
    playAudio(audioRef, isPlaying)
  }
  useEffect(() => {
    const newSong = songs.map((song) => {
      if (song.id === currentSong.id) {
        return {
          ...song,
          active: true,
        }
      } else {
        return {
          ...song,
          active: false,
        }
      }
    })
    setSong(newSong)
    playAudio(audioRef, isPlaying)
  }, [currentSong])

  return (
    <div className="player-container">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          type="range"
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
        />
        <p>{getTime(songInfo.duration ? songInfo.duration : Number('0:00'))}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          icon={faAngleLeft}
          size="2x"
          className="skip-back"
          onClick={() => handleSkipTrack('skip-back')}
        />
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
          onClick={() => handleSkipTrack('skip-forward')}
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
