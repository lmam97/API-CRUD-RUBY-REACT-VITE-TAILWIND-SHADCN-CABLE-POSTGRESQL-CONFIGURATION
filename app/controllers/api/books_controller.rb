class Api::BooksController < ApplicationController
  def create
    book = Book.new(book_params)
    if book.save
      ActionCable.server.broadcast("cables_channel", {
        cable_type: "BOOKS",
        cable_event: "LOAD",
        data: {
          action: book,
          status: "create"
        }
      })

      render json: {
        message: "Create successfully."
      }, status: 201
    else
      p error
      render json: {}, status: 422
    end
  end

  def update
    book = Book.find_by(id: params[:id])
    if book.update(book_params)
      ActionCable.server.broadcast("cables_channel", {
        cable_type: "BOOKS",
        cable_event: "LOAD",
        data: {
          action: book,
          status: "update"
        }
      })

      render json: {
        message: "Update successfully."
      }, status: 201
    else
      p error
      render json: {}, status: 422
    end
  end

  def delete
    book = Book.find_by(id: params[:id])
    if book.delete
      render json: {
        message: "Delete successfully."
      }, status: 201
    else
      p error
      render json: {}, status: 422
    end
  
  end

  def list_books
    query = params[:query] || ''

    books = Book.order(created_at: :desc)
                      .where('LOWER(title) LIKE :query OR LOWER(autor) LIKE :query', {
                        query: "%#{query.downcase}%"
                      })
                      .or(Book.where(id: query.to_i))
                      .paginate(page: params[:page], per_page: 5)

    books_formatter = books.map do |book|
                    {
                      id: book.id,
                      title: book.title,
                      autor: book.autor,
                      price: book.price
                    }
                  end

    render json: {
      rows: books_formatter,
      pagination: {
        current_page: books.current_page,
        total_pages: books.total_pages,
        next_page: books.next_page,
        prev_page: books.previous_page,
      }
    }, status: :ok
  end

  private

  def book_params
    params.require(:book).permit(
      :title,
      :autor,
      :price
    )
  end
end
