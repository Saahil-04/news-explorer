'use client'

import { useNews } from "@/hooks/useNews"
import Category from "./category"
import NewsCard from "./news-card"
import Searchbar from "./searchbar"
import { useRouter } from "next/navigation"
import { useBookmarks } from "@/contexts/bookmarkContext"
import Skeleton from "@mui/material/Skeleton"



export default function NewsExplorer() {
    const { news, error, loading, handleSearch, handleCategorySelect } = useNews()
    const { toggleBookmark, isBookmarked } = useBookmarks()
    const router = useRouter()

    return (

        <div className="w-full">
            <Searchbar onSearch={handleSearch} />
            <main className="pt-24 px-4">
                <div className="max-w-full mx-auto">
                    <div className="flex justify-between items-center mb-8 px-4">
                        <h1 className="text-3xl font-bold">Latest News</h1>
                        <div className="flex items-center justify-center gap-5">
                            <Category onSelectChange={handleCategorySelect} />
                            <button onClick={() => router.push('/bookmarks')} className="text-white px-5 py-2 bg-blue-500 hover:bg-blue-700 hover:cursor-pointer rounded">
                                Bookmarks
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <div key={index} className="rounded-lg overflow-hidden m-4 shadow-lg">
                                    <Skeleton variant="rectangular" animation="wave" height={180} />
                                    <div className="p-4">
                                        <Skeleton animation="wave" height={28} style={{ marginBottom: '0.75rem' }} />
                                        <Skeleton animation="wave" height={28} style={{ marginBottom: '0.75rem' }} />
                                        <Skeleton animation="wave" height={28} style={{ marginBottom: '0.75rem' }} />
                                        <Skeleton animation="wave" height={24} style={{ marginBottom: '0.75rem' }} />
                                        <Skeleton animation="wave" height={24} style={{ marginBottom: '0.75rem' }} />
                                        <Skeleton animation="wave" height={20} style={{ marginBottom: '0.75rem' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <div>An Error has occurred</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
                            {news?.map((n, i) => (
                                <NewsCard key={i} article={n} isBookmarked={isBookmarked(n.url)} onBookMarkClick={() => toggleBookmark(n)} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
