// get search value
const searchButton = () => {
    const searchText = document.getElementById('search-field').value;
    document.getElementById('search-field').value = '';
    loadPhone(searchText);
};

// load phone data
const loadPhone = searchText => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data));
}
// loadPhone();