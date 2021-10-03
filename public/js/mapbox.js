let locations = document.getElementById('map')?.dataset.locations;

if (locations) {
  locations = JSON.parse(locations);
  const bounds = new mapboxgl.LngLatBounds();
  mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpc3ljb3JwIiwiYSI6ImNrdGZ4bXNubDBjc2MydW51ajc0dTNxMGoifQ.SQdt0Dl_WvpK8vrBUqiPcQ';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/alisycorp/cktfzauge3rp318qr2bjimh5g',
    scrollZoom: false,
    // center: [-118.113491, 34.111745],
    // zoom: 10,
    // interactive: false,
  });

  locations.forEach((loc) => {
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30,
    })
      .addTo(map)
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
}
