# This works:

# @return [String] This is attribute #1
attr_reader :attr1

# @return [Object] This is attribute #2
attr_reader :attr2

# But this won't:

# @attr_reader [String] attr1 This is attribute #1
# @attr_reader [Object] attr2 This is attribute #2
attr_reader :attr1, :attr2
