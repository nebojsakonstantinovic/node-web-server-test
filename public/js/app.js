console.log('Klijentska patka');

// fetch('http://puzzle.mead.io/puzzle').then(res => {
//   res.json().then(data => {
//     console.log(data);
//   });
// });

const weatherFrom = document.querySelector('form');
const search = document.querySelector('input');

weatherFrom.addEventListener('submit', e => {
  e.preventDefault();

  const location = search.value;

  console.log(location);

  fetch(`http://localhost:5000/weather?address=${location}`).then(res => {
    res.json().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
      }
    });
  });
});
