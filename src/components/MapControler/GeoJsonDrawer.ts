class GeoJsonDrawer {
  private map_: google.maps.Map | undefined;
  private dataFeatures: google.maps.Data.Feature[] = [];
  constructor(map: google.maps.Map | undefined | null) {
    if (map) this.map_ = map;
  }

  render(geoJSON: JSON) {
    this.loadGeoJsonString(geoJSON);
    this.map_ && this.zoom(this.map_);
  }

  loadGeoJsonString(geoJSON: JSON) {
    if (this.map_) {
      this.map_.data
        .addGeoJson(geoJSON)
        .forEach((feature) => this.dataFeatures.push(feature));
    }
  }

  zoom(map: google.maps.Map) {
    const bounds = new google.maps.LatLngBounds();
    map.data.forEach((feature) => {
      this.processPoints(feature.getGeometry(), bounds.extend, bounds);
    });
    map.fitBounds(bounds);
  }

  processPoints(
    geometry: google.maps.LatLng | google.maps.Data.Geometry,
    callback: any,
    thisArg: google.maps.LatLngBounds,
  ) {
    if (geometry instanceof google.maps.LatLng) {
      callback.call(thisArg, geometry);
    } else if (geometry instanceof google.maps.Data.Point) {
      callback.call(thisArg, geometry.get());
    } else {
      // @ts-ignore
      geometry.getArray().forEach((g) => {
        this.processPoints(g, callback, thisArg);
      });
    }
  }

  clearAllFeatures() {
    if (this.map_) {
      const map = this.map_;
      this.dataFeatures.forEach((feature) => map.data.remove(feature));
    }
  }
}

export default GeoJsonDrawer;
