export default function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Geolocation не поддерживается');
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      () => reject('Access to geolocation is denied')
    );
  });
}
