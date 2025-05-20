import { useState } from "react";


export default function useMenu() {
    const [menuOpen, setMenuOpen] = useState(false)
    function openMenu(e) {
        const { name } = e.target
        if (name === "menu") {
            setMenuOpen(!menuOpen)
        } else if (!name || name !== "menu") {
            setMenuOpen(false)
        }
    }
    return [menuOpen, openMenu]
}
