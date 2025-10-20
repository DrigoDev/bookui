'use client'
import Link from 'next/link'
import styles from './BookList.module.css'

export default function BookList({ books: initialBooks, onBooking }) {
    
    if (!initialBooks.length) return <div className="p-4">Nenhum livro disponível</div>

    return (
        <ul className="space-y-4">
            {initialBooks.map((b) => (
                <li
                    key={b.id}
                    className={styles.li}
                >
                    <Link
                        href={`/books/${b.id}`}
                        className={styles.item}
                    >
                        {b.name}
                    </Link>
                    <button onClick={() => onBooking(b.id, b.isBooked)}>{b.isBooked ? 'Return' : 'Rent'}</button>
                </li>
            ))}
        </ul>
    )
}
