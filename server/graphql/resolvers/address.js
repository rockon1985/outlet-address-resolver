const { OutletService, GeocoderService } = require('../../services')

module.exports = {
  getOutletIdentifier: async address => {
    try {
      const latLong = await GeocoderService.getCoordinates(address)
      console.log(latLong)
      const outlet = await OutletService.getOutletForCoordinate(latLong)
      console.log('outlet', outlet)
      
      return outlet ? outlet.name : 'Not Found'
    } catch (err) {
      throw err;
    }
  },
  outlets: async args => {
    const outlets = await OutletService.getOutlets()
    console.log(JSON.stringify(outlets))
    return outlets
  }
};
