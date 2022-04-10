import dbconn from "../database";

export type Book = {
     id?: number;
     title: string;
     author?: string;
     totalPages?: number;
     summary?: string;
}

export class BookStore {
  async index(): Promise<Book[]> {
    try {
      const conn = await dbconn.connect()
      const sql = 'SELECT * FROM books'

      const result = await conn.query(sql)

      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get books. Error: ${err}`)
    }
  }

  async show(id: string): Promise<Book> {
    try {
    const sql = 'SELECT * FROM books WHERE id=($1)'
  
    const conn = await dbconn.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find book ${id}. Error: ${err}`)
    }
  }

  async create(b: Book): Promise<Book> {
      try {
    const sql = 'INSERT INTO books (title, author, total_pages, summary) VALUES($1, $2, $3, $4) RETURNING *'
    
    const conn = await dbconn.connect()

    const result = await conn
        .query(sql, [b.title, b.author, b.totalPages, b.summary])

    const book = result.rows[0]

    conn.release()

    return book
      } catch (err) {
          throw new Error(`Could not add new book ${b.title}. Error: ${err}`)
      }
  }

  async delete(id: string): Promise<Book> {
      try {
    const sql = 'DELETE FROM books WHERE id=($1)'
    
    const conn = await dbconn.connect()

    const result = await conn.query(sql, [id])

    const book = result.rows[0]

    conn.release()

    return book
      } catch (err) {
          throw new Error(`Could not delete book ${id}. Error: ${err}`)
      }
  }
}