
export function Character({ character, character_index, isSelected, selectCharacter, selectionDone, setSelectionDone, play_hover }) {

    function toggleCharacter() {
        if (selectionDone) {
            return
        }
        play_hover()
        selectCharacter(character_index)
    }

    function select_character(){
        if (selectionDone){
            setSelectionDone(false)
            return
        }
        selectCharacter(character_index)
        setSelectionDone(prev => !prev)
    }

    return (
        <div key={character.name} onMouseEnter={toggleCharacter} onClick={select_character}
            className={`character-cell ${isSelected ? "selected" : ""} 
            ${selectionDone ? (isSelected ? "done-selected" : "done-unselected") : ""}`} >

            <img src={`${import.meta.env.VITE_ASSETS_SOURCE}icons/${character.icon}`}></img>
            {isSelected && (
                <img className="character-cell-hover" src="fire.gif"></img>
            )}
            
        </div>
    )
}