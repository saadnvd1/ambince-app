class QuotesController < ApplicationController
  def index
    @standard_quotes = {}

    StandardQuote.all.each do |quote|
      @standard_quotes[quote.id] = format_quote(quote)
    end

    @starred_quotes = {}
    current_user.starred.quotes.each do |starred|
      @starred_quotes[starred.starrable.id] = format_starred_quote(starred)
    end

    render json: { standard_quotes: @standard_quotes, starred_quotes: @starred_quotes }
  end

  def toggle_star
    standard_quote_id = toggle_star_params[:id]
    starred_quote = current_user.starred.quotes.find_by(starrable_id: standard_quote_id)

    if starred_quote.blank?
      starred = Starred.create!(
        user: current_user,
        starrable: StandardQuote.find_by(id: standard_quote_id)
      )

      render json: { starred_quote: format_starred_quote(starred) }
    else
      starred_quote.destroy!
    end
  end

  private

  def toggle_star_params
    params.permit(:id)
  end

  def update_params
    params.permit(:id, :content, :title)
  end

  def format_starred_quote(starred)
    {
        id: starred.id,
        standard_quote_id: starred.starrable.id
    }
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
