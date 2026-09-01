import { useState, useEffect, createContext } from "react"

export const CharactersContext = createContext(null)

export function CharactersContextProvider({ children }) {

    const [characters, setCharacters] = useState(null)
    const [isRosterMode, setIsRosterMode] = useState(true)
    const [selectedCharacters, setSelectedCharacters] = useState([]) // null for not selected any character
    //const [selectionDone, setSelectionDone] = useState(false) // marks characters as "selected" 0 false, 1 true
    const selectionDone = selectedCharacters.some(x => x != null)
    const setSelectionDone = ()=> {return}
    const [displayedCharacter, setDisplayedCharacter] = useState(0)

    useEffect(() => { // Fetch data first
        const fetchData = async () => {
            const file = await fetch(`character_list.json`)
            const data = await file.json();
            setCharacters(data)

        };

        fetchData();

    }, [])

    function toggleSelectionMode() {

        setIsRosterMode(!isRosterMode)
        selectedCharacters([displayedCharacter, null, null])

    }

    function toggleCharacter(character_index){
        if (selectedCharacters.includes(character_index)){
            setSelectedCharacters(old => old.filter(char_idx => char_idx != character_index))
        }
        else{
            setSelectedCharacters(old => [...old, character_index])
        }
    }



    return (
        <CharactersContext.Provider value={{
            characters, isRosterMode, toggleSelectionMode, selectedCharacters, setSelectedCharacters,
            selectionDone, setSelectionDone, displayedCharacter, setDisplayedCharacter, toggleCharacter
        }}>
            {children}
        </CharactersContext.Provider>
    )

}