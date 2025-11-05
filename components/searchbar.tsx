"use client"

import { useState } from "react"

type SearchbarProps = {
    onSearch: (query: string) => void;
}

export default function Searchbar({ onSearch }: SearchbarProps) {

    const [input, setInput] = useState("")

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(input)
        onSearch(input)
    }

    return (
        <div className="fixed top-0 left-0 right-0 z-50 py-4 bg-white shadow-md">
            <form onSubmit={handleSearch} className="flex items-center w-full max-w-2xl mx-auto">
                <div className="grow">
                    <label htmlFor="search-input" className="sr-only">Search</label>
                    <input
                        id="search-input"
                        type="text"
                        placeholder="Search for news..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full border-2 border-gray-300 p-2 rounded-l-lg focus:outline-none focus:border-blue-500" />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 focus:outline-none">
                    Search
                </button>
            </form>
        </div >

    )
}