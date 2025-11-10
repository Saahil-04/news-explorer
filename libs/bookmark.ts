import { NewsArticle } from "./data";


export function getBookMarks() {

    if (typeof window === "undefined") {
        return [];
    }
    const bookmarks = localStorage.getItem("bookmarks")
    console.log(bookmarks)
    return bookmarks ? JSON.parse(bookmarks) : [];

}

export function saveBookmark(article: NewsArticle) {
    const bookmarks = getBookMarks()
    const updatedBookmarks = [...bookmarks, article]
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks))
}

export function deleteBookmark(url: string) {
    const bookmarks = getBookMarks()
    const updatedBookmarks = bookmarks.filter((bookmark: NewsArticle) => bookmark.url !== url)
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks))
}