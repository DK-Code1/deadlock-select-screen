import { useCallback, useRef } from "react"

export function useHover(max_interval = 1000) {


    const last_play = useRef(Date.now()) // Timer for audio

    async function play_audio(audio_path) {
        let audio = new Audio(audio_path)
        audio.autoplay = false
        audio.volume = 0.1
        audio.play()
    }

    const play_hover = useCallback(() => {
        const now = Date.now();

        if (now - last_play.current < max_interval) {
            return;
        }

        last_play.current = now;

        const random = Math.floor(Math.random() * 10) + 1;
        play_audio(`${import.meta.env.VITE_ASSETS_SOURCE}sounds/hover${random}.mp3`);
    }, [max_interval]);


    return play_hover
}