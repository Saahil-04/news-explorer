"use client"

import NewsCard from "@/components/news-card"
import { deleteBookmark, getBookMarks, saveBookmark } from "@/libs/bookmark"
import { NewsArticle } from "@/libs/data"
import { useEffect, useState } from "react"

export default function BookmarksPage() {

    const [bookmarks, setBookmarks] = useState<NewsArticle[]>([])

    const handleToggleBookmark = (article: NewsArticle) => {
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
            {bookmarks.length === 0 && (
                <div>No Bookmarks Found</div>
            )}
            <div className="pt-30 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
            lg:grid-cols-4 gap-4" >
                {
                    bookmarks.map((b, id) => (
                        <NewsCard key={id} article={b} onBookMarkClick={() => handleToggleBookmark(b)} />
                    )
                    )}


            </div>
        </div>
    )
}