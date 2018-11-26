/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  const checkDivision = function(raw) {
    let nums = raw.split('/')
    if (nums.length > 2) { return false }
    return nums
  }

  const checkDecimal = function(raw) {
    let num = raw.split('.')
    if (num.length > 2) { return false }
    return raw
  }

  this.getNum = function(input) {
    let rawNum = input.match(/[\d\/.]+/) || ['1']
    let nums = checkDivision(rawNum[0])
    if (!nums[0]) {
      return 'invalid number'
    }
    let num1 = checkDecimal(nums[0])
    let num2 =  nums[1] || '1'
    num2 = checkDecimal(num2)
    let result = parseFloat(num1) / parseFloat(num2)
    return result || 'invalid number' 
  };
  
  this.getUnit = function(input) {
    let lower = input.toLowerCase()
    // Getting first continous string of alpha characters
    let alpha = lower.match(/[A-Za-z]+/g)
    alpha = alpha ? alpha[0] : 'invalid unit'

    // checking if it contains proper unit names
    let unit =  lower.match(/gal|lbs|mi|l|kg|km/)
    unit = unit ? unit[0] : 'invalid unit'

    // Checking if there is more beyond the unit name
    if (lower.split(unit)[1]) {
      return 'invalid unit'
    }

    // Checking if the extracted unit is the extent of all characters
    if (unit !== alpha) {
      return 'invalid unit'
    }
    
    return unit
  }
  
  this.getReturnUnit = function(initUnit) {
    const imperial = ['gal', 'lbs', 'mi']
    const metric   = ['l',   'kg',  'km']
    
    let i = imperial.indexOf(initUnit)
    if (i > -1) {
      return metric[i]
    } else {
      i = metric.indexOf(initUnit)
      return imperial[i] || 'invalid unit'
    }
  };

  this.spellOutUnit = function(unit) {
    const fullUnit = {
      gal: 'gallon',
      lbs: 'pound',
      mi : 'mile',
      l  : 'liter',
      kg : 'kilogram',
      km : 'kilometer'      
    }
    
    return fullUnit[unit] || 'invalid unit'
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    switch(initUnit) {
      case 'gal':
        return  initNum * galToL
      case 'lbs':
        return  initNum * lbsToKg
      case 'mi':
        return  initNum * miToKm
      case 'l':
        return  initNum / galToL
      case 'kg':
        return  initNum / lbsToKg
      case 'km':
        return  initNum / miToKm
      default:
        return 'invalid unit'
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let initUnitFull = this.spellOutUnit(initUnit)
    initUnitFull += initNum > 1 ? 's' : ''
    
    let returnUnitFull = this.spellOutUnit(returnUnit)
    returnUnitFull += returnNum > 1 ? 's' : ''
    
    let preciseInitNum = parseFloat(initNum.toPrecision(5))
    let preciseReturnNum = parseFloat(returnNum.toPrecision(5))
    
    return `${preciseInitNum} ${initUnitFull} converts to ${preciseReturnNum} ${returnUnitFull}`;
  };
  
}

module.exports = ConvertHandler;
