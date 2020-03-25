import * as Auth from '../auth';
import * as Validations from '../validations';
import * as LocationsControllers from '../controllers/locations';
import * as MoviesControllers from '../controllers/movies';
import * as UserControllers from '../controllers/users';

const routes = (instance) => {
    instance.post('/user/login',  Validations.validateLogin, UserControllers.login);
    instance.post('/user/register',  Validations.validateUserRegister, UserControllers.register);
    instance.post('/location/register',  [Auth.authUser, Validations.validateLocationRegister], LocationsControllers.getLocations);
    instance.post('/location/return', [Auth.authUser, Validations.validateLocationReturn], LocationsControllers.getLocations);
    instance.get('/movies/search/:title', [Auth.authUser], MoviesControllers.getMovie);
    instance.get('/movies/list', Auth.authUser, MoviesControllers.getAvailableMovies);
};

export default routes;