const NodeGeocoder = require('node-geocoder')
const config = require('../config')

class GeocoderService {
  constructor(provider, apiKey) {
    this.geocoder = NodeGeocoder({
      provider,
      apiKey,
      formatter: null
    })
  }

  async getCoordinates(address) {
    if(!address) {
      throw new Error('Provided Address is blank')
    }
    const results = await this.geocoder.geocode(address)
    const location = results[0] || {}
    return { lat: location.latitude, long: location.longitude }
  }
}

const service = new GeocoderService('google', config.get('googleMapsApiKey'))

module.exports = { GeocoderService: service }