// get search value
const searchButton = () => {
    const searchText = document.getElementById('search-field').value;
    document.getElementById('search-field').value = '';
    toggleSpinner('block');
    // load phone
    loadPhone(searchText);
};

// load phone data
const loadPhone = searchText => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(value => displayPhone(value.data));
}

// spinner toggle
const toggleSpinner = display => {
    const spinner = document.getElementById('spinner');
    spinner.style.display = display;
}

// display phone
const displayPhone = phones => {
    // console.log(phones);
    const displayPhone = document.getElementById('display-phone');
    const phoneDetails = document.getElementById('phone-details');
    displayPhone.textContent = '';
    phoneDetails.textContent = '';
    const error = document.getElementById('error');
    if(phones.length !== 0){
        phones.slice(0,20).forEach(phone => {
            // console.log(phone);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="h-100 text-center">
                <img src="${phone.image}" alt="...">
                <div class="card-body">
                    <h4>${phone.phone_name}</h4>
                    <h5>Brand: ${phone.brand}</h5>
                    <button onclick = "phoneDetails('${phone.slug}')" class="explore-button">Explore</button>
                </div>
            </div>
            `;
            toggleSpinner('none');
            displayPhone.appendChild(div);
            error.innerText = '';
        })
    }else{
        toggleSpinner('none');
        error.innerText = 'no result found';
    };
};

// phone details by id
const phoneDetails = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetails(data.data));
};

// display phone details
const displayDetails = details => {
    // console.log(details);
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div class="card h-100">
        <div class='text-center'>
            <img class="img-fluid" src="${details.image}" alt="...">
        </div>
        <div class="card-body">
            <h5><span class="fw-bold">Model:</span> ${details.name}</h5>
            <h5><span class="fw-bold">Release Date:</span> ${details.releaseDate !== ''?details.releaseDate:'<span class="text-danger">no release date found</span>'}</h5>
            <h5><span class="fw-bold">Chipset:</span> ${details.mainFeatures.chipSet}</h5>
            <h5><span class="fw-bold">Memory:</span> ${details.mainFeatures.memory}</h5>
            <h5><span class="fw-bold">Storage:</span> ${details.mainFeatures.storage}</h5>
            <h5><span class="fw-bold">Display:</span> ${details.mainFeatures.displaySize}</h5>
            <h5><span class="fw-bold">Sensors:</span> ${details.mainFeatures.sensors}</h5>
            <h5 class="fw-bold">Others: 
            <h5><span class="fw-normal">WLAN:</span> ${details.others !== undefined?details.others.WLAN:'<span class="text-danger">details not found</span>'}</h5>
            <h5><span class="fw-normal">Bluetooth:</span> ${details.others !== undefined?details.others.Bluetooth:'<span class="text-danger">details not found</span>'}</h5>
            <h5><span class="fw-normal">GPS:</span> ${details.others !== undefined?details.others.GPS:'<span class="text-danger">details not found</span>'}</h5>
            <h5><span class="fw-normal">NFC:</span> ${details.others !== undefined?details.others.NFC:'<span class="text-danger">details not found</span>'}</h5>
            </h5>
        </div>
    </div>
    `;
    toggleSpinner('none');
    phoneDetails.appendChild(div);
}