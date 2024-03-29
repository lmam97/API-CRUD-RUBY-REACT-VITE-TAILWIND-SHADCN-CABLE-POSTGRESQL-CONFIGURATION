class ApplicationController < ActionController::Base
  use_inertia_instance_props

  before_action do
    @_inertia_skip_props = @_inertia_skip_props + ['current_user']
  end

  
end
