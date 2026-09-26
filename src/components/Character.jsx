import { useState } from "react"
import { div } from "three/tsl"

export function Character({ character, character_index, priority, toggleCharacter, change_character_priority, isSelected, selectionDone, play_hover, onEnter, onLeave, setDisplayedCharacter, play_select_clip, pressedKeys}) {

    const [isHovered, setIsHovered] = useState(false)

    function setDisplayCharacter() {
        // if (selectionDone) {
        //     return
        // }
        play_hover()
        setIsHovered(true)
        //selectCharacter(character_index)
        onEnter(character_index)
    }


    // function select_character(){
    //     if (selectionDone){
    //         setSelectionDone(false)
    //         return
    //     }
    //     selectCharacter(character_index)
    //     setSelectionDone(prev => !prev)
    // }

    function handleClick(e) {
        
        if (e.button === 2 && isSelected) {
            const controlPressed = pressedKeys.includes("Control")

            var maxPriority = controlPressed ? 12 : 2

            var new_priority = priority + 1

            // Same as unselect
            if (new_priority > maxPriority) {
                change_character_priority(character_index, 0)
                play_select_clip("unselect", character_index)
                return
            }
            play_select_clip("select", character_index)
            change_character_priority(character_index, new_priority)
            return
        }

        toggleCharacter(character_index)
        setDisplayedCharacter(character_index)

        if (!isSelected) {
            play_select_clip("select", character_index)
        }
        else {
            play_select_clip("unselect", character_index)
        }

    }

    return (
        <div className="character-cell-container">

            <div key={character.name} title={character.name} onPointerEnter={setDisplayCharacter} onPointerLeave={() => {
                setIsHovered(false),
                onLeave(character_index)
            }} onPointerDown={handleClick} onContextMenu={(e) => e.preventDefault()}
                className={`character-cell  ${isSelected ? "selected" : ""} 
                    ${selectionDone ? (isSelected ? "done-selected" : "done-unselected") : ""}
                    ${isHovered ? "hovered" : ""}
                    ${priority === 1 ? "priority" : priority >= 2 ? "highpriority" : ""}`} >

                <img src={`${import.meta.env.VITE_ASSETS_SOURCE}icons/${character.icon}`}></img>
                {isHovered && (
                    <img className="character-cell-fire" src="fire.gif"></img>

                )}

                {isSelected && priority == 0 && (
                    <p className="character-cell-in-roster">IN ROSTER</p>
                )}

                {priority > 0 && !isHovered && (
                    <div className="character-cell-inner-priorty-container">

                        {Array.from({ length: priority <= 2 ? priority : 2 }, (_, i) => (
                                    <img className="character-cell-priority-image" src="priority.png"></img>
                        ))}

                    </div>

                )}

                {isHovered && priority > 0 && (
                    <>
                        <div className="character-cell-priority-container">

                            <div className="character-cell-priority-image-list">

                                {Array.from({ length: priority }, (_, i) => (
                                    <img className="character-cell-priority-image" src="priority.png"></img>
                                ))}
                            </div>

                            <p>{`${priority == 2 ? "HIGH" : ""} ${priority >= 3 && priority <= 5 ? "ULTRA HIGH" : ""} ${priority > 5 ? "I ONLY WANT TO PLAY THIS CHARACTER" : ""} PRIORITY`}</p>
                        </div>

                    </>

                )}



            </div>

            {isHovered && isSelected && (
                    <div className="character-cell-guide-panel">

                        <span>

                            <img src="mouse1.svg"></img>
                            <p>Remove from Roster</p>

                        </span>

                        <span>
                            <img src="mouse2.svg"></img>
                            <p>Make High Priority</p>

                        </span>

                        <span>
                            <img src="mouse3.svg"></img>
                            <p>Avoid Hero</p>

                        </span>

                    </div>
                )}

        </div>
    )
}