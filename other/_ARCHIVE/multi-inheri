#!/usr/bin/env ruby
#
# This code is free software; you can redistribute it and/or modify it under
# the terms of the new BSD License.
#
# Copyright (c) 2010, Sebastian Staudt

module HelloWorld
  def initialize
    puts 'Hello World!'
  end
end

module Weather
  def initialize(how)
    puts "The weather is #{how}!"
  end
end

class SeeYou

  include HelloWorld
  include Weather

  def initialize(how, sometime)
    HelloWorld.instance_method(:initialize).bind(self).call
    Weather.instance_method(:initialize).bind(self).call(how)

    puts "See you #{sometime}."
  end

end

SeeYou.new('nice', 'soon')