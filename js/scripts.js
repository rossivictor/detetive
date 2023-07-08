const registerCard = (name) => {
    // console.log(name)
}

const countCards = (x) => {
    const cardCategory = x.getAttribute('id')
    const totalCards = x.querySelectorAll('li').length;
    let checkedCards = totalCards - (x.querySelectorAll('li.checked').length);
    let percentage = checkedCards / totalCards;

    const container = document.getElementById(`cont-${cardCategory}`);

    if (percentage <= 0.35 && percentage > 0.2) {
        container.innerText = `\u{1F525} ${checkedCards} / ${totalCards}`
    } else if (percentage <= 0.2) {
        container.innerText = `\u{1F3AF} ${checkedCards} / ${totalCards}`
    } else {
        container.innerText = `${checkedCards} / ${totalCards}`
    }
}

const allCategories = document.getElementsByTagName("ul");
for (let i = 0; i <= 2; i++) {
    const ulCategory = allCategories[i];

    ulCategory.addEventListener("change", function(event) {
        const cardElem = event.target;
        const cardId = cardElem.getAttribute('id');
        const cardListElem = cardElem.closest('li');
        const isChecked = cardElem.checked;
        const firstUncheckedItem = ulCategory.querySelector("li:not(.checked)");
        
        if (isChecked) {
            cardListElem.classList.add("checked");
            ulCategory.appendChild(cardListElem);
        } else {
            cardListElem.classList.remove("checked");
            ulCategory.insertBefore(cardListElem, firstUncheckedItem);
        }

        registerCard(cardId)
        countCards(ulCategory)
    });

}
