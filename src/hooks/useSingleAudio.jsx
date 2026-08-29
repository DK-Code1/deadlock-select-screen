import { useCallback, useRef } from "react"

// if we call again this hook, the currently playing audio will be stopped and play the new one
export function useSingleAudio(max_interval=100, volume=0.25) {


    const last_play = useRef(Date.now()) // Timer for audio
    const audio = useRef(new Audio())
    audio.current.autoplay = false
    audio.current.volume = volume

    async function play_audio(audio_path) {
        // let audio = new Audio(audio_path)

        audio.current.src = audio_path
        audio.current.play()

    }

    const play_audio_timer = useCallback((audio_path)=> {

        if (!audio_path){
            return
        }

        let last_timer = last_play.current

        let current_time = Date.now()

        if (current_time - last_timer > max_interval) {
            last_play.current = current_time
            play_audio(audio_path)
        }

    },[max_interval])

    return play_audio_timer
}