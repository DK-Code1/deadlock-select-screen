import { useContext, useEffect, useRef, useState } from "react"
import { Character } from "./components/Character";
import { useBGM } from "./hooks/useBGM";
import { Modal } from "./components/Modal";
import { CharactersContext } from "./context/CharactersContext";
import { useHover } from "./hooks/useHover";
import { useSingleAudio } from "./hooks/useSingleAudio";
import { useHoverDelay } from "./hooks/useHoverDelay"

import voice_list from "./assets/vo_list.json"

// import { Canvas, useFrame } from "@react-three/fiber";
// import { useGLTF, OrbitControls } from "@react-three/drei";
// import * as THREE from "three";


// function Model() {
//   const gltf = useGLTF("Paradox2.glb");



//   return (
//     <primitive
//       object={gltf.scene}
//       scale={1}
//     />
//   );
// }

const hero_colors = {
    "Abrams": { color: "#2092AE" },
    "Apollo": { color: "#FF3333" },
    "Bebop": { color: "#9F4734" },
    "Billy": { color: "#D4AD0E", text: "#10130D" },
    "Calico": { color: "#572798" },
    "Celeste": { color: "#BBA9E1", text: "#10130D" },
    "Doorman": { color: "#B77528" },
    "Drifter": { color: "#9D2C2B" },

    "Dynamo": { color: "#D0B945" },
    "Graves": { color: "#D9F334", text: "#10130D" },
    "Grey Talon": { color: "#5EB083" },
    "Haze": { color: "#AC6133" },
    "Holliday": { color: "#A35A1B" },
    "Infernus": { color: "#C93C26" },
    "Ivy": { color: "#9D8CA9" },
    "Kelvin": { color: "#74ABBC" },

    "Lady Geist": { color: "#218440" },
    "Lash": { color: "#4174BB" },
    "McGinnis": { color: "#23549D" },
    "Mina": { color: "#A9171E", text: "#A9171E", text_back: "#200B0B" },
    "Mirage": { color: "#6A2E68" },
    "Mo Krill": { color: "#C58428" },
    "Paige": { color: "#258F63" },
    "Paradox": { color: "#983952" },

    "Pocket": { color: "#858617" },
    "Rem": { color: "#5383D1", text: "#10130D" },
    "Seven": { color: "#CC861E" },
    "Shiv": { color: "#E52A68" },
    "Silver": { color: "#BFBC9F", text: "#10130D" },
    "Sinclair": { color: "#6B6B6B", text: "#10130D" },
    "Venator": { color: "#BD3599" },
    "Victor": { color: "#658B6F" },

    "Vindicta": { color: "#A2C7E5", text: "#10130D" },
    "Viscous": { color: "#319826" },
    "Vyper": { color: "#A7AD00", text: "#10130D" },
    "Warden": { color: "#4D68A3" },
    "Wraith": { color: "#944D78" },
    "Yamato": { color: "#625789" },
};

export function Home() {

    const { characters, isRosterMode, toggleSelectionMode, selectedCharacters, setSelectedCharacters, toggleCharacter, selectionDone, setSelectionDone, displayedCharacter, setDisplayedCharacter } = useContext(CharactersContext)


    const [loreOpen, setLoreOpen] = useState(false)
    const [aboutModalOpen, setAboutModalOpen] = useState(false)

    const current_colors = characters ? hero_colors[characters[displayedCharacter].name] : {}

    const hero_color = current_colors.color
    const hero_tag_color = current_colors.text_back ?? hero_color
    const hero_text_color = current_colors.text ?? "#ffffff"

    const character_image = useRef(null)
    const character_image_shadow = useRef(null)
    const play_button_ref = useRef(null)

    const { onEnter, onLeave } = useHoverDelay(setDisplayedCharacter, 150)

    const { autoPlay, toggleMute } = useBGM()
    const play_hover = useHover(50)
    const play_select_audio = useSingleAudio(1, 0.15)
    const play_voice_audio = useSingleAudio(50, 0.4)



    async function showModal() {
        setLoreOpen(true)
    }

    async function closeModal() {
        setLoreOpen(false)
    }

    function sleep(ms) { // timer
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    

    const timer = useRef(null);
    async function finishRandomize(last_char) {


        clearTimeout(timer.current);
        timer.current = setTimeout(() => { 
            setSelectionDone(true), 
            play_select_clip("select", last_char) 
            setDisplayedCharacter(last_char)
        }, 200);

    }


    // useEffect(() => {
    //     if (!characters) {
    //         return
    //     }

    //     var char_name = characters[displayedCharacter].name


    //     if (selectionDone) {

    //         var clip_list = voice_list[char_name]["selected"].length
    //         var random_clip = Math.floor(Math.random() * clip_list)

    //         var voice_clip = voice_list[char_name]["selected"].at(random_clip)
    //         play_select_audio(`${import.meta.env.VITE_ASSETS_SOURCE}sounds/select.mp3`)



    //         play_voice_audio(`${import.meta.env.VITE_ASSETS_SOURCE}vo/${char_name}/${voice_clip}`)

    //     }
    //     else {
    //         let clip_list = voice_list[char_name]["unselected"].length

    //         let random_clip = Math.floor(Math.random() * clip_list)

    //         let voice_clip = voice_list[char_name]["unselected"].at(random_clip)

    //         play_voice_audio(`${import.meta.env.VITE_ASSETS_SOURCE}vo/${char_name}/${voice_clip}`)
    //     }

    // }, [selectedCharacters])

    function play_select_clip(audio_type, char_index) {

        var char_name = characters[char_index].name
        if (audio_type === "select") {


            var clip_list = voice_list[char_name]["selected"].length
            var random_clip = Math.floor(Math.random() * clip_list)

            var voice_clip = voice_list[char_name]["selected"].at(random_clip)
            play_select_audio(`${import.meta.env.VITE_ASSETS_SOURCE}sounds/select.mp3`)
            play_voice_audio(`${import.meta.env.VITE_ASSETS_SOURCE}vo/${char_name}/${voice_clip}`)
        }

        else {
            let clip_list = voice_list[char_name]["unselected"].length

            let random_clip = Math.floor(Math.random() * clip_list)

            let voice_clip = voice_list[char_name]["unselected"].at(random_clip)

            play_voice_audio(`${import.meta.env.VITE_ASSETS_SOURCE}vo/${char_name}/${voice_clip}`)

        }

    }

    async function randomize() {
        //play_select_clip("unselect", displayedCharacter)

        for (let i = 0; i < 20; i++) {
            var random_characters = []

            for (let i = 0; i < 3; i++) {
                var random = Math.floor(Math.random() * 38)
                while (random_characters.includes(random)) {
                    random = Math.floor(Math.random() * 38)
                }
                random_characters.push(random)
            }

            await sleep(50)

            //setDisplayedCharacter(random_characters.at(-1))
            setSelectedCharacters(random_characters)
            play_hover()
            finishRandomize(random_characters.at(-1))

        }

    }


    function rotate_character(e) {
        if (!character_image.current) {
            return
        }


        var offset = (e.clientX / window.innerWidth) * 6 - 4;

        //console.log(offset)

        character_image.current.style.transform = `rotateY(${offset}deg)`
        character_image_shadow.current.style.transform = `rotateY(${offset}deg)`

    }

    useEffect(() => {

        window.addEventListener("mousemove", rotate_character)

        return () => {

            window.removeEventListener("mousemove", rotate_character)

        }


    }, [])

    function play_button_hover(e) {

        var type = e.type

        var element = play_button_ref.current
        var image_element = element.children[2]

        if (type == "mouseenter") {

            element.classList.add("hover")
            image_element.src = "play_box_fill.png"

        }
        else {
            element.classList.remove("hover")
            image_element.src = "play_box.png"
        }

    }


    if (!characters) {
        return (
            <h1>Loading</h1>
        )
    }


    return (
        <div className="screen">


            {/* <div className="top-bar">

                <div className="top-bar-button">
                    <img src="esc.png"></img>
                </div>


            </div> */}



            <video className="video-background" src="roster_bg_loop.webm" ref={video => video && (video.playbackRate = 0.5)} autoPlay muted loop> </video>
            <button className="mute-button" onClick={toggleMute} >
                <img src={`${autoPlay ? "music_on.png" : "music_off.png"}`}></img>
                <p>{autoPlay ? "MUSIC ON" : "MUSIC OFF"}</p>
            </button>
            <div className="character-selection">

                <div className="character-selection-title">
                    <p>DEADLOCK</p>
                    <h1>{isRosterMode ? "CREATE ROSTER" : "SELECT HERO"}</h1>
                </div>

                <div className="characters-grid">
                    {characters.map((item, index) => (
                        <Character key={item.name + index} character={item} character_index={index} toggleCharacter={toggleCharacter}
                            isSelected={selectedCharacters.includes(index)} selectionDone={selectionDone} 
                            setSelectionDone={setSelectionDone} play_hover={play_hover}
                            setDisplayedCharacter={setDisplayedCharacter} 
                            onEnter={onEnter} onLeave={onLeave} play_select_clip={play_select_clip}>

                        </Character>
                    ))}

                </div>

                <div className="play-button-container" >

                    <button ref={play_button_ref} onMouseEnter={play_button_hover} onMouseLeave={play_button_hover} className="play-button">
                        <p>PLAY</p>
                        <img className="play-button-image" src="play_btn_flames.gif"></img>
                        <img className="play-button-image" src="play_box.png">

                        </img>
                    </button>

                </div>

            </div>

            <div className="player-character" >

                <img key={characters[displayedCharacter].name} className="character-background" src={`${import.meta.env.VITE_ASSETS_SOURCE}backgrounds/${characters[displayedCharacter].background}`} />
                <img ref={character_image_shadow} key={characters[displayedCharacter].name + 2} className="character-shadow" src={`${import.meta.env.VITE_ASSETS_SOURCE}characters/${characters[displayedCharacter].name}.png`} ></img>

                <img ref={character_image} key={characters[displayedCharacter].name + 1} className="character" src={`${import.meta.env.VITE_ASSETS_SOURCE}characters/${characters[displayedCharacter].name}.png`} ></img>

                {/* <model-viewer className="canvas" alt="Paradox" src="Paradox2.glb"  shadow-intensity="1" camera-controls touch-action="pan-y"></model-viewer> */}

                <div className="player-character-info">
                    <img className="player-character-info-name" src={`${import.meta.env.VITE_ASSETS_SOURCE}names/${characters[displayedCharacter].name}.svg`}></img>
                    <div className="player-character-info-tags-container">



                        {characters[displayedCharacter].tags.map((tag) => (
                            <div className="player-character-tag-container">
                                <div style={{ backgroundColor: hero_tag_color }} className="player-character-tag-background" > </div>
                                <p style={{ color: hero_text_color }} key={tag} className="player-character-info-tag" >{tag}</p>
                            </div>

                        ))}



                    </div>

                    <div className="player-character-info-skills-container">
                        {characters[displayedCharacter].abilities.map((ability, index) => (
                            <div style={{ color: hero_color }} className="player-character-info-skill">
                                <img title={ability} src={`${import.meta.env.VITE_ASSETS_SOURCE}abilities/${characters[displayedCharacter].name}/${index + 1}.png`}>
                                </img>
                            </div>
                        ))}
                    </div>

                </div>

            </div>

            <div className="bottom-bar">

                <div className="bottom-bar-buttons-container" >

                    <div className="bottom-bar-escape">
                        <img src="esc.png"></img>
                        <p>BACK</p>
                    </div>

                    <button onClick={randomize} className="bottom-bar-randomizer">
                        <div>
                            <img src="random.png"></img>
                        </div>

                        <p>RANDOMIZE</p>
                    </button>

                    <a href="https://ko-fi.com/dkstuff" target="_blank" className="bottom-bar-randomizer">
                        <div>
                            <img src="donate.png"></img>
                        </div>

                        <p>DONATE</p>
                    </a>

                    <button onClick={() => setAboutModalOpen(true)} className="bottom-bar-randomizer">
                        <div>
                            <img src="about.png"></img>
                        </div>

                        <p>ABOUT</p>
                    </button>

                    {/* <div className="bottom-bar-randomizer">
                        <button  >RANDOMIZER</button>
                    </div> */}

                </div>

                <div className="lore-button-container">
                    <button onClick={() => { showModal() }} className="lore-button">
                        <img src="lore.png">
                        </img>
                    </button>
                </div>

            </div>

            <Modal isOpen={loreOpen} close={closeModal}  >
                <div className='character-lore-container'>
                    <h1>
                        Backstory:
                    </h1>
                    <div className="character-lore-text-container">
                        <p> {characters[displayedCharacter].lore} </p>

                    </div>

                    <button onClick={closeModal}>
                        Close
                    </button>
                </div>
            </Modal>

            <Modal isOpen={aboutModalOpen} close={() => { setAboutModalOpen(false) }}  >
                <div className='character-lore-container'>
                    <img src="myboyrem.jpg">
                    </img>
                    <h1>
                        About this project.
                    </h1>
                    <div className="character-lore-text-container">
                        <h2>I used the following tools to make this site:</h2>

                        <ul>
                            <li>
                                <p>Credits to user <b>"Lovely"</b> for creating <a href="https://forums.playdeadlock.com/resources/deadlock-graphical-library.30/updates" target="_blank">"Deadlock Graphical Library"</a> and uploading raw character renders. (could not contact him because the project's discord link is broken)</p>
                            </li>

                            <li>
                                <p> <a href="https://s2v.app/" target="_blank">Source2Viewer</a>: For game assets extraction, including music, 3d models, images, etc.</p>
                            </li>

                            <li>
                                <p> <a href="https://github.com/kornelski/pngquant" target="_blank">pngquant</a> & <a href="https://github.com/oxipng/oxipng" target="_blank">oxipng</a>: For image optimization and compression</p>
                            </li>

                            <li>
                                <p> <a href="https://www.blender.org/download/" target="_blank">Blender</a>: To create missing renders of characters (the ones that were not available at "Deadlock Graphical Library") </p>
                            </li>

                            <li>
                                <p> <b>GIMP</b>: For image editing and manipulation, mainly composing the character renders and backgrounds. </p>
                            </li>
                        </ul>

                        <h2>TO DO:</h2>


                        <ul>
                            <li>
                                <p>Multiple character selection</p>
                            </li>
                            <li>
                                <p>Show info of character abilities</p>
                            </li>

                            <li>
                                <p>Improve shadow animation of characters</p>
                            </li>
                            <li>
                                <p>Maybe custom skins?</p>
                            </li>
                            <li>
                                <p>Add proper optimization for resource loading (tiny thumbnails while full size image loads, preload, load screen maybe, etc.)</p>
                            </li>

                        </ul>

                        <h3>I spent more time making this project than playing the actual game... (see rem at the back for reference)</h3>

                    </div>




                    <button onClick={() => { setAboutModalOpen(false) }}>
                        Close
                    </button>
                </div>
            </Modal>


        </div>
    )
}