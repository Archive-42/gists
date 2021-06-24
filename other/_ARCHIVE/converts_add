require 'IPAddr'

module ActiveRecord
  module Validations
    module ClassMethods

      def converts_addresses(*attributes)
        attributes.each do |attribute|
          attr_accessor "#{attribute}_addr".to_sym

          define_method("#{attribute}_addr".to_sym) do
            attribute_value = read_attribute(attribute)
            if attribute_value.nil?
              return nil
            end
            return IPAddr.new(attribute_value + 2**31, Socket::AF_INET)
          end

          define_method("#{attribute}_addr=".to_sym) do |addr|
            begin
              write_attribute(attribute, IPAddr.new(addr, Socket::AF_INET).to_i - 2**31)
            rescue ArgumentError
              write_attribute(attribute, nil)
            end
          end
        end
      end

    end
  end
end