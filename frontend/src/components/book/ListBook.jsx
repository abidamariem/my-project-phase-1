import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CardBook from './CardBook';

export default function ListBook() {
    const [books, setBooks] = useState({
        books: [],
        isLoading: false,
    });
    useEffect(() => {
        const fetchBooks = async () => {
            const books = await axios.get("http://localhost:3310/api/book", { withCredentials: true })
            setBooks({
                books: books.data,
                isLoading: false
            })
        }
        fetchBooks()
    }, [])
// {books.books.map((book) => (<BlogCard key={blog._id} blog={blog} />))}
  return (
    <div class="w-75 ml-0 mr-0 mx-auto">
         <h1>Liste des livres </h1>
       <ListGroup>
       {books.books.map((book) => (<CardBook key={book._id} book={book} />))}
    </ListGroup>
    </div>
  )
}
