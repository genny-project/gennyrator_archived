export default {
  /* Define all of the different user types here */
  ADMIN: 'ADMIN',
  USER: 'USER',
  /**
   * The get inherited types function includes all of the types / roles a
   * particular user type inherits.
   */
  getInheritedTypes: type => {
    switch ( type ) {
      case 'ADMIN':
        return [ 'ADMIN', 'USER' ];
      default:
        return [ type ];
    }
  }
};
