const container = document.querySelector('.container');
const lockers = document.querySelectorAll('.row .locker:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const wingSelect = document.getElementById('wing');

populateUI();

let lockerPrice = +wingSelect.value;

//Save selected wing, index and price
function SetWingData(wingIndex, wingPrice){
    localStorage.setItem('selectedWingIndex', wingIndex);
    localStorage.setItem('selectedWingPrice', wingPrice);
}

//update total and count
function updateSelectedCount() {
    const selectedLockers = document.querySelectorAll('.row .locker.selected');

    const lockersIndex = [...selectedLockers].map(function(locker){
        return [...lockers].indexOf(locker);
    });

    localStorage.setItem('selectedLockers', JSON.stringify(lockersIndex))

    const selectedLockersCount = selectedLockers.length;
    count.innerText = selectedLockersCount;
    total.innerText = selectedLockersCount * lockerPrice;
}

//get data from local storage and put it in UI
function populateUI(){
    const selectedLockers = JSON.parse(localStorage.getItem('selectedLockers'))

    if (selectedLockers !== null && selectedLockers.length > 0) {
        lockers.forEach((locker, index) => {
            if(selectedLockers.indexOf(index) > -1){
                locker.classList.add('selected')
            }
        })
    }

    const selectedWingIndex = localStorage.getItem('selectedWingIndex');

    if(selectedWingIndex !== null) {
        wingSelect.selectedIndex = selectedWingIndex;
    }
}


//locker select event
wingSelect.addEventListener('change', (e) => {
    lockerPrice = +e.target.value;
    SetWingData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

container.addEventListener('click', (e) => {
    if(e.target.classList.contains('locker') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
    }

    updateSelectedCount();
});

updateSelectedCount()