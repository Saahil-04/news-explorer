"use client"

import NewsCard from "@/components/news-card"
import { useBookmarks } from "@/contexts/bookmarkContext"

export default function BookmarksPage() {

    const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks()

    return (
        <div>
            {bookmarks.length === 0 && (
                <div>No Bookmarks Found</div>
            )}
            <div className="pt-30 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
            lg:grid-cols-4 gap-4" >
                {
                    bookmarks.map((b, id) => (
                        <NewsCard key={id} article={b} isBookmarked={isBookmarked(b.url)} onBookMarkClick={() => toggleBookmark(b)} />
                    )
                    )}


            </div>
        </div>
    )
}