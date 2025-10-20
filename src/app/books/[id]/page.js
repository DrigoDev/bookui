'use client'
import Link from 'next/link'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { fetchBookById } from '@/lib/booksApi'
import * as React from 'react'

export default function BookDetails({ params }) {
    const router = useRouter()
    const [book, setBook] = React.useState(null)
    const { id } = React.use(params)

    React.useEffect(() => {
        const auth = localStorage.getItem('auth')
        if (!auth) {
            router.push('/login')
            return
        }

        async function loadBooks() {
            try {
                const data = await fetchBookById(id)
                setBook(data)
            } catch (error) {
                console.error(error)
            }
        }
        console.log("book" + book)
        loadBooks()
    }, [router])

    if (!book) return <div className="p-10">Book not found</div>

    return (
        <div className="p-10">
            <h1>Book Details</h1>
            <br/>
            <p className="text-2xl font-bold mb-3">Name: {book.name}</p>            
            <p className="text-2xl font-bold mb-3">Author: Loren...</p>            
            <p className="text-2xl font-bold mb-3">Description: Loren...</p>            
        </div>
    )
}