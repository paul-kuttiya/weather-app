var Weather = {
  key: 'AIzaSyASMGhZ2VGx_Ef3ae7OhD4MCLMEKlx22Bc',
  weatherKey: '2167314570ba4a56a99210625172102',
  weatherEndPoint: `https://api.apixu.com/v1/forecast.json?key=`,
  photoEndPoint: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photoreference=',
  $el: 'element',
  $f: $('form'),
  init: function(lat, lon) {
    this.setGeolocation(lat, lon);
    this.getPlace().then(this.getWeather.bind(this));
    this.bind();
  },
  bind: function() {
    this.$f.on('submit', this.searchWeather.bind(this));
    $('.fa-thermometer-full').on('click', this.searchWeather.bind(this));
  },
  setGeolocation: function(lat, lon) {
    this.lat = lat;
    this.lon = lon;
  },
  searchWeather: function(e) {
    if (e) {
      e.preventDefault();
    }

    this.location = this.$f.find('input').val();
    this.getWeather().then(this.getPlace.bind(this));
    this.$f.get(0).reset();
  },
  getWeather: function() {
    var endpoint = `${this.weatherEndPoint}${this.weatherKey}&q=${this.location}&days=7`,
        self = this;

    return $.ajax({
      url: endpoint,
      success: function(json) {
        var current = json.current,
            lat = json.location.lat,
            lon = json.location.lon;

        self.currentWeather = json.current;
        self.setGeolocation(lat, lon);
      },
      error: function() {
        console.log('error');
        return;
      }
    })
  },
  //set background
  setPhoto: function(photoreference) {
    var photo = this.photoEndPoint + `${photoreference}&key=${this.key}`
    // $('img#place').attr('src', photo);
    $('.container').css('background-image', `url(${photo})`);
  },
  setlocation: function(location) {
    this.location = location;
  },
  //get place id
  getPlace: function() {
    var geoLocation = `${this.lat},${this.lon}`,
        self = this;

    return $.ajax({
      type: 'post',
      data: geoLocation,
      url: $('form').attr('action'),
      success: function(json) {
        var photoreference = json.photos[0].photo_reference,
            location = json.vicinity;
        
        self.setPhoto(photoreference);
        self.setlocation(location);
        console.log(self.location)
      }
    });
  },
}