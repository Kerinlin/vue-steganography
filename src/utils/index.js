export function getPreviewPic(event) {
  let file = event.target.files[0];
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export function base64ToBlobUrl(code) {
  let parts = code.split(';base64,');
  let contentType = parts[0].split(':')[1];
  let raw = window.atob(parts[1]);
  let uInt8Array = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  let blob = new Blob([uInt8Array], {
    type: contentType,
  });
  let blobUrl = URL.createObjectURL(blob);
  return blobUrl;
}

// returns a 1 or 0 for the bit in 'location'
function getBit(number, location) {
  return (number >> location) & 1;
}

// returns an array of 1s and 0s for a 2-byte number
function getBitsFromNumber(number) {
  let bits = [];
  for (var i = 0; i < 16; i++) {
    bits.push(getBit(number, i));
  }
  return bits;
}

// returns an array of 1s and 0s for the string 'message'
function getMessageBits(message) {
  let messageBits = [];
  for (let i = 0; i < message.length; i++) {
    let code = message.charCodeAt(i);
    messageBits = messageBits.concat(getBitsFromNumber(code));
  }
  return messageBits;
}

// gets the next location to store a bit
function getNextLocation(history, hash, total) {
  let pos = history?.length;
  let loc = Math.abs(hash[pos % hash.length] * (pos + 1)) % total;
  while (true) {
    if (loc >= total) {
      loc = 0;
    } else if (history.indexOf(loc) >= 0) {
      loc++;
    } else if ((loc + 1) % 4 === 0) {
      loc++;
    } else {
      history.push(loc);
      return loc;
    }
  }
}

// sets the bit in 'location' to 'bit' (either a 1 or 0)
function setBit(number, location, bit) {
  return (number & ~(1 << location)) | (bit << location);
}

export function encodeMessage(colors, hash, message) {
  let messageBits = getBitsFromNumber(message.length);
  messageBits = messageBits.concat(getMessageBits(message));
  // this will store the color values we've already modified
  let history = [];

  // encode the bits into the pixels
  let pos = 0;
  while (pos < messageBits.length) {
    // set the next color value to the next bit
    var loc = getNextLocation(history, hash, colors?.length);
    colors[loc] = setBit(colors[loc], 0, messageBits[pos]);

    // set the alpha value in this pixel to 255
    // we have to do this because browsers do premultiplied alpha
    // see for example: http://stackoverflow.com/q/4309364
    while ((loc + 1) % 4 !== 0) {
      loc++;
    }
    colors[loc] = 255;
    pos++;
  }
}

// returns the next 2-byte number
function getNumberFromBits(bytes, history, hash) {
  let number = 0,
    pos = 0;
  while (pos < 16) {
    let loc = getNextLocation(history, hash, bytes.length);
    let bit = getBit(bytes[loc], 0);
    number = setBit(number, pos, bit);
    pos++;
  }
  return number;
}

export function decodeMessage(colors, hash) {
  // this will store the color values we've already read from
  let history = [];

  // get the message size
  let messageSize = getNumberFromBits(colors, history, hash);

  // put each character into an array
  let message = [];
  for (let i = 0; i < messageSize; i++) {
    let code = getNumberFromBits(colors, history, hash);
    message.push(String.fromCharCode(code));
  }

  // the characters should parse into valid JSON
  return message.join('');
}
