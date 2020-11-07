window.onload = function () {
  
  // Get the element from the document
  const hexInput = document.getElementById('hexInput');
  const inputColorBox = document.getElementById('inputColor');
  const alteredColorBox = document.getElementById('alteredColor');
  const alteredColorText = document.getElementById('alteredColorText');
  const sliderText = document.getElementById('sliderText');
  const slider = document.getElementById('slider');
  const lightenText = document.getElementById('lightenText');
  const darkenText = document.getElementById('darkenText');
  const toggleBtn = document.getElementById('toggleBtn');

  // Add an event listener for the key up event to the hexInput input
  hexInput.addEventListener('keyup', () => {
    let hexValue = hexInput.value;
    if (!isValidHex(hexValue)) return;
  
    // remove the # if it have one
    hexValue = hexValue.replace('#', '');
  
    // Change the background of the box
    inputColorBox.style.backgroundColor = '#' + hexValue;
    alteredColorBox.style.backgroundColor = '#' + hexValue;
    sliderText.textContent = '0%';
    slider.value = 0;
  })
  
  // Add an event listener to the slider
  slider.addEventListener('input', () => {
    
    // Update the label
    sliderText.textContent = slider.value + '%';
    
    // Check that the hex in the hexInput field is valid
    if (!isValidHex(hexInput.value)) return;
    
    const sliderValue = toggleBtn.classList.contains('toggled') ? -slider.value : slider.value;
    const alteredHex = alterColor(hexInput.value, sliderValue);
    alteredColorBox.style.backgroundColor = alteredHex;
    alteredColorText.innerText = 'Altered Color ' + alteredHex;
    
  })
  
  // Add an event listener to the toggle button
  toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('toggled');
    lightenText.classList.toggle('unselected');
    darkenText.classList.toggle('unselected');
    
    // reset slider, sliderText and alteredColorBox's color
    const hexValue = hexInput.value;
    if (!isValidHex(hexValue)) return;
    alteredColorBox.style.backgroundColor = hexValue;
    alteredColorText.innerText = 'Altered Color ' + hexValue;
    sliderText.textContent = '0%'
    slider.value = 0;
  })
  
  // Compute altered color
  const alterColor = (hex, percentage) => {
    
    let { r, g, b } = convertHexToRGB(hex);
    
    const amount = Math.floor(percentage / 100 * 255);
    
    return convertRGBToHex(
      increasWithinRange0_255(r, amount),
      increasWithinRange0_255(g, amount),
      increasWithinRange0_255(b, amount)
    )
    
  }
  
  // Check that the sum stay in the range 0-255
  const increasWithinRange0_255 = (num, amount) => {
    
    /*num += amount;
    
    if (num >= 255) return 255;
    if (num <= 0) return 0;
    return num;*/
    return Math.min(255, Math.max(0, num + amount));
    
  }
  
  // Check too see whether the input from the user is a valid hex color
  const isValidHex = (hex) => {
  
    if (!hex) return false;
  
    const strippedHex = hex.replace('#', '');
    return strippedHex.length === 3 || strippedHex.length === 6;
  
    // TODO: Check that is a valid hex ([0-9], [a-f])
  
  }
  
  // Convert an hex value to an RGB one
  const convertHexToRGB = (hex) => {
    
    if (!isValidHex(hex)) return null;
    
    let strippedHex = hex.replace('#', '');
    
    if (strippedHex.length === 3) {
      strippedHex = strippedHex[0] + strippedHex[0]
        + strippedHex[1] + strippedHex[1]
        + strippedHex[2] + strippedHex[2];
    }
    
    console.log(strippedHex.substring(0, 2));
    const r = parseInt(strippedHex.substring(0, 2), 16);
    const g = parseInt(strippedHex.substring(2, 4), 16);
    const b = parseInt(strippedHex.substring(4, 6), 16);
    
    return {r, g, b};
  }
  
  // Convert an RGB value to an hex one
  const convertRGBToHex = (r, g, b) => {
    
    let firstPair = ('0' + r.toString(16)).slice(-2);
    let secondPair = ('0' + g.toString(16)).slice(-2);
    let thirdPair = ('0' + b.toString(16)).slice(-2);
    
    return '#' + firstPair + secondPair + thirdPair
  }
  
}