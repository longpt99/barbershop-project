const gender = document.querySelectorAll('option');
let user = null;

async function fetchData() {
  await axios.get('/profile/data').then((res) => {
    user = res.data;
    gender.forEach((option) => option.removeAttribute('selected'));
    document
      .querySelector(`option[value=${user.gender}]`)
      .setAttribute('selected', 'selected');
  });
}
fetchData();
