class GratitudeEntriesController < ApplicationController
  def index
    @gratitude_entries = {}

    current_user.gratitude_entries.each do |entry|
      @gratitude_entries[entry.id] = format_gratitude_entry(entry)
    end

    render json: { gratitude_entries: @gratitude_entries, prompts: GratitudeEntry::PROMPTS }
  end

  def create
    gratitude_entry = GratitudeEntry.create!(
      content: create_params[:content],
      prompt: create_params[:prompt],
      user: current_user
    )

    render json: format_gratitude_entry(gratitude_entry)
  end

  private

  def create_params
    params.permit(:content, :prompt)
  end

  def format_gratitude_entry(entry)
    {
      id: entry.id,
      content: entry.content,
      prompt: entry.prompt,
      created_at: entry.created_at.strftime("%b %d, %Y")
    }
  end
end
