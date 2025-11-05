import axios from "axios";

export interface News {
    title: string;
    description: string;
    urlToImage: string;
    url: string;
    source: {
        id: string;
        name: string;
    }
}

export async function getNewsData(query?: string) {
    try {
        const res = query
            ? await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`)
            : await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`)

        return res.data.articles

    } catch (err) {
        console.log(err)
        throw new Error("Something went wrong")
    }

}