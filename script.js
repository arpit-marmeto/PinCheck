document.getElementById('pincodeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const firstName = document.querySelector('input[name="firstName"]').value;
    const lastName = document.querySelector('input[name="lastName"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const pincode = document.getElementById('pincode').value;

    const statusMessage = document.getElementById('userDetails');

    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
        .then(response => response.json())
        .then(data => {
            let userDetailsHTML = `
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Pincode:</strong> ${pincode}</p>
            `;

            if(data[0].Status === "Success") {
                const postOffices = data[0].PostOffice;
                let deliveryStatuses = postOffices.map(po => `<p>${po.Name} - ${po.DeliveryStatus}</p>`).join('');
                userDetailsHTML += `<h3>Delivery Status</h3>${deliveryStatuses}`;
            } else {
                userDetailsHTML += `<p>${data[0].Message}</p>`;
            }

            statusMessage.innerHTML = userDetailsHTML;
            document.getElementById('popupForm').style.display = 'flex';
        })
        .catch(error => {
            statusMessage.innerHTML = `<p>There was an error fetching the data.</p>`;
            console.error('Error:', error);
            document.getElementById('popupForm').style.display = 'flex';
        });
});

function closePopup() {
    document.getElementById('popupForm').style.display = 'none';
}
