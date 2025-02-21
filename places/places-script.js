        // Debounce function to limit how often the search function is called
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
        
        // Fuzzy search function to allow approximate matches
function fuzzySearch(text, searchTerm) {
    const searchTermLength = searchTerm.length;
    if (searchTermLength === 0) return true;
        
    let index = 0;
    for (let i = 0; i < text.length; i++) {
        if (text[i].toLowerCase() === searchTerm[index].toLowerCase()) {
                    index++;
            if (index === searchTermLength) return true;
        }
    }
    return false;
}
        
        // Highlight matching text
function highlightText(text, searchTerm) {
    if (!searchTerm) return text;
        
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, `<span class="highlight">$1</span>`);
}
        
        // Main search function
function filterItems() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const items = document.getElementById('itemList').getElementsByClassName('content-grid-item');
        
    for (let i = 0; i < items.length; i++) {
        const itemName = items[i].getAttribute('data-name').toLowerCase();
        const itemDescription = items[i].getAttribute('data-description').toLowerCase();
        
        // Check if the search term matches the name or description
        if (fuzzySearch(itemName, searchTerm) || fuzzySearch(itemDescription, searchTerm)) {
            items[i].classList.remove('hidden');
            // Highlight the matching text in the header and paragraph
            const header = items[i].querySelector('.content-grid-item-header');
            const paragraph = items[i].querySelector('.grid-item-text');
            header.innerHTML = highlightText(header.textContent, searchTerm);
            paragraph.innerHTML = highlightText(paragraph.textContent, searchTerm);
        } else {
            items[i].classList.add('hidden');
        }
    }
}
        
        // Attach the debounced search function to the input
document.getElementById('searchBar').addEventListener('input', debounce(filterItems, 500));