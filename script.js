document.getElementById('pincodeForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const pincode = form.pincode.value;
    const statusMessage = document.getElementById('userDetails');
    const popupForm = document.getElementById('popupForm');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    let userDetailsHTML = `
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Pincode:</strong> ${pincode}</p>
    `;

    try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await response.json();

        if (data[0].Status === "Success") {
            const deliveryStatuses = data[0].PostOffice.map(po => `<p>${po.Name} - ${po.DeliveryStatus}</p>`).join('');
            userDetailsHTML += `<h3>Delivery Status</h3>${deliveryStatuses}`;
        } else {
            userDetailsHTML += `<p>${data[0].Message}</p>`;
        }
        
    } catch (error) {
        userDetailsHTML += `<p>There was an error fetching the data.</p>`;
        console.error('Error:', error);
    }

    statusMessage.innerHTML = userDetailsHTML;
    popupForm.style.display = 'flex';
});

function closePopup() {
    document.getElementById('popupForm').style.display = 'none';
    document.getElementById('pincodeForm').reset();
}
