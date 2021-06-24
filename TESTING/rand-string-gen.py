
'''
Generating random strings from regex-like expressions.

Generates sequences of random characters derived from a production 
expression with a grammar approximately identical to that used by Regular 
Expressions.  

This is intended for data-driven testing (fuzzing) of input validators and
parsers that use regex or regex-like semantics.

Example, Generates a Random Email Address:
-- fuzzex.generate( "[a-zA-Z0-9._]+@[a-zA-Z0-9._]+\\\\.[a-z]+" )

Where this program Breaks From Regex:
-- Fuzzex does not support "non-greedy" repetition. (e.g. "a*?")
-- Fuzzex does not currently support "non-capturing" groups.
-- Fuzzex is derived from the "Extended Regex" dialect most frequently used.
-- Fuzzex is 8-bit ASCII-oriented; this matches Python's RE, but not some others.

Where this snippet Is Not The Right Tool:  (Go use Sulley or Peach)
-- Fuzzing semantic logic; e.g. it might generate data that looks like BASE-64,
   but it might not decode.


'''

import re, sys, random

def op_dat( data ):
	def op_dat_fn( vm ):
		vm.write( data )
	return op_dat_fn

def op_seq( seq ):
	def op_seq_fn( vm ):
		for op in seq: 
			op( vm )
		return True
	return op_seq_fn

def op_alt( alt ):
	def op_alt_fn( vm ):
		vm.choose( alt )( vm )
	return op_alt_fn

def op_set( ix, op ):
	def op_set_fn( vm ):
		with vm.capture( ix ): op( vm )
	return op_set_fn

def op_ref( ix ):
	def op_ref_fn( vm ):
		vm.write( vm.group( ix ) )
	return op_ref_fn

def op_nul( ):
	def op_nul_fn( vm ):
		pass
	return op_nul_fn

def op_rpt( op, m, n ):
	if m == n:
		def op_fix_rpt_fn( vm ):
			for i in range( 0, m ):
				op( vm )
		return op_fix_rpt_fn
	
	if m > n: n, m = m, n	
	r = n - m

	def op_rpt_fn( vm ):
		for i in range( 0, m + vm.choose( r ) ):
			op( vm )

	return op_rpt_fn

def op_opt( op ):
	def op_opt_fn( vm ):
		if vm.choose( 2 ): op( vm )
	return op_opt_fn

def op_rng( s ):
	s = ''.join( s )
	def op_rng_fn( vm ):
		vm.write( vm.choose( s ) )
	return op_rng_fn

any_op = op_rng( map( chr, range( 0, 255 ) ) )

def mk_seq_op( seq ):
	"unifies a sequence of 0 to N requirements into a minimal operation"
	if not seq: return op_nul( )
	if callable( seq ): return seq
	if isinstance( seq, str ): return op_dat( seq )

	out = []; buf = ''
	for op in seq:
		if isinstance( op, str ):
			buf += op
		else:
			if buf:
				out.append( op_dat( buf ) )
				buf = ''
			if op:
				out.append( op )
	if buf:
		out.append( op_dat( buf ) )

	if len( out ) == 1:		
		return out[0]
	else:
		return op_seq( out )

class Error( Exception ):
	pass

escapes = {
	'n' : '\n',
	'r' : '\r',
	't' : '\t',
	'v' : '\v',
	'0' : '\0'
}

rx_octet = re.compile( '([0-8][0-8][0-8]|[0])' )
rx_refer = re.compile( '([0-9][0-9]?)')
rx_range = re.compile( '[^\\\\]')
rx_repeat = re.compile( '([0-9]+)(,[0-9]+)?\\}' )

class Compiler:
	def __init__( self, src ):
		self.src = src
		self.ofs = 0
		self.opens = 0
		self.closes = 0
		self.limit = 4

	def parse_rpt( self, op ):
		m = rx_repeat.match( self.src, self.ofs )
		if not m:
			raise Error( '"{" followed without matching "}"') #TODO: Python ignores this silently.
		self.ofs = m.end( )
		if not m.group(2):
			n = int( m.group( 1 ) )
			return op_rpt( op, n, n )
		n = int( m.group(2)[1:] )
		m = int( m.group(1) )
		return op_rpt( op, m, n )

	def parse_rng( self ):
		end = len( self.src )
		if self.ofs >= end:
			raise Error( '"[" at end of expression' )

		if self.src[self.ofs] == '^':
			self.ofs += 1
			x = self.parse_rng_items( )
			s = set( )
			for i in range( 0, 127 ): #TODO: configurable
				c = chr( i )
				if c not in x: s.add( c )
		else:
			s = self.parse_rng_items( )

		return op_rng( s )

	def parse_rng_items( self ):
		end = len( self.src )
		s = set()
		while self.ofs < end:
			ch = self.src[ self.ofs ]
			if ch == ']': 
				self.ofs += 1
				return s

			a = self.parse_rng_item( )
			if self.src[ self.ofs ] == '-':
				self.ofs += 1
				b = self.parse_rng_item( )
				for i in range( ord( a ), ord( b ) + 1 ):
					ch = chr( i )
					s.add( ch )
			else:
				s.add( a )

		raise Error( 'unmatched "["' )

	def parse_rng_item( self ):
		end = len( self.src )
		if self.ofs >= end: raise Error( '"[" at end of expression' )
		ch = self.src[ self.ofs ]
		self.ofs += 1
		if ch == '\\':
			if self.ofs >= end: raise Error( '"\\" at end of expression' )

			m = rx_octet.match( self.src, self.ofs )
			if m:
				self.ofs = m.end( )
				return chr( int( m.group(1), 8 ) )
		else:
			return ch

	def parse_esc( self ):
		if self.ofs >= len( self.src ):
			raise Error( '"\\" at end of expression' )

		m = rx_octet.match( self.src, self.ofs )
		if m:
			self.ofs = m.end( )
			return op_data( chr( int( m.group(1), 8 ) ) )
		
		m = rx_refer.match( self.src, self.ofs )
		if m:
			self.ofs = m.end( )
			ix = int( m.group( 1 ), 8 )
			if ix > self.closes:
				raise Error( 'illegal forward reference' ) # not that there are any legal ones.
			return op_ref( ix )
		
		ch = self.src[self.ofs]
		self.ofs += 1
		return escapes.get( ch, ch )				

	def parse_expr( self, inner = False ):
		"parses a possibly branched expression yielding none or an operation"
		opt = []	 # We start with an empty sequence of requirements.
		opts = [opt] # And a empty list of branches.
		end = len( self.src )

		while self.ofs < end:
			ch = self.src[ self.ofs ]
			self.ofs += 1

			if ch == '|':
				opt = []
				opts.append( opt )
			elif ch =='(':
				self.opens += 1
				opt.append( op_set( self.opens, self.parse_expr( True ) ) )
				self.closes += 1
			elif ch == ')':
				if not inner: raise Error( 'unmatched ")"' )
				inner = False
				break
			elif ch == '\\':
				opt.append( self.parse_esc( ) )
			elif ch == '.':
                                opt.append( any_op )
			elif ch == '*':
				if not opt: raise Error( 'nothing to repeat' )
				#TODO: Catch and Report multiple-repeat.
				opt[-1] = op_rpt( mk_seq_op( opt[-1] ), 0, self.limit )
			elif ch == '+':
				if not opt: raise Error( 'nothing to repeat' )
				#TODO: Catch and Report multiple-repeat.
				opt[-1] = op_rpt( mk_seq_op( opt[-1] ), 1, self.limit )
			elif ch == '?':
				if not opt: raise Error( 'nothing to repeat' )
				#TODO: Catch and Report multiple-repeat.
				opt[-1] = op_opt( mk_seq_op( opt[-1] ) )
			elif ch == '[':
				opt.append( self.parse_rng( ) )
			elif ch == '{':
				if not opt: raise Error( 'nothing to repeat' )
				#TODO: Catch and Report multiple-repeat.
				opt[-1] = self.parse_rpt( mk_seq_op( opt[-1] ) )
			else:
				opt.append( ch )
		
		if inner:
			raise Error( 'unmatched "("' )

		opts = filter( lambda x:x, opts )
		if not opts:
			return op_nul( )
		elif len( opts ) == 1:
			return mk_seq_op( opt )
		else:
			return op_alt( map( mk_seq_op, opts ) )
	
class Generator:
	def __init__( self, root ):
		if not root: raise Exception #TODO
		self.root = root

	def generate( self, seed = None, vm = None ):
		if vm is None: vm = Vm( seed )		
		self.root( vm )
		return str( vm )

class Vm:
	def __init__( self, seed = None ):
		self.rng = random.WichmannHill( seed )
		self.out = []
		self.groups = {}
	
	def choose( self, field ):
		"selects a random value from 0 .. field - 1, or the list"
		if isinstance( field, int ):
			return self.rng.randint( 0, field )
		else:
			return self.rng.choice( field )
	
	def write( self, data ):
		self.out.append( data )

	def group( self, tag ):
		return self.groups.get( tag, '' )

	def capture( self, tag ):
		return Capture( self, tag )

	def __str__( self ):
		return ''.join( self.out )

	def __repr__( self ):
		return '<fuzzex.vm %r>' % str( self )

class Capture:
	def __init__( self, vm, ref ):
		self.vm = vm
		self.ref = ref
	
	def __enter__( self ):
		self.out = self.vm.out
		self.vm.out = []

	def __exit__( self, errtyp, errval, errtb ):
		if errtyp or errval: return False

		vm = self.vm
		data = ''.join( vm.out )
		vm.out = self.out
		vm.write( data )
		vm.groups[self.ref] = data

def generate( fx, seed = None, vm = None ):
	if isinstance( fx, str ):
		fx = compile( fx )
	return fx.generate( seed, vm )

def compile( data ):
	return Generator( Compiler( data ).parse_expr( ) )

def test( ex, seed = None ):
	r = re.compile( '^' + ex + '$' )
	data = generate( ex, seed )
	k = r.match( data )
	print >>sys.stderr, 'TESTING: %s, RESULT: %r, %s' % ( 
		ex, data, "PASSED" if k else "FAILED" 
	)
	return k

def test_batch( seed = None ):
	return ( test( 'a' )
		 and test( 'a|b', seed )
		 and test( 'a|b|c', seed )
		 and test( 'aa', seed )
		 and test( 'aa|b', seed )
		 and test( 'aa|bb', seed )
		 and test( 'aa|bb|c', seed )
		 and test( 'a|bb|c', seed )
		 and test( 'a|bb|cc', seed )
		 and test( '(a|bb|cc)z\\1', seed )
		 and test( 'a?b', seed )
		 and test( 'a*b', seed )
		 and test( 'a+b', seed )
		 and test( '[a]', seed )
		 and test( '[-a-c]', seed )
		 and test( '[^a-zA-Z0-9]', seed )
		 and test( "^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)([?]([^#]*))?(#(.*))?", seed )
		 and test( "[a-zA-Z0-9._]+@[a-z0-9._]+\\.[a-z]+", seed )
		 and test( "[a-z]{3,8}", seed )
		 and test( ".{3,8}", seed )
	)

__all__ = [
	'compile', 'generate', 'Generator'
]

if __name__ == '__main__':
	test_batch( )
