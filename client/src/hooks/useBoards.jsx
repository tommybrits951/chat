import { useState, useEffect } from "react";
import axios from '../api/axios'


export default async function useBoards() {
    const [boards, setBoards] = useState(null)
    useEffect(() => {
        axios.get("/board")
        .then(res => {
            setBoards(res.data)
        })
    }, [])
    return [boards, setBoards]
}