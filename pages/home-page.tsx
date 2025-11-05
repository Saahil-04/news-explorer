'use client'

import NewsCard from "@/components/news-card"
import Searchbar from "@/components/searchbar"
import { getNewsData, News } from "@/libs/data"
import { useEffect, useState } from "react"

export default function HomePage() {

    const [news, setNews] = useState<News[] | null>([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSearch = async (query: string) => {
        setLoading(true)
        setError(false)
        setNews([])
        try {
            const fetchData = await getNewsData(query)
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
    }

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true)
            setError(false)
            try {
                const data = await getNewsData()

                if (data.length == 0 || data == null) {
                    setError(true)
                } else {
                    setNews(data)
                }
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchNews()
    }, [])

    return (
        <div>
            <Searchbar onSearch={handleSearch} />
            <div className="pt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
            lg:grid-cols-4 gap-4">
                {loading && (
                    <div>Loading...</div>
                )}
                {error && (
                    <div>An Error has occured</div>
                )}

                {news?.map((n, i) => (
                    <NewsCard key={i} title={n.title} description={n.description} urlToImage={n.urlToImage} source={n.source.name} url={n.url} />
                ))}
            </div>

        </div>


    )
}