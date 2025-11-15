const UHMapScriptCache = new URL(document.currentScript.src).search;
function startRouter() {
	
		 map.addNavButton('filter',
        'navFilterIcon',
        function() {
          routeFilter();
        }
    );


    /*map.addNavButton('shuttle',
    '<button title="View Bus Routes" class="mapboxgl-ctrl-icon fas fa-bus" type="button" aria-label="RideSystem Map Routes" aria-pressed="false"></button>',
    function(){window.location.href = 'http://www.cougarline.ridesystems.net/'}
    );
    */
    routie({
        '/centerOn/:location': function(location){
          if ((/^uh$/i).test(location)){
            map.flyTo({"center":[-95.343007, 29.721150], "zoom": 14.8});
          }else if ((/^uhsl$/).test(location)){
            map.flyTo({"center":[-95.650699,29.575013], "zoom": 17});
					}else if ((/^katy$/).test(location)){
            map.flyTo({"center":[-95.7716216,29.7919483], "zoom": 17});
          }
        },

        '/details/closed': function() {
            //don't do anything.
        },
        '/details/show/:shortName': function(shortName) {
            map.showBuildingDetails(shortName,function(data){
              map.addMarker({
                "path":data.shortName+"-details-marker",
                "location":[data.lng,data.lat],
                "html":"<i class='fa-solid fa-location-dot' style='font-size: 40px;'></i>"
              });
            });
        },
        '/details/:shortName': function(shortName) {
            map.clearAll();
            map.showBuildingDetails(shortName,function(data){
              map.addMarker({
                "path":data.shortName+"-details-marker",
                "location":[data.lng,data.lat],
                "html":"<i class='fa-solid fa-location-dot' style='font-size: 40px;'></i>"
              });
            });
        },
        //show the details of the location
        '/places/:shortName': function(shortName) {
            map.clearAll();
            map.showBuildingDetails(shortName,function(data){
              map.addMarker({
                "path":data.shortName+"-details-marker",
                "location":[data.lng,data.lat],
                "html":"<i class='fa-solid fa-location-dot' style='font-size: 40px;'></i>"
              });
            });
        },
        //show locations by filter type
        '/filter/:type': function(type) {
            map.clearAll();
            routeFilterType(type);

        },
        '/filter': function() {
            routeFilter();
        },
        //show a single building
        '/find/:shortName': function(shortName) {
            map.clearAll();
            map.showBuildingDetails(shortName,function(data){
              map.addMarker({
                "path":data.shortName+"-details-marker",
                "location":[data.lng,data.lat],
                "html":"<i class='fa-solid fa-location-dot' style='font-size: 40px;'></i>"
              });
            });
        },
        
        
        //show a single building as a popup
        '/pin/:shortName': function(shortName) {
            map.clearAll();

            shortNameArray = shortName.split(/\s?,\s?/);

            for (x in shortNameArray){
                
                map.buildingDetails(shortNameArray[x],function(d){
                
                if (d.lat === '' || d.lng === ''){
                    console.log('Geo not defined');
                    return false;
                }
                
                var displayHTML = "<div style='text-align:center'>";
                if (d.image != ''){
                    displayHTML += "<a href='#/find/"+d.shortName+"' title='Click for more information about "+d.name+"'><img src='"+d.image+"' style='width: 100%; max-width: 200px' alt='"+d.name+"' /></a>";
                }
                displayHTML += "<a href='#/find/"+d.shortName+"' title='Click for more information about "+d.name+"'><div style='padding: 10px; font-weight: bold'>"+d.name+"</div></a>";
                //displayHTML += "<a class='btn btn-primary' href='#/find/"+d.shortName+"' title='more information about "+d.name+"'>More Information</a>";
                displayHTML += "</div>"
                
                map.addPopup({
                    location:[d.lng,d.lat], 
                    html:displayHTML})
                });
            }
        },
        
        //these are old tab functions
        '/parking': function() {
            routeFilter();
        },
        '/parking/:type': function(type) {
            map.clearAll();
            map.markersFromGeoJson({ "dataUrl": '/cdn/map/data/parking.geojson'+UHMapScriptCache, "filter": allowedFilters[type] });
        },

        'walking': function(){
          routeFilter();
        },
        '/walking/:type': function(type) {
            map.clearAll();
            cougarWalkingPath(type);
        },
        // '/specialEvent/cfi':function(){
        //     map.markersFromGeoJson({"dataUrl":"/cdn/map/data/cfi-2018.geojson","filter":allowedFilters.cfi2018});
        // },
        '/wifi/exterior':function(){
          console.log('adding external wifi layer');
          map.markersFromGeoJson({"dataUrl":"/maps/data/exterior-wifi.geojson"+UHMapScriptCache,"filter":allowedFilters.wifiExternal});
        },
        '/exterior/wifi-art':function(){
          console.log('adding external wifi layer');
          map.markersFromGeoJson({"dataUrl":"/maps/data/exterior-wifi.geojson"+UHMapScriptCache,"filter":allowedFilters.wifiExternal});
          map.markersFromGeoJson({"dataUrl":"/maps/data/2020-color-field-data.geojson"+UHMapScriptCache,"filter":allowedFilters.wifiColorfield});
          
        },
        '/aps/show':function(){
          addAPDiagInformation();
        },
        '/aps/hide':function(){
          removeAPDiagInformation();
        },
        '/transportation/metrobuses':function(){
          map.clearAll();
          map.markersFromGeoJson({"dataUrl":"/cdn/map/data/uh-metro-buses.geojson"+UHMapScriptCache,"filter":allowedFilters.metrobuses});
        },
        '/transportation/metrorail':function(){
          map.clearAll();
          map.markersFromGeoJson({"dataUrl":"/cdn/map/data/uh-metro-rail.geojson"+UHMapScriptCache,"filter":allowedFilters.metrorail});
        },
        '/*': function() {
          console.log('default map state');
          map.hideDetails();
        },

        //overwrite the default behavior and use these routes instead
        '/clicked/:shortName': function(shortName) {
            map.url('/find/' + shortName);
        },
        '/autocomplete/:shortName': function(shortName) {
            map.url('/find/' + shortName);
        }
    });



    function routeFilter() {
        var filterMenu = {
            "amenities": [
				{
					"tag": "wifiexternal",
					"icon": "<i class='map-icon fa-solid fa-wifi' aria-hidden='true'></i>",
					"label": "Outdoor Wifi"
				},
				{
						"tag": "food",
						"icon": "<i class='fa-solid fa-utensils' aria-hidden='true'></i>",
						"label": "Food"
				},

				{
						"tag": "vending",
						"icon": "<i class='icon vending' aria-hidden='true'></i>",
						"label": "Vending"
				},

				{
						"tag": "medical",
						"icon": "<i class='fa-solid fa-suitcase-medical' aria-hidden='true'></i>",
						"label": "Medical"
				},
				{
						"tag": "lodging",
						"icon": "<i class='fa-solid fa-bed' aria-hidden='true'></i>",
						"label": "Lodging"
				},
				{
						"tag": "housing",
						"icon": "<i class='fa-solid fa-house' aria-hidden='true'></i>",
						"label": "Housing"
				},
				{
						"tag": "recreation",
						"icon": "<i class='fa-solid fa-dumbbell' aria-hidden='true'></i>",
						"label": "Recreation"
				},
				{
						"tag": "specialneeds",
						"icon": "<i class='fa-solid fa-wheelchair' aria-hidden='true'></i>",
						"label": "Special Needs"
				},

				{
						"tag": "family",
						"icon": "<i class='fa-solid fa-child' aria-hidden='true'></i>",
						"label": "Family"
				},
				{
						"tag": "park",
						"icon": "<i class='map-icon map-icon-park' aria-hidden='true'></i>",
						"label": "Parks"
				},
				{
						"tag": "Art",
						"icon": "<i class='map-icon map-icon-art-gallery' aria-hidden='true'></i>",
						"label": "Art"
				},
				{
						"tag": "emergency-phones",
						"icon": "<i class='icon bluephones solid-black' aria-hidden='true'></i>",
						"label": "Emergency Phones"
				}
			],
			"parking": [
				{
						"tag": "disabled",
						"icon": "<i class='fa-solid fa-wheelchair' aria-hidden='true'></i>",
						"label": "Disabled"
				},
				{
						"tag": "metered",
						"icon": "<i class='fa-solid fa-parking' aria-hidden='true'></i>",
						"label": "Visitor"
				},
				{
						"tag": "garage",
						"icon": "<div class='parking ungated' aria-hidden='true'></div>",
						"label": "Garage"
				},
				{
						"tag": "gated",
						"icon": "<div class='parking gated' aria-hidden='true'></div>",
						"label": "Staff/Faculty Gated"
				},
				{
						"tag": "zonea",
						"icon": "<div class='parking zonea' aria-hidden='true'></div>",
						"label": "Zone A"
				},
				{
						"tag": "zoneb",
						"icon": "<div class='parking zoneb' aria-hidden='true'></div>",
						"label": "Zone B"
				},
				{
						"tag": "zonec",
						"icon": "<div class='parking zonec' aria-hidden='true'></div>",
						"label": "Zone C"
				},
				{
						"tag": "zoned",
						"icon": "<div class='parking zoned' aria-hidden='true'></div>",
						"label": "Zone D"
				},
				{
						"tag": "zonee",
						"icon": "<div class='parking zonee' aria-hidden='true'></div>",
						"label": "Zone E"
				},
				{
						"tag": "zonef",
						"icon": "<div class='parking zonef' aria-hidden='true'></div>",
						"label": "Zone F"
				},
				{
						"tag": "zoneh-covered",
						"icon": "<div class='parking zoneh' aria-hidden='true'></div>",
						"label": "Zone H - Covered"
				},
				{
						"tag": "zoneh",
						"icon": "<div class='parking zoneh' aria-hidden='true'></div>",
						"label": "Zone H"
				},
				{
						"tag": "zoneg",
						"icon": "<div class='parking zoneg' aria-hidden='true'></div>",
						"label": "Zone G"
				}
			],
			
			"walks":[
				{
						"tag": "da Vinci Walk",
						"icon": "<i class='icon man-walking-directions' style='background-color:#407cca; width: 40px; height: 40px;' aria-hidden='true'></i>",
						"label": "da Vinci Walk (0.6 mi)"
				},
				{
						"tag": "Cougar Pride",
						"icon": "<i class='icon man-walking-directions' style='background-color:#cb0b2b;width: 40px; height: 40px;' aria-hidden='true'></i>",
						"label": "Cougar Pride (0.6 mi)"
				},
				{
						"tag": "Recreation Trail",
						"icon": "<i class='icon man-walking-directions' style='background-color:#ca006c;width: 40px; height: 40px;' aria-hidden='true'></i>",
						"label": "Recreation Trail (0.3 mi)"
				},
				{
						"tag": "Centennial Walk",
						"icon": "<i class='icon man-walking-directions' style='background-color:#f6be00;width: 40px; height: 40px;' aria-hidden='true'></i>",
						"label": "Centennial Walk (1.0 mi)"
				},
				{
						"tag": "Art Walk",
						"icon": "<i class='icon man-walking-directions' style='background-color:#00837e;width: 40px; height: 40px;' aria-hidden='true'></i>",
						"label": "Art Walk (1.3 mi)"
				}
			],
			"metro":[
				{
						"tag": "metrorail",
						"icon": "<i class='icon rail' style='width: 40px; height: 40px;' aria-hidden='true'></i>",
						"label": "Metro Rail Stations"
				},
				{
						"tag": "metrobuses",
						"icon": "<i class='icon bus' style='width: 40px; height: 40px;' aria-hidden='true'></i>",
						"label": "Metro Bus Stops"
				},
			]
        };


        var html = `<div class='filters row'>
					<div style='text-align:center;'>
						<h2>University of Houston</h2>
						<div>
							<a href="a-to-z" title="A to Z building list">A To Z building list</a>
						</div>
					</div>`;
        for (var i = 0; i < filterMenu.amenities.length; i++) {
            var f = filterMenu.amenities[i];
            html += "<div class=\"filter col-3 col-sm-2 col-md-2 col-lg-1 style='text-align:center'\ " + f.tag + "\" onclick=\"map.url('/filter/" + f.tag + "'); map.hideDetails();\"> "
                + f.icon + " <div>" + f.label + "</div>"
                + "</div>";
        }
        html += "</div></div><div style='clear:both;'></div>";

        html += "<div class='filters row'><h2 style='padding-top: 5px;text-align:center;'>Parking</h2>";
        for (var i = 0; i < filterMenu.parking.length; i++) {
            var f = filterMenu.parking[i];
            html += "<div class=\"filter col-3 col-sm-2 col-md-2 col-lg-1\ " + f.tag + "\" onclick=\"map.url('/parking/" + f.tag + "');\"> "
                + f.icon + " <div>" + f.label + "</div>"
                + "</div>";
        }
        html += "</div></div><div style='clear:both;'></div>";

        

        html += "<div class='filters row'><h2 style='padding-top: 5px;text-align:center;'>Walking Paths</h2>";
        for (var i = 0; i < filterMenu.walks.length; i++) {
            var f = filterMenu.walks[i];
            html += "<div class=\"filter col-3 col-sm-2 col-md-2 col-lg-1\ " + f.tag + "\" onclick=\"map.url('/walking/" + f.tag + "');\"> "
                + f.icon + " <div>" + f.label + "</div>"
                + "</div>";
        }
        html += "</div></div><div style='clear:both;'></div>";

        html += "<div class='filters row'><h2 style='padding-top: 5px;text-align:center;'>Metro</h2>";
        for (var i = 0; i < filterMenu.metro.length; i++) {
            var f = filterMenu.metro[i];
            html += "<div class=\"filter col-3 col-sm-2 col-md-2 col-lg-1\ " + f.tag + "\" onclick=\"map.url('/transportation/" + f.tag + "');\"> "
                + f.icon + " <div>" + f.label + "</div>"
                + "</div>";
        }
        html += "</div></div><div style='clear:both;'></div>";

        // html += "<div class='filters'><h2 style='padding-top: 5px;text-align:center;'>Special Events</h2>";
        // for (var i = 0; i < filterMenu.specialEvents.length; i++){
        //     var f = filterMenu.specialEvents[i];
        //     html += "<div class=\"filter col-xs-4 col-sm-3 col-md-2 col-lg-1\ "+f.tag+"\" onclick=\"map.url('/specialEvent/"+f.tag+"');\"> "
        //     +f.icon+" <div>"+f.label+"</div>"
        //     +"</div>";
        // }
        // html += "</div>";


        map.showDetails(html,'60%');
    }

    function routeFilterType(type) {
		type = type.toLowerCase().replace(/\W+/g,'');
        switch (type) {
            case 'food':
                map.markersFromGeoJson({
                    "dataUrl": "/cdn/map/data/food.geojson"+UHMapScriptCache,
                    "filter": allowedFilters.food
                });
                return;
                break;
						case 'vending':
                map.markersFromGeoJson({
                    "dataUrl": "/cdn/map/data/vending.geojson"+UHMapScriptCache,
                    "filter": allowedFilters.vending
                });
                return;
                break;
			case 'wifiexternal':
					//redirect because this is already setup, just adding as filter
					//console.log('redirecting to #/wifi/exterior');
					window.location.hash="/wifi/exterior";
					return;
					break;
            case 'emergencyphones':
                map.markersFromGeoJson({
                    "dataUrl": "/cdn/map/api/bluephones.php"+UHMapScriptCache,
                    "filter": allowedFilters['emergency-phones']
                });
                return;
                break;
            default:
				console.log('route filter default load')
				$.getJSON('/cdn/map/api/filterData.php?type=' + type, function(d) {
					for (var i = 0; i < d.length; i++) {
						var html = "<a href=\"#/details/show/" + d[i].shortName + "\" onclick=\"event.stopPropagation();\"><div class='filter-icon' >" + d[i].icon + "</div></a>";
		
						var markerObj = {
							"path": "/places/" + type + "/" + d[i].shortName,
							"location": d[i].location,
							"html": html
						};
						var x = map.addMarker(markerObj);
						map.fitMarkers();
					}
				});
                break;

        }

        
    }


}

function centerofPath(feature){
  var center = turf.center(feature);
  return center.geometry.coordinates;
}

function cougarWalkingPath(name){
  map.clearPolyLines();
  $.getJSON("/cdn/map/data/cougar-walking-paths.geojson"+UHMapScriptCache,function(d){
      for(var i in d.features){
        if (name == d.features[i].properties.name){
          switch(d.features[i].properties.name){
            case 'da Vinci Walk':
              map.addPolyLine({
                  id: "da-Vinci-Walk",
                  geometry: d.features[i].geometry,
                  line: {
                      width: 4,
                      color: '#407cca',
                      dashed: true
                  }
              });

              map.flyTo({"center":centerofPath(d.features[i])});
              //get the center
              break;
            case 'Cougar Pride':
              map.addPolyLine({
                  id: "Cougar-Pride",
                  geometry: d.features[i].geometry,
                  line: {
                      width: 4,
                      color: '#cb0b2b',
                      dashed: true
                  }
              });
              map.flyTo({"center":centerofPath(d.features[i])});
              break;
            case 'Recreation Trail':
              map.addPolyLine({
                  id: "Recreation-Trail",
                  geometry: d.features[i].geometry,
                  line: {
                      width: 4,
                      color: '#ca006c',
                      dashed: true
                  }
              });
              map.flyTo({"center":centerofPath(d.features[i])});
              break;
            case 'Centennial Walk':
              map.addPolyLine({
                  id: "Centennial-Walk",
                  geometry: d.features[i].geometry,
                  line: {
                      width: 4,
                      color: '#f6be00',
                      dashed: true
                  }
              });
              map.flyTo({"center":centerofPath(d.features[i])});
              break;
            case 'Art Walk':
              map.addPolyLine({
                  id: "art-Walk",
                  geometry: d.features[i].geometry,
                  line: {
                      width: 4,
                      color: '#00837e',
                      dashed: true
                  }
              });
              map.flyTo({"center":centerofPath(d.features[i])});
              break;
          }
        }
      }
  });
}

function map_error(x) {
    map.modal.open({
        "content": x,
        "width": 200,
        "height": 200
    });
}

var allowedFilters = {
    "garage": {
        "filter": {
            "key": 'properties.categories',
            "value": /\bgarage/,
        },
        "class": "parking ungated",
        "label": true
    },
    "gated": {
        "filter": {
            "key": 'properties.categories',
            "value": /\bgated/,
        },
        "class": "parking gated",
        "label": true
    },
    "disabled": {
        "filter": {
            "key": 'properties.categories',
            "value": /\bdisabled/,
        },
        "class": "fa-solid fa-wheelchair fa-2x",
        "label": false
    },
    "metered": {
        "filter": {
            "key": 'properties.categories',
            "value": /\bmetered/,
        },
        "class": "fa-solid fa-square-parking fa-2x",
        "label": false,
        "onClick": true,
    },
    "zonea": {
        "filter": {
            "key": 'properties.zone',
            "value": /\bA/,
        },
        "class": "parking zonea",
        "label": true
    },
    "zoneb": {
        "filter": {
            "key": 'properties.zone',
            "value": /\bB/,
        },
        "class": "parking zoneb",
        "label": true
    },

    "zonec": {
        "filter": {
            "key": 'properties.zone',
            "value": /\bC$/,
        },
        "class": "parking zonec",
        "label": true
    },

    "zoned": {
        "filter": {
            "key": 'properties.zone',
            "value": /\bD/,
        },
        "class": "parking zoned",
        "label": true
    },

    "zonee": {
        "filter": {
            "key": 'properties.zone',
            "value": /\bE/,
        },
        "class": "parking zonee",
        "label": true
    },

    "zonef": {
        "filter": {
            "key": 'properties.zone',
            "value": /\bF/,
        },
        "class": "parking zonef",
        "label": true
    },
   
    "zoneh": {
        "filter": {
            "key": 'properties.zone',
            "value": /^H$/,
        },
        "class": "parking zoneh",
        "label": true
    },
	"zoneh-covered": {
        "filter": {
            "key": 'properties.zone',
            "value": /^H-Covered$/,
        },
        "class": "parking zoneh",
        "label": true
    },
	"zoneg": {
        "filter": {
            "key": 'properties.zone',
            "value": /\bG/,
        },
        "class": "parking zoneg",
        "label": true
    },
    "cfi2018": {
        "class": "icon tent",
        "label": false,
        "onClick": true
    },
    "wifiExternal": {
        "class": "filter-icon fa-solid fa-wifi",
        "label": false,
        "onClick": false
    },
    "wifiColorfield": {
        "class": "filter-icon fa-solid fa-palette",
        "label": false,
        "onClick": false
    },
    "food": {
        "class": "filter-icon",
        "classIcon": "<i class='fa-solid fa-utensils' aria-hidden='true'></i>",
        "label": false,
        "onClick": true
    },
		"vending": {
        "class": "filter-icon",
        "classIcon": "<i class='icon vending' aria-hidden='true'></i>",
        "label": false,
        "onClick": true
    },
    "metrobuses":{
      "class": "",
      "classIcon": "<i class='icon bus' aria-hidden='true'></i>",
      "label": false,
      "onClick":true,
    },
    "metrorail":{
      "class": "",
      "classIcon": "<i class='icon rail' aria-hidden='true'></i>",
      "label": false,
      "onClick":true,
    },
    "emergency-phones": {
        "class": "filter-icon",
        "classIcon": "<i class='icon bluephones' aria-hidden='true'></i>",
        "label": false,
        "onClick": true
    },
};

//resize the canvas to fit the page before the map is ready
$(()=>{
	$('#map-area').show();
	resizeCanvas();
	
});

//is fired with the map finishes loading
function mapReady() {
    //start the router
    startRouter();
    
		//add to help focus inputs
		$('.search-input').on('showDropdown',()=>{
			//console.log('Choices dropdown selected');
			setTimeout(()=>{
				//console.log('Making sure focus on IOS', $('#map-canvas .search-input'));
				$('#map-canvas .search-input').focus();
			},500);
		}) 
}

//detect window resize events and resize the map view
function resizeCanvas(){
		$('.map-area').css('height',window.innerHeight- ($('footer.uh-footer').height() + $('header').height()));
    $('.map-area').css('width',window.innerWidth);    
}


//remove ap layer 
function removeAPDiagInformation(){
    map.map.setLayoutProperty('layer-buildings','visibility','visible');
    map.map.removeLayer('apsDiagInfo');
    
}

//add ap information 
function addAPDiagInformation(){
   map.map.setLayoutProperty('layer-buildings','visibility','none');
  // ----------------------------------
  // AP information
  // ----------------------------------
  map.map.addSource('apsDiagInfo', {
    type: 'geojson',
    data: '/maps/data/all_aps_geojson.php'+UHMapScriptCache
  });

  map.map.addLayer({
    'id': 'apsDiagInfo',
    'type': 'symbol',
    'layout':{
        'icon-image':'viewpoint-15'
    },
    
    'source': 'apsDiagInfo'
  });

    map.map.on('click', 'apsDiagInfo', function(e) {
          
      
      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = e.features[0].properties.description;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(description)
      .addTo(map.map);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.map.on('mouseenter', 'aps', function() {
      map.map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.map.on('mouseleave', 'aps', function() {
      map.map.getCanvas().style.cursor = '';
    });
    
}



$(window).on('resize',function(){resizeCanvas();});
