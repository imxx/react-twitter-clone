var React = require("react");
var ReactDOM = require("react-dom");
var ReactRouter = require("react-router");
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory = require("react-router/lib/browserHistory");



var API = require("./api");
var ChirpStore = require("./stores/chirps");

var App = require("./components/App");
var Home = require("./components/Home");
var UserList = require("./components/UserList");
var UserProfile = require("./components/UserProfile");


API.fetchUsers();
API.fetchChirps();


var routes = (
    <Route component={App}>
        <IndexRoute component={Home} />
        <Route path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/users" component={UserList} />
        <Route path="/user/:id" component={UserProfile} />
    </Route>
);

ReactDOM.render(
    <Router history={browserHistory} routes={routes} />,
    document.getElementById("app"));



/*
var routes = (
    <Route path="/" component={APP} >
        <IndexRoute component={Audience} />
        <Route path="speaker" component={Speaker} />
        <Route path="board" component={Board} />
        <Route path="*" component={Whoops404} />
    </Route>
);

ReactDOM.render(
    <Router history={appHistory} routes={routes} />,
    document.getElementById("react-container"));

*/