document.getElementById('next-btn').addEventListener('click', function () {

    var name = document.getElementById('name').value.trim();
    var dob = document.getElementById('dob').value.trim();
    var address = document.getElementById('address').value.trim();
    var city = document.getElementById('city').value.trim();
    var state = document.getElementById('state').value;
    var zipcode = document.getElementById('zipcode').value.trim();
    var idProof = document.getElementById('idProof').value;
    var id = document.getElementById('id').value.trim();

    // Reset error messages
    var errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function (element) {
        element.textContent = '';
    });

    // Validate inputs
    var isValid = true;
    if (name === '') {
        document.getElementById('name-error').textContent = 'Please enter your name';
        isValid = false;
    }
    if (dob === '') {
        document.getElementById('dob-error').textContent = 'Please enter your date of birth';
        isValid = false;
    }
    if (address === '') {
        document.getElementById('address-error').textContent = 'Please enter your address';
        isValid = false;
    }
    if (city === '') {
        document.getElementById('city-error').textContent = 'Please enter your city';
        isValid = false;
    }
    if (state === '') {
        document.getElementById('state-error').textContent = 'Please select your state';
        isValid = false;
    }
    if (zipcode === '' || !/^\d{1,6}$/.test(zipcode) || zipcode.length !== 6) {
        document.getElementById('zipcode-error').textContent = 'Please enter a valid zip code (max 6 digits)';
        isValid = false;
    }
    if (idProof === '') {
        document.getElementById('idProof-error').textContent = 'Please select your ID proof';
        isValid = false;
    }
    if (id === '') {
        document.getElementById('id-error').textContent = 'Please enter your ID';
        isValid = false;
    }

    // Additional validation for ID proof
    if (idProof === 'aadhar' && !/^\d{12}$/.test(id)) {
        document.getElementById('id-error').textContent = 'Please enter a Aadhar Card number';
        isValid = false;
    }
    if (idProof === 'pan' && id.length !== 10) {
        document.getElementById('id-error').textContent = 'Please enter a valid Pan Card number';
        isValid = false;
    }

    // Check if all form inputs are filled and photo is captured
    if (isValid) {
        // Submit form or proceed with further actions
        // For now, let's just alert that the form is ready to submit
        alert('Form is submitted!');
    } else {
        // Show popup indicating that the form is not complete
        alert('Please fill all form fields');
    }
});

function startDictation(inputFieldId) {
    const inputField = document.getElementById(inputFieldId);
    const recognition =
        new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = function (event) {
        inputField.value = event.results[0][0].transcript;
    };
    recognition.start();
}

// Get access to the camera
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
        var video = document.getElementById('video');
        video.srcObject = stream;
        video.play();
    });
}

// Elements for taking the snapshot
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var video = document.getElementById('video');
var snapButton = document.getElementById('snap');
var retakeButton = document.getElementById('retake');


// Trigger photo take
snapButton.addEventListener("click", function () {
    canvas.style.display = 'block';
    retakeButton.style.display = 'inline-block';
    video.style.display = 'none';
    snapButton.style.display = 'none';
    context.drawImage(video, 0, 0, 640, 380);
});

// Retake photo
retakeButton.addEventListener("click", function () {
    canvas.style.display = 'none';
    retakeButton.style.display = 'none';
    video.style.display = 'block';
    snapButton.style.display = 'inline-block';
});

async function extractAndCompare() {

    const fileInput = document.getElementById("fileInput");

    if (!fileInput.files || fileInput.files.length === 0) {
        alert("Please select an image file.");
        return;
    }

    alert("Processing.....");

    const inputs = [
        document.getElementById("name").value.trim().toLowerCase(),
        document.getElementById("dob").value.trim().toLowerCase(),
        document.getElementById("address").value.trim().toLowerCase(),
        document.getElementById("city").value.trim().toLowerCase(),
        document.getElementById("zipcode").value.trim().toLowerCase(),
        document.getElementById("id").value.trim().toLowerCase(),
    ];

    const file = fileInput.files[0];
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file); // Set source to local file

    // Wait for the image to load
    await new Promise((resolve) => {
        img.onload = resolve;
    });

    // Extract text from image
    const {
        data: { text },
    } = await Tesseract.recognize(img, "eng", {
        logger: (m) => console.log(m),
    });

    const extractedTextLower = text.trim().toLowerCase();

    // Display extracted text
    // document.getElementById("extractedText").innerText =
    //     "Extracted Text: " + text;

    // Check if at least 2 inputs match with the extracted text
    let matchCount = 0;
    for (let i = 0; i < inputs.length; i++) {
        if (extractedTextLower.includes(inputs[i])) {
            matchCount++;
        }
    }

    // if (matchCount >= 2) {
    //     alert("At least 2 inputs match with the extracted text!");
    // } else {
    //     alert("Not enough inputs match with the extracted text!");
    // }

    window.location.href = `../result.html?matchCount=${matchCount}`;
}