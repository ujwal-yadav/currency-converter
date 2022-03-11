const optionList = document.querySelectorAll("form select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for (let i = 0; i < optionList.length; i++) {
    for (let currency_code in countryList) {
        let selected = i == 0 ? currency_code == "USD" ? "selected" : "" : currency_code == "INR" ? "selected" : "";
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`
        optionList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    optionList[i].addEventListener("change", e => {
        loadFlag(e.target);
    });
}

const loadFlag = (ele) => {
    for (let code in countryList) {
        if (code == ele.value) {
            let imgTag = ele.parentElement.querySelector("img");
            imgTag.src = `https://flagcdn.com/48x36/${countryList[code].toLowerCase()}.png`;
        }
    }
}

const convert = (e) => {
    
    const amount = document.querySelector("form input");
    const exchangeRateTxt = document.querySelector("form .response-text");
    let amountVal = amount.value;
    if (amountVal == "" || amountVal == "0") {
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6/28feb67f79e5c4abe84e3d8f/latest/${fromCurr.value}`

    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurr.value];
        let totalExRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amountVal} ${fromCurr.value} = ${totalExRate} ${toCurr.value}`;
    }).catch(() => {
        exchangeRateTxt.innerText = "Something went wrong !";
    });
}

window.addEventListener("load", ()=>{
    const exchangeRateTxt = document.querySelector("form .response-text");
    exchangeRateTxt.innerText = "";
});

const exchangecurr=()=>{
    let temp = fromCurr.value;
    fromCurr.value = toCurr.value; 
    toCurr.value = temp; 
    loadFlag(fromCurr);
    loadFlag(toCurr);
}