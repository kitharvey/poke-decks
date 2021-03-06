import React, {useState, useEffect, useContext} from 'react'
import { LazyImage } from 'react-lazy-images'
<<<<<<< HEAD:components/modal-components/Evolution.tsx
import { extractEvolutionChain, getIDStringfromURL, getImageSourceFromURL } from '../../functions/GlobalFunctions'
import { GetPokemonDataInterface, GetPokemonSpeciesDataInterface, NameURLInterface } from '../../InterfacesProps/Interfaces'
import useSWR from 'swr';
import { motion } from 'framer-motion'
import { findColor } from '../../functions/getTypeIconAndColor'
import { useRouter } from 'next/dist/client/router'
import { fetchEvolutionData } from '../../fetch/FetchData'
=======
import { extractEvolutionChain, getIDStringfromURL, getImageSourceFromURL } from '../../Functions/GlobalFunctions'
import { GetPokemonSpeciesDataInterface, NameURLInterface } from '../../InterfacesProps/Interfaces'
import egg from "../../Assets/pokemon-egg.png"
import { useQuery } from 'react-query'
import { AppContext } from '../../Page/Page'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Link } from "react-router-dom";
>>>>>>> parent of 2b858d6... react-query setup properly:src/Components/ModalComponents/Evolution.tsx

interface EvolutionProps{
    pokemonSpeciesData: GetPokemonSpeciesDataInterface
}


<<<<<<< HEAD:components/modal-components/Evolution.tsx
const Evolution: React.FC<EvolutionProps> = ({pokemonSpeciesData, pokemonData}) => {
    const { data } = useSWR(`${pokemonSpeciesData.evolution_chain.url}`, fetchEvolutionData)
    const [evolutionChain, setEvolutionChain] = useState<NameURLInterface[] | null>(null)
    const router = useRouter()

=======
const Evolution: React.FC<EvolutionProps> = ({pokemonSpeciesData}) => {
    const {setStateActivePokemonID, stateActiveColorTheme} = useContext(AppContext)
    const { data, isFetching } = useQuery('fetchEvolutionData', async() => await axios.get(`${pokemonSpeciesData.evolution_chain.url}`), {refetchOnWindowFocus: false})
    const [evolutionChain, setEvolutionChain] = useState<NameURLInterface[] | null>(null)
>>>>>>> parent of 2b858d6... react-query setup properly:src/Components/ModalComponents/Evolution.tsx
    useEffect(() => {
        if(data) {
            const evolutionData = extractEvolutionChain(data)
            setEvolutionChain(evolutionData)
        }
        else setEvolutionChain(null)

        return (() => {
            setEvolutionChain(null)

            }
        )
    },[data])

    const handleClick = (id: string) => {
        setStateActivePokemonID(id)
    }

    return (
        <div className="flex flex-wrap justify-evenly w-full mt-4" >
        {(evolutionChain) ? evolutionChain.map( ({name, url}, index) => <div key={index} className="flex flex-col items-center" >
            <p className="text-xs" >#{getIDStringfromURL(url)}</p>
<<<<<<< HEAD:components/modal-components/Evolution.tsx
=======
            <Link to={`/${getIDStringfromURL(url)}`} >
>>>>>>> parent of 2b858d6... react-query setup properly:src/Components/ModalComponents/Evolution.tsx
            <motion.div className="w-28 h-28 rounded-full p-4 m-2 cursor-pointer"
                onClick={() => handleClick(getIDStringfromURL(url))}
                style={{
                    background: `linear-gradient(0deg, ${stateActiveColorTheme + "10"} 0%, ${stateActiveColorTheme} 80%)`
                }}
                initial={{
                    scale: 0,
                    y: 0,
                    opacity: 0,
                }}
                animate={{
                    scale: 1,
                    y: 0,
                    opacity: 1,
                    
                  }}
                whileHover={{
                    scale: 1.1,
                    boxShadow: "0 5px 5px 1px rgba(0,0,0,.25)",
                }}
                whileTap={{
                    scale: 1,
                    boxShadow: "0 0px 0px 0px rgba(0,0,0,.25)",
                }}
                onClick={() => router.push(`/${getIDStringfromURL(url)}`)}
            >
            <LazyImage
            
                src={getImageSourceFromURL(url)}
                alt={name}
                placeholder={({ imageProps, ref }) => (
                <img ref={ref} src='/pokemon-egg.png' alt={imageProps.alt} draggable="false" onDragStart={ (e: React.DragEvent<HTMLDivElement>) => e.preventDefault()} style={{filter: "blur(10px)"}} />
                )}
                actual={({ imageProps }) => <img {...imageProps} alt={name} draggable="false" onDragStart={ (e: React.DragEvent<HTMLDivElement>) => e.preventDefault()} />}
                error={() => (
                    <img src='/pokemon-egg.png' alt="egg error" draggable="false" onDragStart={ (e: React.DragEvent<HTMLDivElement>) => e.preventDefault()} style={{filter: "blur(10px)"}} />
                  )}
            />
            </motion.div>
            <p className="text-xs capitalize" >{name}</p>

            </div> )

            : <div className="flex justify-evenly flex-wrap w-full" >
                    <div className="flex flex-col items-center" >
                        <div className="w-10 h-3.5 rounded bg-gray-200 animate-pulses"/>
                        <div className="w-28 h-28 m-1 rounded-full bg-gray-400 animate-pulse" />
                        <div className="w-10 h-3.5 rounded bg-gray-200 animate-pulses"/>
                    </div>
                    <div className="flex flex-col items-center" >
                        <div className="w-10 h-3.5 rounded bg-gray-200 animate-pulses"/>
                        <div className="w-28 h-28 m-1 rounded-full bg-gray-400 animate-pulse" />
                        <div className="w-10 h-3.5 rounded bg-gray-200 animate-pulses"/>
                    </div>
                    <div className="flex flex-col items-center" >
                        <div className="w-10 h-3.5 rounded bg-gray-200 animate-pulses"/>
                        <div className="w-28 h-28 m-1 rounded-full bg-gray-400 animate-pulse" />
                        <div className="w-10 h-3.5 rounded bg-gray-200 animate-pulses"/>
                    </div>
                </div>
        }
    </div>
    )
}


export default Evolution