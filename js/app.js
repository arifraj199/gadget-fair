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
    .then(value => displayPhone(value.data));
}

const displayPhone = phones => {
    // console.log(phones);
    const displayPhone = document.getElementById('display-phone');
    const error = document.getElementById('error');
    phones.forEach(phone => {
        // console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="h-100">
            <img src="${phone.image}" alt="...">
            <div class="card-body">
                <h4>Phone: ${phone.phone_name}</h4>
                <h5>Brand: ${phone.brand}</h5>
                <button class="explore-button">Explore</button>
            </div>
        </div>
        `;
        displayPhone.appendChild(div);
    })
}