import { useState } from "react"
import { div } from "three/tsl"

export function Character({ character, character_index, priority, toggleCharacter, change_character_priority, isSelected, selectionDone, play_hover, onEnter, onLeave, setDisplayedCharacter, play_select_clip}) {

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

    function select_character(e) {
        console.log(e)

        if (e.button == 2 && isSelected){
            var new_priority = priority +1

            if (new_priority >12){
                new_priority = 0
            }
            change_character_priority(character_index, new_priority)
            return
        }
        
        toggleCharacter(character_index)
        setDisplayedCharacter(character_index)

        if(!isSelected){
            play_select_clip("select", character_index)
        }
        else{
            play_select_clip("unselect", character_index)
        }
        
    }

    return (
        <div key={character.name} title={character.name} onPointerEnter={setDisplayCharacter} onPointerLeave={()=>{setIsHovered(false), 
            onLeave(character_index)}} onPointerDown={select_character}  onContextMenu={(e)=>e.preventDefault()}
            className={`character-cell  ${isSelected ? "selected" : ""} 
                    ${selectionDone ? (isSelected ? "done-selected" : "done-unselected") : ""}
                    ${isHovered ? "hovered" : ""}
                    ${priority > 0 ? "priority" :""}`} >

            <img src={`${import.meta.env.VITE_ASSETS_SOURCE}icons/${character.icon}`}></img>
            {isHovered && (
                <img className="character-cell-fire" src="fire.gif"></img>
                
            )}

            {isSelected && priority == 0 &&(
                <p className="character-cell-in-roster">IN ROSTER</p>
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
    )
}