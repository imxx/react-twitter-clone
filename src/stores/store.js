var assign = require("object-assign");
var EventEmitterProto = require("event").EventEmitter.prototype;


var EVENTTTT = "event";


var storeMethods = {
    init: function(){},
    set: function(arr){
        var currIds = this._data.map(function(m) { return m.cid });
        arr.filter(function(item){
            return currIds.indexOf(item.cid) === -1;
        }).forEach(this.add.bind(this));
    },
    add: function(item){
        this._data.push(item);
    },
    get: function(id){
        return this._data.filter(function(item){
            return item.cid === id;
        })[0];
    },
    addChangeListener: function(fn){
        this.on(EVENTTTT , fn);
    },
    removeChangeListener: function(){
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
    }
};

exports.extend = function(methods){

    var store = {
        _data: [],
        actions: {}
    };

    assign(store, EventEmitterProto, storeMethods, methods);
    store.init();

    require("../dispatcher").register(function(action){
        if(store.actions[action.actionType]){
            store.actions[action.actionType].forEach(function(fn){
                fn.call(null, action.data);
            });
        }
    });

    return store;
}