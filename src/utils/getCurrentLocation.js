export default function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Geolocation is not supported');
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      () => reject(),
    );
  });
}
