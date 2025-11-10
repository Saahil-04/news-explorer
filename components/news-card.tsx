"use client"

import { NewsArticle } from "@/libs/data";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";

type NewsCardProps = {
    article: NewsArticle
    isBookmarked?: boolean;
    onBookMarkClick: () => void;
}

export default function NewsCard({ article: { title, description, urlToImage, source, url }, isBookmarked, onBookMarkClick }: NewsCardProps) {



    const truncatedDescription = description && description.length > 100
        ? `${description.substring(0, 100)}...`
        : description

    const handleBookmarkClick = () => {
        onBookMarkClick()
    }

    return (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white m-4 flex flex-col">
            {urlToImage ? (
                <img className="w-full h-48 object-cover" src={urlToImage} alt={title} />
            ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image Available</span>
                </div>
            )}
            <div className="px-6 py-4 grow">
                <div className="font-bold text-xl mb-2 text-gray-800">{title}</div>
                <p className="text-gray-600 text-base">{truncatedDescription}</p>
            </div>
            <div className="flex items-center justify-around px-6 pt-4 pb-2 mb-4">
                <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-500 hover:bg-blue-700 text-center text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">Read More</a>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-center text-sm font-semibold text-gray-700 float-right">{source.name}</span>
                <div onClick={handleBookmarkClick} className="font-medium p-4 hover:cursor-pointer ">
                    {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                </div>
            </div>
        </div>
    )
}