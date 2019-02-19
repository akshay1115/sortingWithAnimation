
// Adding event listeners and checking for input data constraints

    document.getElementById("sort").addEventListener("click", function () {
        var data = $("#data").val();
        var sortType = $("#sortType").val();
        var array = [];
        array = data.split(",");

        if (data == '' || data == undefined) {
            alert("Please input some data !!");
            return;
        }

        if (array.length > 500) {
            alert("Max num of values= 500, please delete some values");
            return;
        }

        //Call the sorting function
        if (sortType == "SelectionSort") {
            selectsort();
        }

        if (sortType == "BubbleSort") {
            bubblesort();
        }
        move();
    });

function bubblesort() {
    var num_data = $("#data").val();
    var array = [];
    array = num_data.split(",");
    var arrayBars = [];

    // Sending post request to sort/bubblesort through ajax
    $.ajax({
        type: "POST",
        async: false,
        url: "../Sort/Bubblesort",
        dataType: "json",
        data: {
            "input_string": num_data
        },
        contentType: 'application/x-www-form-urlencoded ',
        traditional: true,
        success: function (num_data) {

            // Saving the state of iteration in arrayBars
            for (var i = 0; i < num_data.length; i++) {
                arrayBars.push(num_data[i]);
            }
            bars(arrayBars);
        },
        error: function () {
            alert("error");
        }
    });
}


function selectsort() {
    var num_data = $("#data").val();
    var array = [];
    var arrayBars = [];
    array = num_data.split(",");

    // Sending post request to sort/bubblesort through ajax
    $.ajax({
        type: "POST",
        async: false,
        url: "../Sort/Selectsort",  
        dataType: "json",
        data: {
            "input_string": num_data
        },
        contentType: 'application/x-www-form-urlencoded ',
        traditional: true,
        success: function (num_data) {

            // Saving the state of iteration in arrayBars
            for (var i = 0; i < num_data.length; i++) {
                arrayBars.push(num_data[i]);
            }

            bars(arrayBars);
        },
        error: function () {
            alert("error");
        }
    });
}


// Status bar on bottom of sort button
function move() {
    var elem = document.getElementById("myBar");
    var width = 0;
    var id = setInterval(frame, 50);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
            document.getElementById("myP").className = "w3-text-light-grey w3-animate-opacity";
            document.getElementById("myP").innerHTML = "Successfully sorted the data!";
        } else {
            width++;
            elem.style.width = width + '%';
            var num = width * 1 / 10;
            num = num.toFixed(0)
            document.getElementById("demo").innerHTML = num;
        }
    }
}


// Function to create rectangle on canvas with appropriate dimensions
function create(arr) {
    if (arr == null) {
        return;
    }
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext('2d');

    var maxWidth = canvas.height;
    var width = 15;
    var space = 7;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "15px serif";

    for (var i = 0; i < arr.length; i++) {
        ctx.fillStyle = '#636FA4';  // color of bars
        ctx.fillRect(i * (width + space), maxWidth - arr[i], width, arr[i]);
        ctx.fillStyle = '#E8CBC0';  // color of Numbers
        ctx.fillText(arr[i], i * (width + space), maxWidth - arr[i] - 5);   
    }
}

// Function that decides the moving and sorting of bars thorugh timeout function, depicts a snapshop of every step involved in sorting
function bars(arrayBars) {
    var interval = 700;
    arrayBars.forEach((item, index) => {
        setTimeout(() => create(item), index * interval);
    });
}




