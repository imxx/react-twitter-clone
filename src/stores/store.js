var assign = require("object-assign");
var EventEmitterProto = require("events").EventEmitter.prototype;


var EVENTTTT = "event";


var storeMethods = {
    init: function(){},
    set: function(arr){
        var currIds = this._data.map(function(m) { return m.cid });
        arr.filter(function(item){
            return currIds.indexOf(item.cid) === -1;
        }).forEach(this.add.bind(this));
        this.sort();
    },
    add: function(item){
        this._data.push(item);
        this.sort();
    },
    sort: function(){
        this._data.sort(function(a,b){
            return +new Date(b.$created) - +new Date(a.$created);
        });
    },
    get: function(id){
        return this._data.filter(function(item){
            return item.cid === id;
        })[0];
    },
    addChangeListener: function(fn){
        this.on(EVENTTTT , fn);
    },
    removeChangeListener: function(fn){
        this.removeListener(EVENTTTT , fn);
    },
    emitChange: function(){
        this.emit(EVENTTTT)
    },
    bind: function(actionType, actionFn){
        if(this.actions[actionType]){
            this.actions[actionType].push(actionFn);
        }else{
            this.actions[actionType] = [actionFn];
        }
    },
    all: function(){
        return this._data;
    }
};

exports.extend = function(methods){

    var store = {
        _data: [],
        actions: {},
        mixin: {
            componentDidMount: function(){
                store.addChangeListener(this.onChange);
            },

            componentWillUnmount: function(){
                store.removeChangeListener(this.onChange);
            }
        }
    };

    assign(store, EventEmitterProto, storeMethods, methods);
    store.init();

    require("../dispatcher").register(function(action){
        if(store.actions[action.actionType]){
            store.actions[action.actionType].forEach(function(fn){
                fn.call(store, action.data);
                store.emitChange();
            });
        }
    });

    return store;
}