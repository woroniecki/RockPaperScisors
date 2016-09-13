var Route = function() {
    this.points = [];
    this.paths = [];
};

Route.prototype = {
    getLastPoint: function(latlng) {
    	if(this.points.length > 0)
        	return this.points[this.points.length - 1];
        return null;
    },
    setName: function(name) {
        this.name = name;
    },
    addNewPoint: function(point){
    	this.points.push(point);
    },
    addNewPath: function(points){
    	this.paths.push(points);
    },
    loadOnMap: function() {
        for (i = 0; i < this.paths.length; i++) {
            mapSystem.addLinesFromGeoJson(this.paths[i], lineStyle);
        }
        for (i = 0; i < this.points.length; i++) {
        	mapSystem.addMarker(this.points[i], routingMarkIcon);
        }
    },
    hydrate: function() {
        var memento = JSON.stringify(this);
        return memento;
    },
    dehydrate: function(memento) {
        var m = JSON.parse(memento);
        console.log(m);
        this.name = m.name;
        this.points = m.points;
        this.paths = m.paths;
    },
    saveInTemporary: function() {
        localStorage.setItem("temporary", routingSystem.route.hydrate());
        window.location = "routeSave.html";
    },
    saveFromTemporary: function(name) {
        var route = localStorage.getItem("temporary");
        localStorage.setItem("N" + name, route);
    }
}