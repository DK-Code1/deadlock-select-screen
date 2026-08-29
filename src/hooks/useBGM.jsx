import { useCallback, useEffect, useRef, useState} from "react"

export function useBGM() {

    const audio = useRef(new Audio())
    const [autoPlay, setAutoPlay ] = useState(()=>{ return localStorage.getItem("autoplay") !== "false"})

    function toggleMute(){
        console.log("Mute button pushed")
        if (autoPlay){
            setAutoPlay(false)
            window.localStorage.setItem("autoplay", false)
            audio.current.pause()
        }
        else{
            setAutoPlay(true)
            window.localStorage.setItem("autoplay", true)
            audio.current.play()
        }
    }

    function loop_song() {
        //audio.current.currentTime = 21.8
        audio.current.play()
    }

    function handle_tab_change() {
        if (document.hidden) {
            audio.current.pause()
        }
        else if(autoPlay){
            audio.current.play()
        }

    }

    const start_playback = useCallback(() => {

        if (!audio.current.paused) {
            return
        }

        audio.current.play()


    }, [])

    function try_play() {
        if (autoPlay && audio.current.paused) {
            start_playback()
        }
    }

    //try_play()



    useEffect(()=>{
        console.log("recreating audio")
        audio.current.src = `${import.meta.env.VITE_ASSETS_SOURCE}bgm/search.mp3`
        audio.current.autoplay = false
        audio.current.volume = 0.25


        if (autoPlay){
            try_play()
        }


        audio.current.addEventListener("ended", loop_song)
        
    },[])

    useEffect(()=>{
        document.addEventListener("visibilitychange", handle_tab_change)


        return()=>{

            document.removeEventListener("visibilitychange", handle_tab_change)

        }
    },[autoPlay])

    useEffect(() => {
        document.addEventListener("pointerup", try_play, { once: true })
    }, [])

    return {autoPlay, toggleMute}

}