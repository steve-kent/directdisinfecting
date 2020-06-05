function submitForm()
{
    console.log("Submit button clicked");

    const email = document.getElementById('email').nodeValue;

    axios.post('https://us-central1-direct-disinfecting.cloudfunctions.net/submit', 
    {
        email: email
    })
    .then(function(response) 
    {
        console.log('response: ' + response);
    })
    .catch(function(error) 
    {
        console.error(error);
    } )
}