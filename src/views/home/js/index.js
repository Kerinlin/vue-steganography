import { ref, reactive } from 'vue';
export function useEncode(content, img) {
  const steg = window.steg;
  let encodeContent = content;
  const encodeContentResult = steg.encode(encodeContent, img);
  return encodeContentResult;
}

export function useDecode(img) {
  const steg = window.steg;
  const decodeResult = steg.decode(img);
  return decodeResult;
}

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
  console.log({ code });
  let parts = code.split(';base64,');
  let contentType = parts[0].split(':')[1];
  let raw = window.atob(parts[1]);
  let rawLength = raw.length;
  let uInt8Array = new Uint8Array(rawLength);
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  let blob = new Blob([uInt8Array], {
    type: contentType,
  });
  let blobUrl = URL.createObjectURL(blob);
  console.log({ blobUrl });
  return blobUrl;
}
