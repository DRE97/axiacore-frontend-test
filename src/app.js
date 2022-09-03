import './styles/styles.scss'

const headerTemplate = require('./templates/header.hbs')
const productsTemplate = require('./templates/product.hbs')
const helpSectionTemplate = require('./templates/helpSection.hbs')
const continueSectionTemplate = require('./templates/continueSection.hbs')
const modalContentTemplate = require('./templates/modalContent.hbs')
const footerTemplate = require('./templates/footer.hbs')

const data = {
    "products": [
        {
            "name": "Cassels Milk Stou",
            "description": "Cassels & Sons Brewing. Cerveza porter y stout.",
            "price": 75000,
            "img": "./assets/cassels.png",
            "filterId": 1
        },
        {
            "name": "Camba Pale Ale",
            "description": "La Souche Franc-Bois d’hiver. Cerveza pale.",
            "price": 85300,
            "img": "./assets/camba.png",
            "filterId": 2
        },
        {
            "name": "Votus Nº 001",
            "description": "India Pale Ale del año 2019. Nº 001 Red IPA.",
            "price": 75000,
            "img": "./assets/votus.png",
            "filterId": 3
        },
        {
            "name": "Prairie Artisian",
            "description": "Ales Prairie Noir Whiskey Barrel Aged Imperial Stout 12oz.",
            "price": 85300,
            "img": "./assets/prairie-artisian.png",
            "filterId": 1
        },
        {
            "name": "Lost Abbey",
            "description": "The Lost Abbey Citrus Sin American Wild Ale 750ml.",
            "price": 75000,
            "img": "./assets/lost-abbey.png",
            "filterId": 2
        },
        {
            "name": "Prairie",
            "description": "Prairie Artisa Ales Paradise Imperial Stout 12oz.",
            "price": 85300,
            "img": "./assets/prairie.png",
            "filterId": 3
        },
        {
            "name": "Redrice",
            "description": "Hitachino Nest Beer Red Rice Ale 330ml.",
            "price": 85300,
            "img": "./assets/redrice.png",
            "filterId": 1
        },
        {
            "name": "Cascade",
            "description": "Cascade Brewing 2017 Brunch Line BA NORTHWEST Sour Ale.",
            "price": 175000,
            "img": "./assets/cascade.png",
            "filterId": 2
        },
        {
            "name": "Topa Topa",
            "description": "Topa Topa BREWING CO. 5th Year Anniversary clear Ipa 16oz.",
            "price": 85300,
            "img": "./assets/topa.png",
            "filterId": 3
        },
        {
            "name": "Mira Brune Nº 6",
            "description": "Brown Ale, Brown Mira American Style.",
            "price": 375000,
            "img": "./assets/mira.png",
            "filterId": 1
        }
    ]
}

class App {
    filterModal = document.getElementById("filter-modal");
    overlayModal = document.getElementById("overlay");
    filterBtn = document.getElementById("open-filter-btn");

    constructor() {
        this.renderApp()
        this.addAppEvents()
    }

    renderApp() {
        this.renderHeader()
        this.renderAllProducts()
        this.renderHelpSection()
        this.renderContinueSection()
        this.renderModalContent()
        this.renderFooter()
    }

    renderHeader() {
        const productsContainer = document.getElementById('navbar')
        productsContainer.innerHTML = headerTemplate()
    }

    renderProducts(data) {
        const productsContainer = document.getElementById('productsContainer')
        productsContainer.innerHTML = productsTemplate(data)
    }

    renderHelpSection() {
        const sectionContainer = document.getElementById('help-section')
        sectionContainer.innerHTML = helpSectionTemplate()
    }

    renderContinueSection() {
        const sectionContainer = document.getElementById('continue-section')
        sectionContainer.innerHTML = continueSectionTemplate()
    }

    renderModalContent() {
        const modalContainer = document.getElementById('filter-modal')
        modalContainer.innerHTML = modalContentTemplate()
    }

    renderFooter() {
        const footerContainer = document.getElementById('footer')
        footerContainer.innerHTML = footerTemplate()
    }

    addAppEvents() {
        this.filterBtn.addEventListener('click', this.openModal.bind(this))
        document.getElementById("close-btn").addEventListener('click', this.closeModal.bind(this))
        document.getElementById('filter-btn').addEventListener('click', this.filterProducts.bind(this))
        document.getElementById('clear-btn').addEventListener('click', this.clearFilters.bind(this))
        document.getElementById('filter-options').addEventListener('click', this.checkSelectedItems.bind(this))
        window.addEventListener('click', this.closeModal.bind(this))
    }

    renderAllProducts() {
        this.renderProducts(data)
    }

    openModal() {
        this.filterModal.className = this.filterModal.className.replace('hidden', '').trim()
        this.overlayModal.className = this.overlayModal.className.replace('hidden', '').trim()
        this.checkSelectedItems()
    }

    closeModal(event, forceClose = false) {
        const closeButton = document.getElementById("close-btn")

        if ((event?.target == this.overlayModal || event?.target == closeButton) && !this.filterModal.className.includes('hidden')) {
            if(!this.filterModal.className.includes('hidden')) this.filterModal.className += ' hidden'
            if(!this.overlayModal.className.includes('hidden')) this.overlayModal.className += ' hidden'
        } else if(forceClose) {
            if(!this.filterModal.className.includes('hidden')) this.filterModal.className += ' hidden'
            if(!this.overlayModal.className.includes('hidden')) this.overlayModal.className += ' hidden'
        }
    }

    getCheckedElements() {
        const checkedElements = document.querySelectorAll('.form-check-input:checked')
        return Array.from(checkedElements)
    }

    filterProducts() {
        const checkedElements = this.getCheckedElements()
        const checkedValues = checkedElements.map(element => element.value)

        if(checkedValues.length > 0) {
            const filteredProducts = data.products.filter(product => checkedValues.includes(product.filterId.toString()))

            // Render Filtered Products
            this.renderProducts({ products: filteredProducts })
        } else {
            this.renderAllProducts()
        }

        /**
         * null -> No Event is passed
         * true -> Force close
         */
        this.closeModal(null, true)
    }

    clearFilters() {
        // Clear Inputs
        const checkedElements = this.getCheckedElements()
        checkedElements.forEach(element => {
            element.checked = false
        })
        
        this.renderAllProducts()

        /**
         * null -> No Event is passed
         * true -> Force close
        */
        this.closeModal(null, true)
    }

    checkSelectedItems() {
        const checkedElements = this.getCheckedElements()
        const cleatButton = document.getElementById('clear-btn')

        if(checkedElements.length == 0) {
            cleatButton.disabled = true
        } else {
            cleatButton.disabled = false
        }
    }
}

// Create App instance
new App()