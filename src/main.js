var React = require("react");
var ReactDOM = require("react-dom");
var ReactRouter = require("react-router");
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var useRouterHistory = require("react-router/lib/useRouterHistory");
var createHashHistory = require("history/lib/createHashHistory");
var appHistory = useRouterHistory(createHashHistory)({ queryKey: false });



var API = require("./api");
var ChirpStore = require("./stores/chirps");

var App = require("./components/App");
var Home = require("./components/Home");



var routes = (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
    </Route>
);

ReactDOM.render(
    <Router history={appHistory} routes={routes} />,
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