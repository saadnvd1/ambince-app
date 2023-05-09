class QuotesController < ApplicationController
  def index
    @standard_quotes = {}

    StandardQuote.all.each do |quote|
      @standard_quotes[quote.id] = format_quote(quote)
    end

    @starred_quotes = {}
    current_user.starred.quotes.each do |starred|
      @starred_quotes[starred.id] = {
        id: starred.id,
        standard_quote_id: starred.starrable.id
      }
    end

    render json: { standard_quotes: @standard_quotes, starred_quotes: @starred_quotes  }
  end

  # def star_quote
  #
  # end

  private

  def update_params
    params.permit(:id, :content, :title)
  end

  def format_quote(quote)
    {
      id: quote.id,
      content: quote.content,
      author: quote.author,
      image_name: quote.image_name,
    }
  end
end
