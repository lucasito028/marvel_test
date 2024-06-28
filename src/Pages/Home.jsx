import {useEffect, useState } from "react";
import { Query } from "../Services/Query"

export default function Home(){

    const [comics, setComics] = useState()
    const [id, setId] = useState(82967)

    useEffect(() => {
        const fetchComics = async () => {
            const queryInstance = new Query({id})
            try {
                setComics(await queryInstance.select())
            } catch (error) {
                console.log(error)
            }
        }
        fetchComics()
    }, [])

    return (
    <>
        <pre>{JSON.stringify(comics, null, 2)}
        </pre>
    </>)
}