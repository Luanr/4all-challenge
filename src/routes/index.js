import * as Auth from '../auth';
import * as Validations from '../validations';
import * as LocationsControllers from '../controllers/locations';
import * as MoviesControllers from '../controllers/movies';
import * as UserControllers from '../controllers/users';

const routes = (instance) => {
    instance.post('/user/login',  Validations.validateLogin, UserControllers.login);
    instance.post('/user/register',  Validations.validateUserRegister, UserControllers.register);
    instance.post('/location/register/:copyid',  [Auth.authUser, Validations.validateLocationRegister], LocationsControllers.createLocation);
    instance.post('/location/return/:copyid', [Auth.authUser, Validations.validateLocationReturn], LocationsControllers.returnLocation);
    instance.get('/movies/search/:title', Auth.authUser, MoviesControllers.getMovie);
    instance.get('/movies/list', Auth.authUser, MoviesControllers.getAvailableMovies);
};

export default routes;