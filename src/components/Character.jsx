import { useState } from "react"

export function Character({ character, character_index, toggleCharacter, isSelected, selectionDone, play_hover, onEnter, onLeave, setDisplayedCharacter, play_select_clip}) {

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
            onLeave(character_index)}} onPointerDown={select_character} 
            className={`character-cell  ${isSelected ? "selected" : ""} 
                    ${selectionDone ? (isSelected ? "done-selected" : "done-unselected") : ""}
                    ${isHovered ? "hovered" : ""}`} >

            <img src={`${import.meta.env.VITE_ASSETS_SOURCE}icons/${character.icon}`}></img>
            {isHovered && (
                <img className="character-cell-hover" src="fire.gif"></img>
                
            )}

            {isSelected && (
                <p className="character-cell-in-roster">IN ROSTER</p>
            )}
            
        </div>
    )
}