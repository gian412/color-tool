window.onload = function () {
  
  // Get the element from the document
  const hexInput = document.getElementById('hexInput');
  const inputColorBox = document.getElementById('inputColor');

  // Add an event listener for the key up event to the hexInput input
  hexInput.addEventListener('keyup', () => {
    let hexValue = hexInput.value;
    if (!isValidHex(hexValue)) return;
  
    // remove the # if it have one
    hexValue = hexValue.replace('#', '');
  
    // Change the background of the box
    inputColorBox.style.backgroundColor = '#' + hexValue
  })

  // Check too see whether the input from the user is a valid hex color
  const isValidHex = (hex) => {
  
    if (!hex) return false;
  
    const strippedHex = hex.replace('#', '');
    return strippedHex.length === 3 || strippedHex.length === 6;
  
    // TODO: CHeck that is a valid hex ([0-9], [a-f])
  
  }
  
  
  const convertHexToRGB = (hex) => {
    
    if (!isValidHex(hex)) return null;
    
    const strippedHex = hex.replace('#', '');
    
    if (strippedHex.length === 3) {
      strippedHex = strippedHex[0] + strippedHex[0]
        + strippedHex[1] + strippedHex[1]
        + strippedHex[2] + strippedHex[2];
    }
    
    const r = parseInt(strippedHex.substring(0, 2));
    const g = parseInt(strippedHex.substring(2, 4));
    const b = parseInt(strippedHex.substring(4, 6));
    
    return {r, g, b};
  }
  
}