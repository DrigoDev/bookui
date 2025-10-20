'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import BookList from '@/components/BookList'
import { fetchBooks } from '@/lib/booksApi'
import { rentBook, returnBook, searchBooks } from '@/lib/booksApi'
import styles from "./page.module.css";

export default function Dashboard() {
    const router = useRouter()
    const [books, setBooks] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        const auth = localStorage.getItem('auth')
        if (!auth) {
            router.push('/login')
            return
        }

        async function loadBooks() {
            try {
                const data = await fetchBooks()
                setBooks(data)
                console.log("data", data)
            } catch (error) {
                console.error(error)
            }
        }
        loadBooks()
    }, [router])

    async function handleBooking(bookId, isBooked) {

        try {
            var updated;
            console.log(isBooked)
            if (isBooked) updated = await returnBook(bookId)
            else updated = await rentBook(bookId)

            setBooks(prev =>
                prev.map(b => (b.id === bookId ? { ...b, isBooked: updated.isBooked } : b))
            )
        }
        catch (error) { console.log(error) }
    }

    async function getBookByName() {
        try {
            const data = await searchBooks(search)
            console.log("book", data)
            setBooks(data)
        } catch (error) {
            console.error('Error fetching book:', error)
        }
    }

    function handleLogout() {
        localStorage.removeItem('auth')
        router.push('/login')
    }

    return (
        <div className="p-10">

            <div className={styles.header}>
                <h1>Book Shop</h1>
                <button
                    onClick={handleLogout}                    
                >
                    Logout
                </button>
            </div>

            <div className="flex items-center mb-6 space-x-2">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={getBookByName}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >Search
                </button>
            </div>

            <br />

            <BookList books={books} onBooking={handleBooking} />
        </div>
    )
}