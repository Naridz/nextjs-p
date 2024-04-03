"use client"

import { useParams } from 'next/navigation'
import React,{useState,useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'

function PoInfo() {

    const params = useParams();
    const [pokemon,setPokemon] = useState([])
    const [loading,setLoading] = useState(false)
    const [pocolor,setPocolor] = useState(true)

    const changeColor = ()=>{
        setPocolor(!pocolor)
    }

    useEffect(()=>{
        setLoading(true);
        const fetchPokemonInfo = async()=>{
            try{
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`);
                const poInfo = await res.json();
                setPokemon(poInfo)
            }catch(error){
                console.log(error)
            }
            setLoading(false);
        }
        fetchPokemonInfo();
    },[])

  return (
    <div className='p-24'>
        <Link href="/" className='bg-red-500 text-white rounded-md p-3'>Go Back</Link>
        <div className='flex justify-center items-center mt-10 text-center'>
            <div className='shadow-md p-10 rounded-md transition hover:shadow-lg'>
                {loading?(<p>Loading...</p>):(
                    <>
                    <h3 className='text-3xl'>{pokemon.name}</h3>
                    {pocolor?(
                        <Image src={pokemon.sprites?.other.home.front_default} width={300} height={300} 
                        alt={pokemon.name} onClick={changeColor} className='cursor-crosshair' />    
                    ):(
                        <Image src={pokemon.sprites?.other.home.front_shiny} width={300} height={300}
                        alt={pokemon.name} onClick={changeColor} className='cursor-crosshair' />
                    )}
                    <div className='mt-5'>
                        <p className='my-3'>Weight : {pokemon.weight}</p>
                        <p className='my-3'>
                            Abilities: {pokemon.abilities?.map(e=>(
                                <span key={e.ability.name} className='bg-gray-500 px-3 mx-1 py-1 rounded-md text-white'>{e.ability.name}</span>
                            ))}
                        </p>
                        <p className='my-3'>
                            Types: {pokemon.types?.map(e=>(
                                <span key={e.type.name} className='bg-gray-500 px-3 mx-1 py-1 rounded-md text-white'>{e.type.name}</span>
                            ))}
                        </p>
                    </div>
                    </>
                )}
            </div>
        </div>
    </div>
  )
}

export default PoInfo