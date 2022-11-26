import { RefObject } from 'react'

export const playAudio = (
  audioRef: RefObject<HTMLAudioElement>,
  isPlaying: boolean
) => {
  if (isPlaying) {
    const playPromise = audioRef.current?.play()
    if (playPromise !== undefined) {
      playPromise.then(() => {
        audioRef.current?.play()
      })
    }
  }
}
