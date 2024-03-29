InertiaRails.configure do |config|
  
  # # set the current version for automatic asset refreshing. A string value should be used if any.
  # config.version = nil

  # # enable default inertia rendering (warning! this will override rails default rendering behavior)
  config.default_render = true
  
  # ssr specific options
  config.ssr_enabled = true
  config.ssr_url = true

  config.deep_merge_shared_data = true
end