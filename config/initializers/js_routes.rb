JsRoutes.setup do |c|
  # Setup your JS module system:
  # ESM, CJS, AMD, UMD or nil
  c.module_type = 'ESM'
  c.exclude = [/rails_/]
  # c.compact = true
  path = '../../frontend/compiled/routes'

  FileUtils.mkdir_p(path) unless Dir.exist?(path)

  JsRoutes.generate!("#{path}/routes.compiled.js")
end