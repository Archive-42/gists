class ConfigSample < Rubikon::Application::Base

  global_option :c => :config
  global_option :config, 'Override the configuration with the given file', :config_file do
    path = File.dirname config_file
    file = File.basename config_file
    config = Rubikon::Config::Factory.new(file, path).config
    @__app__.instance_eval { @config = config }
  end

  default do
    p config
  end

end