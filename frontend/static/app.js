document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'http://localhost:5000/items';

    // Fetch and display items
    function fetchItems() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const itemList = document.getElementById('item-list');
                itemList.innerHTML = '';
                data.forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `${item.name} <button data-id="${item.id}">Delete</button>`;
                    itemList.appendChild(li);
                });
            });
    }

    // Add a new item
    document.getElementById('item-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const itemName = document.getElementById('item-input').value;

        fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: itemName })
        })
        .then(() => {
            document.getElementById('item-input').value = '';
            fetchItems();
        });
    });

    // Delete an item
    document.getElementById('item-list').addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') {
            const itemId = e.target.getAttribute('data-id');
            fetch(`${apiUrl}/${itemId}`, { method: 'DELETE' })
            .then(() => fetchItems());
        }
    });

    // Load items initially
    fetchItems();
});
