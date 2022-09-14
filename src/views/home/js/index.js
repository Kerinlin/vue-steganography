import { ref, reactive } from 'vue';
export function useEncode(content, img) {
  const steg = window.steg;
  let encodeContent = content;
  const encodeContentResult = steg.encode(encodeContent, img);
  return {
    encodeContentResult,
  };
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
