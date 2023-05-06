class JournalController < ApplicationController
  def index

  end

  def format_notebook(notebook)
    {
      id: notebook.id,
      name: notebook.name,
      meta: notebook.meta,
      parent_notebook_id: notebook.parent.try(:id),
      subnotebook_ids: notebook.descendants.pluck(:id),
    }
  end

  def format_note(note)
    {
      id: note.id,
      title: note.title,
      content: note.content,
      notebook_id: note.notebook_id,
      created_at: note.created_at.strftime("%m/%d/%Y"),
      updated_at: note.updated_at
    }
  end
end
