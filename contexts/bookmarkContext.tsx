'use client';

import { NewsArticle } from "@/libs/data";
import { deleteBookmark, getBookMarks, saveBookmark } from "@/libs/bookmark";
import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * Defines the shape of the data and functions that will be available
 * through the BookmarksContext.
 */
interface BookmarksContextType {
    bookmarks: NewsArticle[];
    toggleBookmark: (article: NewsArticle) => void;
    isBookmarked: (url: string) => boolean;
}

// Create the context with an undefined default value.
// The check in the useBookmarks hook will prevent it from being used outside a provider.
const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

/**
 * The Provider component that will wrap your application or parts of it.
 * It manages the bookmark state and provides it to all children.
 */
export function BookmarksProvider({ children }: { children: React.ReactNode }) {
    const [bookmarks, setBookmarks] = useState<NewsArticle[]>([]);

    // Load bookmarks from localStorage on initial client-side render.
    useEffect(() => {
        setBookmarks(getBookMarks());
    }, []);

    const isBookmarked = (url: string) => {
        return bookmarks.some(b => b.url === url);
    };

    const toggleBookmark = (article: NewsArticle) => {
        if (isBookmarked(article.url)) {
            deleteBookmark(article.url);
        } else {
            saveBookmark(article);
        }
        // After modifying localStorage, update the state to trigger a re-render.
        setBookmarks(getBookMarks());
    };

    return (
        <BookmarksContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
            {children}
        </BookmarksContext.Provider>
    );
}

/**
 * Custom hook to easily access the BookmarksContext.
 * This is the only way components should interact with the bookmarks state.
 */
export const useBookmarks = () => {
    const context = useContext(BookmarksContext);
    if (context === undefined) {
        throw new Error('useBookmarks must be used within a BookmarksProvider');
    }
    return context;
};