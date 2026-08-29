import { useCallback, useRef } from "react"

export function useAudio(max_interval=100) {


    const last_play = useRef(Date.now()) // Timer for audio
    
    async function play_audio(audio_path) {
        let audio = new Audio(audio_path)
        audio.autoplay = false
        audio.volume = 0.25
        audio.play()
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