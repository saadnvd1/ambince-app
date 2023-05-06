class Ability
  include CanCan::Ability

  def initialize(user)
    return unless user.present?

    # Notebook.tap do |klass|
    #   can :create, Notebook, user: user
    #   can :update, Notebook, user: user
    # end

    Entry.tap do |klass|
      can :update, Entry, user: user
      can :create, Entry, user: user
    end
  end
end
