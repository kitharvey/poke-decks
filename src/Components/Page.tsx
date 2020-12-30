import React, {createContext, useState} from 'react'
import DeckOfCards from '../Deck/DeckOfCards'
import Modal from './Modal';
import bg from '../Assets/bg-types.png'
interface ContextStateProps {
    search: string,
    id: number
}

const appCtxDefaultValue = {
    state: {
        search: "",
        id: 0
    },
    setState: (state: ContextStateProps) => {}
};

export const AppContext = createContext(appCtxDefaultValue);
  
const Page: React.FC = () => {
    const [state, setState] = useState<ContextStateProps>(appCtxDefaultValue.state);
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, search: e.target.value.toLowerCase()})
      }

        return (
            <AppContext.Provider value={{state, setState}} >
                <div className="fixed p-3 top-0 left-0 w-full flex items-center justify-between z-10" style={{background: "#ef233c"}}>
                    <h1 className="text-4xl font-bold text-black" >Pokédecks</h1>
                    <div className="flex items-center">
                        <label htmlFor="searchpokemon" className="text-black font-bold mr-3" >Search: </label>
                        <form method="GET" onSubmit={ (event: React.FormEvent<HTMLFormElement>) => event.preventDefault() }>
                        <div className="relative text-gray-400 focus-within:text-black">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            {/* <button type="submit" className="p-1 focus:outline-none focus:shadow-outline"> */}
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            {/* </button> */}
                            </span>
                            <input id="searchpokemon" type="search" name="q" className="py-2 text-sm pl-10 focus:outline-none bg-white text-gray-900" placeholder="Enter Pokemon Name..." autoComplete="off" onChange={handleSearch} />
                        </div>
                        </form>
                    </div>
                </div>
                <div className="relative h-screen w-full">
                    <DeckOfCards />
                </div>
                {state.id && <Modal />}
                    
            </AppContext.Provider>
        )
        
}


export default Page