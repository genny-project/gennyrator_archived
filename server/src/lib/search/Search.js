import Fuse from 'fuse.js';

class Search {
  constructor( data ) {
    this.data = data;
  }

  search( query ) {
    const options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        'firstName',
        'lastName'
      ]
    };

    const fuse = new Fuse( this.data, options );
    return fuse.search( query );
  }
}

export default Search;
