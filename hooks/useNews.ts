import { useCallback, useEffect, useState } from "react"
import { NewsArticle, getNewsByCategory, getNewsData } from "@/libs/data"

export function useNews() {

    const [news, setNews] = useState<NewsArticle[] | null>([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSearch = useCallback(async (query?: string) => {
        setLoading(true)
        setError(false)
        setNews([])
        try {
            const fetchData = await getNewsData(query ?? "")
            if (fetchData.length == 0 || fetchData == null) {
                setError(true)
            } else {
                setNews(fetchData)
            }
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }, [])

    const handleCategorySelect = useCallback(async (category: string) => {
        setLoading(true)
        setError(false)
        setNews([])
        try {
            const fetchData = await getNewsByCategory(category ?? "")
            if (fetchData == null || fetchData.length == 0) {
                setError(true)
            } else {
                // Normalise the response so the UI (NewsCard) can render both
                // article-like objects and source-like objects returned by
                // the category endpoint.
                const normalized = fetchData.map((item: any) => {
                    // If item already looks like an article (has title), use it
                    if (item && (item.title || item.urlToImage || item.source && typeof item.source === 'string')) {
                        return item as NewsArticle
                    }

                    // Otherwise assume it's a "source" object and map fields
                    // to the shape the app expects.
                    return {
                        title: item.name ?? item.id ?? 'Untitled',
                        // ensure types match the imported `News` shape (use empty string when missing)
                        description: item.description ?? '',
                        urlToImage: item.urlToImage ?? '',
                        source: item.name ?? item.id ?? 'Unknown',
                        url: item.url ?? '#',
                    } as NewsArticle
                })

                setNews(normalized)
            }
        } catch (error) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        handleSearch()
    }, [handleSearch])

    return { news, error, loading, handleSearch ,handleCategorySelect}

}