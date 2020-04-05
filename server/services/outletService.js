const parseKML = require('parse-kml')
const config = require('../config')
const { contains } = require('./polygonService')
class OutletService {
  constructor(baseFileURL) {
    this.baseURL = baseFileURL  
  }

  async getOutlets() {
    const content = await parseKML.toJson(this.baseURL, {spaces: 2})
    let result = []
    if(Array.isArray(content.features)) {
      result = content.features.map(this._transformOutletObject)
    }
    return result
  }

  async getOutletForCoordinate(coordinate) {
    const outlets = await this.getOutlets()
    const targetOutlet = outlets.find(outlet => {
      if(outlet.geometry.type === 'Polygon') {
        return contains(outlet.geometry.coordinates, coordinate)
      } else {
        const { lat, long } = outlet.geometry.coordinates[0]
        return coordinate.lat === lat && coordinate.long == long
      }
    })
    return targetOutlet
  }

  // method to structure outlet object in a more readable form
  _transformOutletObject(obj = {}) {
    let { type, coordinates } = obj.geometry
    let res = {
      name: obj.properties.name,
      description: obj.properties.description,
      geometry: { type }
    }
    coordinates = type === 'Polygon' ? coordinates[0] : [coordinates]
    res.geometry.coordinates = coordinates.map(item => ({lat: item[1], long: item[0]}))
    return res
  }

}

const service = new OutletService(config.get('kmsFilePath'))

module.exports = { OutletService: service }
