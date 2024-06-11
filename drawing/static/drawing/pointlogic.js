document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    let points = [];

    const MIN_POINTS = 3;
    let pointDataConfirmed = false;

    // Load the background image
    const backgroundImage = new Image();
    backgroundImage.src = '/static/drawing/canvas_bg_medel.jpg'; // Ensure this path is correct

    function drawBackground() {
        // Draw the background image on the canvas
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    };

    backgroundImage.onload = drawBackground

    // Function to handle canvas clicks
    function handleCanvasClick(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        drawPoint(x, y);
        connectPoint(x, y);
        points.push({ x, y });
    }

    // Function to draw a point on the canvas
    function drawPoint(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();
    }

    function connectPoint(x, y) {
        if (points.length === 0){
            console.log('points is empty')
            return;
        };
        console.log('POINTS :: ' + points)
        let previousPoint = points[points.length - 1];
        console.log('points is :: (' + previousPoint.x + ', ' + previousPoint.y + ')')
        ctx.beginPath();
        ctx.moveTo(previousPoint.x, previousPoint.y);
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    function resetCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // reset the points array
        while (points.length > 0) {
            points.pop();
        }
        // reset the points-containing textarea element and ensure t
        let pointsElement = document.getElementById('pointCoords');
        pointsElement.value = '';
        // it should not be problematic to add the same event listener callback
        // multiple times following this piece of documentation
        // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Multiple_identical_event_listeners
        canvas.addEventListener('click', handleCanvasClick);
        pointDataConfirmed = false;
        drawBackground();
    }


    // Function to get and log the points
    function confirmData() {
        pcount = points.length
        if (pcount < MIN_POINTS){
            alert(
                  `Found only ${pcount} points on the canvas.
                   This is an insufficient number of points.
                   Please mark at least ${MIN_POINTS} points.`
            )
            return;
        }
        let pointsElement = document.getElementById('pointCoords');
        pointsElement.value = JSON.stringify(points); 
        
        // make canvas static to fix the user-selected points
        canvas.removeEventListener('click', handleCanvasClick);
        pointDataConfirmed = true;
    }


    function makeFinalCheck() {

        function compoundCallback(event) {
            if (!pointDataConfirmed) {
                event.preventDefault();
                alert('Please confirm the point data with the corresponding button before submitting.')
                return;
            }
            else {
                return;
            }
        };
        return compoundCallback;
    }
    
    // Event listener for canvas clicks
    canvas.addEventListener('click', handleCanvasClick);
    // wire reset button functionality
    document.getElementById('resetButton').addEventListener('click', resetCanvas);
    // wire confirm data button
    document.getElementById('confirmDataButton').addEventListener('click', confirmData);

    let compoundCallback = makeFinalCheck()
    document.getElementById('submitButton').addEventListener('click', compoundCallback);
});


// async function sendPayload() {

//     let payload = {
//         userinfo : JSON.stringify(getFormData('userDetails')),
//         points : JSON.stringify(points)
//     }

//     try {
//         const response = await fetch(
//             '/submit/',
//             {
//                 method: 'POST',
//                 headers: {'Content-Type': 'application/json',},
//                 body: JSON.stringify(payload)
//             }
//         );
//         const result = await response.json()
//         console.log('Success: ', result);
//     }
//     catch (error) {
//         console.error('Error: ', error)
//     }
// }


// function getFormData(id) {
//     const formElement = document.getElementById(id);
//     const formData = new FormData(formElement);
//     const formDataJson = {};
//     // convert FormData object to traditional dictionary suitable for JSON
//     formData.forEach(
//         (value, key) => {formDataJson[key] = value;}
//     );
//     return formDataJson;
// }