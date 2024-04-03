"use client"
import React,{useEffect,useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'

function Pokemon() {

    const [pokemon,setPokemon] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true);
        const fetchPokemon = async()=>{
            try{
                const res = await fetch("https://pokeapi.co/api/v2/pokemon");
                const poData = await res.json();
                setPokemon(poData.results)
            }catch(error){
                console.log(error)
            }
            setLoading(false);
        }
        fetchPokemon();
    },[])

  return (
    <div className='container mx-auto text-center'>
        {loading?(<p>loading...</p>):(
            <div className='grid grid-cols-5'>
                {pokemon.map((p,i)=>(
                    <Link key={p.name} href={`/info/[id]`} as={`/info/${i+1}`}>
                        <div key={i} className='flex justify-center items-center shadow-md transition hover:shadow-lg m-3 rounded'>
                            <div >
                                <h3>{p.name}</h3>                   
                                    <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i+1}.png`} width={120} height={120} alt={p.name} />                 
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        )}
    </div>
  )
}

export default Pokemon