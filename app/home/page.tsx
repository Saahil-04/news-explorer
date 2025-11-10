'use client'

import Category from "@/components/category"
import NewsCard from "@/components/news-card"
import Searchbar from "@/components/searchbar"
import { useNews } from "@/hooks/useNews"
import { deleteBookmark, getBookMarks, saveBookmark } from "@/libs/bookmark"
import { NewsArticle } from "@/libs/data"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export default function HomePage() {

    const { news, error, loading, handleSearch, handleCategorySelect } = useNews()
    const [bookmarks, setBookmarks] = useState<NewsArticle[]>([])
    const router = useRouter()

    const handleBookmarkToggle = (article: NewsArticle) => {
        const isCurrentlyBookmark = bookmarks.some(b => b.url === article.url)

        if (isCurrentlyBookmark) {
            deleteBookmark(article.url)
        } else {
            saveBookmark(article)
        }
        setBookmarks(getBookMarks())
    }

    useEffect(() => {
        const bookmarkData = getBookMarks()
        setBookmarks(bookmarkData)

    }, [])

    return (
        <div>
            <div className="flex items-center justify-start">
                <Searchbar onSearch={handleSearch} />
                <Category onSelectChange={handleCategorySelect} />
                <button onClick={() => router.push('/bookmarks')} className="absolute top-0 right-5 mt-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Bookmarks
                </button>
            </div>
            <div className="pt-30 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
            lg:grid-cols-4 gap-4">

                {loading && (
                    <div>Loading...</div>
                )}

                {error && (
                    <div>An Error has occured</div>
                )}

                {news?.map((n, i) => (
                    <NewsCard key={i} article={n} isBookmarked={bookmarks.some(b => b.url === n.url)} onBookMarkClick={() => handleBookmarkToggle(n)} />
                ))}
            </div>

        </div>


    )
}