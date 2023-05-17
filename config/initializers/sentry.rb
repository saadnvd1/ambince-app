Sentry.init do |config|
  config.dsn = "https://718a54e3309844fc800c2ca633503167@o4505200449421312.ingest.sentry.io/4505200449421312"
  config.breadcrumbs_logger = [:active_support_logger, :http_logger]
  config.enabled_environments = %w[production]

  # Set traces_sample_rate to 1.0 to capture 100%
  # of transactions for performance monitoring.
  # We recommend adjusting this value in production.
  config.traces_sample_rate = 1.0
  # or
  config.traces_sampler = lambda do |context|
    true
  end
end
