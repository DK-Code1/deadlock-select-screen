import { useState, useEffect, createContext } from "react"

export const CharactersContext = createContext(null)

export function CharactersContextProvider({ children }) {

    const [characters, setCharacters] = useState(null)
    const [isRosterMode, setIsRosterMode] = useState(true)
    const [selectedCharacters, setSelectedCharacters] = useState({}) // dictionary, key as selected character, value as priority
    //const [selectionDone, setSelectionDone] = useState(false) // marks characters as "selected" 0 false, 1 true
    const selectionDone = Object.keys(selectedCharacters).length > 0
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

    // function toggleCharacter(character_index){
    //     if (selectedCharacters.includes(character_index)){
    //         setSelectedCharacters(old => old.filter(char_idx => char_idx != character_index))
    //     }
    //     else{
    //         setSelectedCharacters(old => [...old, character_index])
    //     }
    // }

    function toggleCharacter(character_index) {
        if (character_index in selectedCharacters) {
            setSelectedCharacters((old) => {
                const { [character_index]: _, ...rest } = old;
                return rest;
            })
        }
        else {
            setSelectedCharacters(old => ({ ...old, [character_index]: 0 }))
        }
    }

    function change_character_priority(character_index, priority) {
        setSelectedCharacters(old => ({
            ...old,
            [character_index]: priority
        }));
    }


    return (
        <CharactersContext.Provider value={{
            characters, isRosterMode, toggleSelectionMode, selectedCharacters, setSelectedCharacters,
            selectionDone, setSelectionDone, displayedCharacter, setDisplayedCharacter, toggleCharacter, change_character_priority
        }}>
            {children}
        </CharactersContext.Provider>
    )

}