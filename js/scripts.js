const registerCard = (name) => {
    console.log(name)
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
        const isChecked = cardElem.checked;
        const checkedItems = ulCategory.querySelectorAll('li.checked').length;
        const totalItems = ulCategory.querySelectorAll('li').length;

        // Verifica se está tentando marcar o último
        if (isChecked && (checkedItems === totalItems - 1)) {
            // Impede que o último desmarcado seja marcado.
            event.preventDefault(); // Pode não funcionar para checkboxes, então usamos outra abordagem abaixo.
            cardElem.checked = false; // Desmarca o checkbox.
            return; // Encerra a execução adicional para esta mudança.
        }

        const cardListElem = cardElem.closest('li');
        const firstUncheckedItem = ulCategory.querySelector("li:not(.checked)");
        const cardId = cardElem.getAttribute('id');
        
        if (isChecked) {
            cardListElem.classList.add("checked");
            ulCategory.appendChild(cardListElem);
        } else {
            cardListElem.classList.remove("checked");
            if (firstUncheckedItem) {
                ulCategory.insertBefore(cardListElem, firstUncheckedItem);
            } else {
                ulCategory.appendChild(cardListElem); // Caso não haja nenhum desmarcado, apenas o adiciona ao final.
            }
        }

        registerCard(cardId)
        countCards(ulCategory)
    });

}
