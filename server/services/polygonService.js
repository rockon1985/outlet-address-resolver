const contains = (polygonEdges, point) => {
  let x = point.lat, y = point.long;
  let intersections = 0;
  let ss;

  for (let i = 0, j = polygonEdges.length - 1; i < polygonEdges.length; j = i++) {
    let iLat = polygonEdges[i].lat, iLong = polygonEdges[i].long;
    let jLat = polygonEdges[j].lat, jLong = polygonEdges[j].long;
    
    let pointOnEdge = jLong == iLong && jLong == y
      && x > Math.min(jLat, iLat)
      && x < Math.max(jLat, iLat)
    if (pointOnEdge) {
      return true;
    }

    if (y > Math.min(jLong, iLong) && y <= Math.max(jLong, iLong) && x <= Math.max(jLat, iLat) && jLong != iLong) {
      ss = (y - jLong) * (iLat - jLat) / (iLong - jLong) + jLat;
      // Check if point is on the polygon boundary (other than horizontal)
      if (ss == x) {
        return true;
      }

      if (jLat == iLat || x <= ss) {
        intersections++;
      }
    }
  }

  return intersections % 2 != 0
}

module.exports = {contains}