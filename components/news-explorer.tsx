'use client'

import { useNews } from "@/hooks/useNews"
import { deleteBookmark, getBookMarks, saveBookmark } from "@/libs/bookmark"
import { NewsArticle } from "@/libs/data"
import { useEffect, useState } from "react"
import Category from "./category"
import NewsCard from "./news-card"
import Searchbar from "./searchbar"
import { useRouter } from "next/navigation"
import { useBookmarks } from "@/contexts/bookmarkContext"

export default function NewsExplorer() {
    const { news, error, loading, handleSearch, handleCategorySelect } = useNews()
    const { toggleBookmark, isBookmarked } = useBookmarks()
    const router = useRouter()




    return (
        <div>
            <Searchbar onSearch={handleSearch} />
            <main className="pt-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold">Latest News</h1>
                        <div className="flex items-center justify-center">
                            <Category onSelectChange={handleCategorySelect} />
                            <button onClick={() => router.push('/bookmarks')} className="text-white px-5 py-2 bg-blue-500 hover:bg-blue-700 rounded">Bookmarks</button>
                        </div>
                    </div>

                    {loading && <div>Loading...</div>}
                    {error && <div>An Error has occurred</div>}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {news?.map((n, i) => (
                            <NewsCard key={i} article={n} isBookmarked={isBookmarked(n.url)} onBookMarkClick={() => toggleBookmark(n)} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}
