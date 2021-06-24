module MyModule

    # Defines method_missing
    module ClassMethods
      def method_missing(method)
        puts "Method: \"#{method}\" does not exist."
      end
    end

    # Will add method_missing to MyModule itself
    extend ClassMethods

    # Will add  method_missing to all modules/classes that include MyModule
    def self.included(mod)
      mod.extend ClassMethods
    end

    # Public methods.....
    def self.doSomething(parameter)
       ...
    end
    
    def self.doSomethingElse()
       ...
    end

end

# EOF

I want the following, as demonstrated in IRB:

> require "mymodule"
=> true
> MyModule.doSomething()
=> (output)
> MyModule.doesNotExist()
=> Method: "doesNotExist" does not exist.
