        
        function addItem() {
            const itemName = document.getElementById("itemName").value;
            const itemDescription = document.getElementById("itemDescription").value;
            const itemPrice = document.getElementById("itemPrice").value;
            const itemQuantity = document.getElementById("itemQuantity").value;

            // Create a unique ID for each item
            const itemId = new Date().getTime().toString();
             console.log(itemId);
            const newItem = {
                id: itemId,
                name: itemName,
                description: itemDescription,
                price: itemPrice,
                quantity: itemQuantity
            };

            // Check if there's existing data in local storage
            let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

            // Add the new item to the inventory
            inventory.push(newItem);

            // Save the updated inventory to local storage
            localStorage.setItem("inventory", JSON.stringify(inventory));

            // Clear the form fields
            document.getElementById("inventoryForm").reset();

            // Refresh the inventory table
            displayInventory();
        }

        // Function to display inventory in the table
        function displayInventory() {
            const inventoryTable = document.getElementById("inventoryTable");
            inventoryTable.innerHTML = "<tr><th>Item Name</th><th>Description</th><th>Price</th><th>Quantity</th><th>Action</th></tr>";

            // Retrieve inventory data from local storage
            const inventory = JSON.parse(localStorage.getItem("inventory")) || [];

            // Populate the table with inventory data
            inventory.forEach(item => {
                const row = `<tr>
                                <td>${item.name}</td>
                                <td>${item.description}</td>
                                <td>${item.price}</td>
                                <td>${item.quantity}</td>
                                <td><button onclick="buyItem('${item.id}')">Buy</button></td>
                            </tr>`;
                inventoryTable.innerHTML += row;
            });
        }

        // Function to update quantity when buying an item
        function buyItem(itemId) {
            let inventory = JSON.parse(localStorage.getItem("inventory")) || [];

            // Find the item in the inventory
            const selectedItem = inventory.find(item => item.id === itemId);

            if (selectedItem) {
                // Decrease the quantity by 1
                if(selectedItem.quantity===0){
                    return false
                }
                selectedItem.quantity = selectedItem.quantity - 1;
                // Save the updated inventory to local storage
                localStorage.setItem("inventory", JSON.stringify(inventory));

                // Refresh the inventory table
                displayInventory();
            }
        }

        // Display initial inventory on page load
        displayInventory();