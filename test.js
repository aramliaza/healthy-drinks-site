/* Drink */
document.addEventListener('DOMContentLoaded', function () {
    const filterBtns = document.querySelectorAll('.filter-btn')
    const drinkCards = document.querySelectorAll('.drink-card')
    const searchInput = document.querySelector('.search-bar input')

    filterBtns.forEach((btn) => {
        btn.addEventListener('click', function () {
            const btnGroup = this.parentElement
            btnGroup
                .querySelectorAll('.filter-btn')
                .forEach((b) => b.classList.remove('active'))
            this.classList.add('active')

            const filterValue = this.getAttribute('data-filter')
            const filterGroup =
                this.closest('.filter-group').querySelector('h3').textContent

            filterDrinks()
        })
    })

    searchInput.addEventListener('input', function () {
        filterDrinks()
    })

    function filterDrinks() {
        const activeTypeBtn = document.querySelector(
            '.filter-group:first-child .filter-btn.active'
        )
        const typeFilter = activeTypeBtn.getAttribute('data-filter')

        const activeBenefitBtns = document.querySelectorAll(
            '.filter-group:nth-child(2) .filter-btn.active'
        )
        const benefitFilters = []
        activeBenefitBtns.forEach((btn) =>
            benefitFilters.push(btn.getAttribute('data-filter'))
        )

        const searchTerm = searchInput.value.toLowerCase()

        drinkCards.forEach((card) => {
            const cardType = card.getAttribute('data-type')
            const cardTags = card.getAttribute('data-tags').split(',')
            const cardName = card
                .querySelector('.drink-name')
                .textContent.toLowerCase()
            const cardDesc = card
                .querySelector('.drink-description')
                .textContent.toLowerCase()

            const typeMatch = typeFilter === 'all' || cardType === typeFilter

            let benefitMatch = true
            if (benefitFilters.length > 0 && !benefitFilters.includes('all')) {
                benefitMatch = benefitFilters.some((filter) =>
                    cardTags.includes(filter)
                )
            }

            const searchMatch =
                searchTerm === '' ||
                cardName.includes(searchTerm) ||
                cardDesc.includes(searchTerm)

            if (typeMatch && benefitMatch && searchMatch) {
                card.style.display = 'block'
            } else {
                card.style.display = 'none'
            }
        })
    }

    filterDrinks()
})

/* Contact */
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Mencegah reload halaman

        // Ambil data form
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        // Validasi sederhana
        if (!name || !email || !message) {
            alert("Please fill in all fields.");
            return;
        }

        // Tampilkan pesan sukses
        alert("Thank you! Your message has been sent.");

        // Reset form
        form.reset();
    });
});
