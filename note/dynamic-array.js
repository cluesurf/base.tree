var __ArrayList__ = function ( initialcapacity , growthrate , alloc , realloc ) {

	var grs = growthrate * growthrate ;

	var ArrayList = function ( ) {

		this.data = alloc( initialcapacity ) ;
		this.capacity = initialcapacity ;
		this.length = 0 ;

	} ;

	var Iterator = function ( reference , current ) {
		this.reference = reference ;
		this.current = current ;
	} ;

	var ReverseIterator = function ( reference , current ) {
		this.reference = reference ;
		this.current = current ;
	} ;

	ArrayList.prototype.get = function ( index ) {
		return this.data[index] ;
	} ;

	ArrayList.prototype.set = function ( index , value ) {
		this.data[index] = value ;
	} ;

	ArrayList.prototype.grow = function ( len ) {

		if ( this.capacity < len ) {

			this.capacity = len * growthrate ;

			this.data = realloc( this.data , this.capacity ) ;

		}

	} ;

	ArrayList.prototype.shrink = function ( len ) {

		if ( this.capacity >= len * grs ) {

			this.capacity = len * growthrate ;

			this.data = realloc( this.data , this.capacity ) ;

		}

	} ;

	ArrayList.prototype.moveright = function ( i , j , k ) {

		while ( --j >= i ) {
			this.data[j+k] = this.data[j] ;
		}

	} ;

	ArrayList.prototype.moveleft = function ( i , j , k ) {

		for ( ; i < j ; ++i ) {
			this.data[i-k] = this.data[i] ;
		}

	} ;

	ArrayList.prototype.insertAt = function ( index , value ) {

		var len ;

		len = this.length ;

		++this.length ;

		this.grow( this.length ) ;

		this.moveright( index , len , 1 ) ;

		this.data[index] = value ;

		return this.iterator( index ) ;

	} ;

	ArrayList.prototype.eraseAt = function ( index ) {

		this.eraseFromTo( index , index + 1 ) ;

	} ;

	ArrayList.prototype.eraseFromTo = function ( i , j ) {

		var n ;

		n = j - i ;

		this.moveleft( j , this.length , n ) ;

		this.length -= n ;

		this.shrink( this.length ) ;

	} ;


	ArrayList.prototype.insertAfter = function ( iterator , value ) {
		return this.insertAt( iterator.current + 1 ,  value ) ;
	} ;

	ArrayList.prototype.insertBefore = function ( iterator , value ) {
		return this.insertAt( iterator.current , value ) ;
	} ;

	ArrayList.prototype.unshift = function ( value ) {
		return this.insertAfter( this.begin( ) , value ) ;
	} ;

	ArrayList.prototype.push = function(value){
		return this.insertBefore( this.end( ) , value ) ;
	} ;

	ArrayList.prototype.erase = function ( iterator ) {

		var index ;

		index = iterator.current ;

		this.eraseAt( index ) ;

		return this.iterator( index ) ;

	} ;

	ArrayList.prototype.rerase = function ( iterator ) {

		var index ;

		index = iterator.current ;

		this.eraseAt( index ) ;

		return this.iterator( index - 1 ) ;

	} ;

	ArrayList.prototype.eraserange = function ( first , last ) {

		this.eraseFromTo( first.current , last.current ) ;

		return first.copy( ) ;

	} ;

	ArrayList.prototype.reraserange = function ( first , last ) {

		this.eraseFromTo( last.current + 1 , first.current + 1 ) ;

		return last.copy( ) ;

	} ;

	ArrayList.prototype.shift = function ( ) {

		var it , e ;

		it = this.begin( ) ;
		e = it.next( ) ;

		if ( e.done ) {
			return null ;
		}

		this.rerase( it ) ;

		return e.value ;

	} ;

	ArrayList.prototype.pop = function ( ) {

		var it , e ;

		it = this.rbegin( ) ;
		e = it.next( ) ;

		if ( e.done ) {
			return null ;
		}

		this.erase( it ) ;

		return e.value ;

	} ;

	ArrayList.prototype.clear = function ( ) {

		this.data = realloc( this.data , initialcapacity ) ;
		this.capacity = initialcapacity ;
		this.length = 0 ;

		return this ;

	} ;

	ArrayList.prototype.iterator = function ( index ) {
		return new Iterator( this , index ) ;
	} ;

	ArrayList.prototype.riterator = function ( index ) {
		return new ReverseIterator( this , index ) ;
	} ;

	ArrayList.prototype.begin = function ( ) {
		return this.iterator( -1 ) ;
	} ;

	ArrayList.prototype.end = function ( ) {
		return this.iterator( this.length ) ;
	} ;

	ArrayList.prototype.rbegin = function ( ) {
		return this.riterator( this.length );
	} ;

	ArrayList.prototype.rend = function ( ) {
		return this.riterator( -1 ) ;
	} ;

	Iterator.prototype.copy = function ( ) {
		return new Iterator( this.reference , this.current ) ;
	} ;

	ReverseIterator.prototype.copy = function ( ) {
		return new ReverseIterator( this.reference , this.current ) ;
	} ;

	Iterator.prototype.next = ReverseIterator.prototype.prev = function ( ) {

		++this.current ;

		if ( this.current === this.reference.length ) {
			return { done : true } ;
		}

		else {
			return { done : false , value : this.reference.get( this.current ) } ;
		}

	} ;

	Iterator.prototype.prev = ReverseIterator.prototype.next = function ( ) {

		--this.current ;

		if ( this.current === -1 ) {
			return { done : true } ;
		}

		else {
			return { done : false , value : this.reference.get( this.current ) } ;
		}

	} ;

	ArrayList.Iterator = Iterator ;
	ArrayList.ReverseIterator = ReverseIterator ;

	return ArrayList ;

} ;

exports.__ArrayList__ = __ArrayList__ ;
