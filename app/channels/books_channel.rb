class BooksChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    stream_from 'books_channel'
  end

  def unsubscribed
    stop_all_streams
    # Any cleanup needed when channel is unsubscribed
  end
end
