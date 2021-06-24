require 'converts_addresses'

class Host < ActiveRecord::Base
  belongs_to :subnet

  converts_addresses :ip

  validates_presence_of :ip
  validates_uniqueness_of :ip

  def validate
    Subnet.all.each do |subnet|
      if (self.ip + 2**31) & (subnet.mask + 2**31) == (subnet.network + 2**31)
        self.subnet = subnet
      end
    end

    errors.add_to_base 'There's no subnet for this IP.' if @subnet.nil?
  end
end