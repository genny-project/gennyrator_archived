/* Include dependencies */
import { APIError } from 'lib/errors';
import { OBJECT_NOT_FOUND_ERROR } from 'constants';

class Factory {
  constructor( model ) {
    this.model = model;
  }

  /* Return a object by ID */
  async getByID( id ) {
    /**
     * Attempt to get the object with the specified ID
     * We've wrapped this call in a try catch to catch any errors relating
     * to an invalid ID format. This could probably be done better to only
     * catch that specific error but it'll do for now.
     */
    try {
      const object = await this.model.findOne({ _id: id }).exec();

      /* If the object doesn't exist throw an error */
      if ( !object ) {
        throw new APIError( 404, OBJECT_NOT_FOUND_ERROR );
      }

      return object;
    } catch ( e ) {
      /**
       * We've caught some other sort of error (most likely invalid ID format)
       * throw an error.
       */
      throw new APIError( 404, OBJECT_NOT_FOUND_ERROR );
    }
  }

  /* Returns the number of objects */
  async getCount() {
    return await this.model.count();
  }

  /* Find objects */
  async find( query, skip = 0, limit = 10 ) {
    return await this.model.find( query ).skip( skip ).limit( limit ).exec();
  }

  /* Returns the number of objects matching the provided query */
  async getFindCount( query ) {
    return await this.model.find( query ).count();
  }
}

export default Factory;