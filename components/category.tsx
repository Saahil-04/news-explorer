"use client"

import { useState } from "react"

type CategoryProps = {
    onSelectChange: (value: string) => void;
}

export default function Category({ onSelectChange }: CategoryProps) {

    const [selectedValue, setSelectedValue] = useState("general")

    const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setSelectedValue(value)
        onSelectChange(value)
    }

    return (

        <div className="absolute top-0 left-5 mt-20">
            <select
                name="category"
                id="category"
                value={selectedValue}
                onChange={handleSelectionChange}
                className="
                    appearance-none cursor-pointer
                    bg-blue-500 hover:bg-blue-700 text-white font-bold
                    py-2 pl-3 pr-8 rounded 
                    border border-slate-200 
                    transition duration-300 ease-in-out
                    focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-300
                "
            >
                <option value="business">Business</option>
                <option value="entertainment">Entertainment</option>
                <option value="general">General</option>
                <option value="health">Health</option>
                <option value="science">Science</option>
                <option value="sports">Sports</option>
                <option value="technology">Technology</option>
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 h-5 w-5 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
        </div>

    )
}