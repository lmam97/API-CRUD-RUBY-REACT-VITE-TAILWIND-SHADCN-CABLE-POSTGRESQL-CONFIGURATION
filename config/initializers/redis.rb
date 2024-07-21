require 'connection_pool'


pool_size = 20
redis_url = ENV['REDIS_URL'] || 'redis://localhost:6379/1'

REDIS = ConnectionPool.new(size: pool_size) do
  Redis.new(url: redis_url)
end

# def redis
#   redis_pool.with do |conn|
#     yield conn if block_given?
#     conn
#   end
# end