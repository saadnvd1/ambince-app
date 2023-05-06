class EntriesController < ApplicationController
  def index
    @entries = {}

    current_user.entries.each do |entry|
      @entries[entry.id] = format_entry(entry)
    end

    render json: { entries: @entries, latest_entry_id: current_user.entries.by_recently_created.first.try(:id) }
  end

  def update
    @entry = Entry.find(update_params[:id])
    authorize! :update, @entry

    @entry.update(update_params)
    render json: format_entry(@entry)
  end

  def create
    @entry = Entry.create!(
      journal: current_user.journals.first,
      content: "",
      title: "#{Time.now.strftime("%m/%d/%y")}",
    )

    render json: format_entry(@entry)
  end

  private

  def update_params
    params.permit(:id, :content, :title)
  end

  def format_entry(entry)
    {
      id: entry.id,
      content: entry.content,
      title: entry.title,
      journal_id: entry.journal_id,
      created_at: entry.created_at.strftime("%b %d, %Y")
    }
  end
end
