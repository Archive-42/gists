require 'converts_addresses'

class Subnet < ActiveRecord::Base
  has_many :hosts

  converts_addresses :network, :mask

  validates_presence_of     :name
  validates_numericality_of :network,
                            :only_integer => true,
                            :greater_than_or_equal_to => -2**31,
                            :less_than => 2**31
  validates_numericality_of :mask,
                            :only_integer => true,
                            :greater_than_or_equal_to => -2**31,
                            :less_than => 2**31
  validates_uniqueness_of   :name
  validates_uniqueness_of   :network, :scope => :mask
end