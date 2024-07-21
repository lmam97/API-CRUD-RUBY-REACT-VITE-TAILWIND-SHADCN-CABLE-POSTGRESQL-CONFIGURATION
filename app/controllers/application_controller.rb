class ApplicationController < ActionController::Base
  use_inertia_instance_props

  inertia_share do
    public_information
  end

  private

  def public_information
    {
      'IS_PRODUCTION' => Rails.env.production?,
      'BASE_URL' => ENV['BASE_URL'],
      'BASE_DOMAIN' => ENV['BASE_DOMAIN']
    }
  end
end
