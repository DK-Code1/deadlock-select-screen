import { useState, useEffect, createContext } from "react"

export const CharactersContext = createContext(null)

export function CharactersContextProvider({ children }) {

    const [characters, setCharacters] = useState(null)
    const [selectedCharacter, setSelectedCharacter] = useState(0)
    const [selectionDone, setSelectionDone] = useState(false)

    useEffect(() => { // Fetch data first
        const fetchData = async () => {
            const file = await fetch(`character_list.json`)
            const data = await file.json();
            setCharacters(data)

        };

        fetchData();

    }, [])

    return (
        <CharactersContext.Provider value={{characters, selectedCharacter, setSelectedCharacter, selectionDone, setSelectionDone}}>
            {children}
        </CharactersContext.Provider>
    )

}