function submitForm()
{
    console.log("Submit button clicked");

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    const footage = document.getElementById('footage').value;
    const facility = document.getElementById('facility').value;

    axios.post('https://us-central1-direct-disinfecting.cloudfunctions.net/submit', 
    {
        name: name,
        email: email,
        phone: phone,
        message: message,
        footage: footage,
        facility: facility
    })
    .then(function(response) 
    {
    })
    .catch(function(error) 
    {
    } )
}