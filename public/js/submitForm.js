function submitForm() {
  console.log("Submit button clicked");

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;
  const footage = document.getElementById("footage").value;
  const facility = document.getElementById("facility").value;

  if (!email || !phone) {
    return;
  }

  var cap = grecaptcha.getResponse();

  if (cap.length == 0) {
      console.log("Didn't do the deal");

    $("#success").html("<div class='alert alert-danger'>");
    $("#success > .alert-danger")
      .html(
        "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
      )
      .append("</button>");
    $("#success > .alert-danger").append(
      $("<strong>").text("Check the box to ensure you're not a robot.")
    );
    $("#success > .alert-danger").append("</div>");

    return;
  }

  console.log("The deal is done");
  axios
    .post("https://us-central1-direct-disinfecting.cloudfunctions.net/submit", {
      name: name,
      email: email,
      phone: phone,
      message: message,
      footage: footage,
      facility: facility,
    })
    .then(function (response) {
      $("#success").html("<div class='alert alert-success'>");
      $("#success > .alert-success")
        .html(
          "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
        )
        .append("</button>");
      $("#success > .alert-success").append(
        "<strong>Your message has been sent. </strong>"
      );
      $("#success > .alert-success").append("</div>");
      //clear all fields
      $("#contactForm").trigger("reset");
    })
    .catch(function (error) {
      $("#success").html("<div class='alert alert-danger'>");
      $("#success > .alert-danger")
        .html(
          "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
        )
        .append("</button>");
      $("#success > .alert-danger").append(
        $("<strong>").text(
          "Sorry " +
            firstName +
            ", it seems that my mail server is not responding. Please try again later!"
        )
      );
      $("#success > .alert-danger").append("</div>");
    });
}
