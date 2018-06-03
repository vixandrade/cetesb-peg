var Region = require('../../../models/regionModel')

exports.index = function (req, res) {
  var queryFilter = {}
  if (req.query.macro) {
    queryFilter = {
      macro: req.query.macro
    }
  } else if (req.query.micro) {
    queryFilter = {
      micro: req.query.micro
    }
  }

  Region.find(queryFilter, function (err, regions) {
    if (err) { res.status(500).send(err) }
    var resp = {}

    if (req.query.structure === 'tree') {
      var macroRegions = {}
      regions.forEach(beach => {
        var macro = beach['macro']
        var micro = beach['micro']

        if (!macroRegions[macro]) { macroRegions[macro] = {} }
        if (!macroRegions[macro][micro]) { macroRegions[macro][micro] = [] }

        macroRegions[macro][micro].push(beach)
      })

      resp = {
        regions: macroRegions
      }
    } else {
      resp = {
        regions: regions
      }
    }

    res.json(resp)
  })
}

exports.read = function (req, res) {
  Region.findById(req.params.beachId, function (err, beach) {
    if (err) { res.status(500).send(err) }
    res.json(beach)
  })
}

exports.macroRegions = function (req, res) {
  Region.find({}, function (err, regions) {
    if (err) { res.status(500).send(err) }

    var macroRegions = regions.map(beach => beach['macro']).filter((macro, pos, arr) => arr.indexOf(macro) === pos)
    var resp = {
      regions: macroRegions
    }

    res.json(resp)
  })
}

exports.microRegions = function (req, res) {
  Region.find({}, function (err, regions) {
    if (err) { res.status(500).send(err) }

    var resp = {}
    if (req.query.structure === 'tree') {
      var macroRegions = {}
      regions.forEach(beach => {
        var macro = beach['macro']
        var micro = beach['micro']
        if (!macroRegions[macro]) { macroRegions[macro] = [] }

        if (macroRegions[macro].indexOf(micro) === -1) {
          macroRegions[macro].push(micro)
        }
      })

      resp = {
        regions: macroRegions
      }
    } else {
      resp = {
        regions: regions.map(beach => beach['micro']).filter((micro, pos, arr) => arr.indexOf(micro) === pos)
      }
    }

    res.json(resp)
  })
}
