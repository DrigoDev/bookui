'use client'
import Link from 'next/link'

export default function BookList({ books: initialBooks, onBooking }) {
    
    if (!initialBooks.length) return <div className="p-4">Nenhum livro disponível</div>

    return (
        <ul className="space-y-4">
            {initialBooks.map((b) => (
                <li
                    key={b.id}
                    className="border p-4 rounded-xl bg-white shadow-sm hover:shadow-md"
                >
                    <Link
                        href={`/books/${b.id}`}
                        className="text-lg font-semibold text-blue-700 hover:underline"
                    >
                        {b.name}
                    </Link>
                    <button onClick={() => onBooking(b.id, b.isBooked)}>{b.isBooked ? 'Return' : 'Rent'}</button>
                </li>
            ))}
        </ul>
    )
}
