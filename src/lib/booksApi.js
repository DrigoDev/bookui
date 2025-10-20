const API_BASE_URL = 'https://localhost:44301/api/v1'

export async function fetchBooks() {
  const res = await fetch(`${API_BASE_URL}/books`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Erro ao buscar livros')
  return res.json()
}

export async function fetchBookById(id) {
  const res = await fetch(`${API_BASE_URL}/books/${id}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Erro ao buscar livro')
  return res.json()
}

export async function searchBooks(name) {
  const res = await fetch(`${API_BASE_URL}/books/search?name=${name}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Error searching book.')
  return res.json()
}

export async function rentBook(id) {
  const res = await fetch(`${API_BASE_URL}/books/${id}/rent`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
  })
  if (!res.ok) throw new Error('Erro ao atualizar status')
  return res.json()
}

export async function returnBook(id) {
  const res = await fetch(`${API_BASE_URL}/books/${id}/book-return`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
  })
  if (!res.ok) throw new Error('Erro ao atualizar status')
  return res.json()   
}