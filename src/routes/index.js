import * as Auth from '../auth';
import * as Validations from '../validations';
import * as LocationsControllers from '../controllers/locations';
import * as MoviesControllers from '../controllers/movies';
import * as UserControllers from '../controllers/users';

const routes = (instance) => {
    instance.post('/user/login',  [Validations.validateLogin, Auth.authUser], UserControllers.login);
    instance.post('/user/logout',  Auth.authUser, UserControllers.logout);
    instance.post('/user/register',  Validations.validateUserRegister, UserControllers.register);
    /*instance.post('/location/register',  [authUser, validateTransaction], LocationsControllers.getLocations);
    instance.update('/location/return', [authUser, validateTransaction], LocationsControllers.getLocations);
    instance.get('/movie/:title', [authUser, validateTransaction], LocationsControllers.getLocations);
    instance.get('/movie/list', [authUser, validateTransaction], LocationsControllers.getLocations);*/
};

export default routes;