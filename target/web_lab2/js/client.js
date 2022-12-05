let form= document.querySelector('.validate_form');
let validatedButton = document.querySelector('.validate_button');
let xOptions = document.querySelectorAll(".x");
let yCoordinate = document.querySelector(".y");
let rOptions = document.querySelectorAll(".r");
let table = [];

function isNumber(s){
    let n = parseFloat(s.replace(',','.'));
    return !isNaN(n) && isFinite(n);
}
function formatParams(params) {
    return "?" + Object
        .keys(params)
        .map(function (key) {
            return key + "=" + encodeURIComponent(params[key])
        })
        .join("&")
}


function generateTip(text, color) {
    let tip = document.createElement('div');
    tip.className = 'tip';
    tip.style.color = color;
    tip.innerHTML = text;
    return tip;
}



function removeValidation() {
    let tips = form.querySelectorAll('.tip')
    for (let i = 0; i < tips.length; i++) {
        tips[i].remove()
    }
}



function checkSelection(radios) {
    for(let i=0; i<radios.length; i++){
        if(radios[i].checked) return true;
    }
    let error = generateTip('field is blank','red');
    radios[0].parentElement.insertBefore(error, radios[0]);
    return false;
}


function validateField(coordinate,min,max){
    if(coordinate.value){
        coordinate.value = coordinate.value.replace(',','.');
        if(coordinate.value<=min || coordinate.value>=max || !isNumber(coordinate.value)){
            let error = generateTip('Wrong number format','red')
            coordinate.parentElement.insertBefore(error, coordinate)
            return false;
        }
        else{
            let correct = generateTip('Correct data','green');
            coordinate.parentElement.insertBefore(correct, coordinate)
            return true;
        }
    }
    let error = generateTip('field is blank','red');
    coordinate.parentElement.insertBefore(error, coordinate);
    return false;
}



function validateAll(){
    return checkSelection(xOptions)&&validateField(yCoordinate,-5,5) && checkSelection(rOptions);
}

function  drawDataOnGraph(){
    drawGraph();
    if(table.length>0){
        for(let i=0;i<table.length;i++){
            let point = table[i];
            drawPointOnGraph(point.x, point.y, point.hit);
        }
    }
}

$('.x:checkbox').click(function () {
    $('.x:checkbox').not(this).prop('checked', false);
});
$('.r:checkbox').click(function () {
    if(this.checked) rValue = this.value;
    drawDataOnGraph();
    $('.r:checkbox').not(this).prop('checked', false);
});

$(document).ready(function(){

    table = [];
    $("#result_table>tbody tr").each(function (i, el) {
        let self = $(this);
        let x = self.find(".x").text().trim();
        let y = self.find(".y").text().trim();
        let r = self.find(".r").text().trim();
        let hit = self.find(".hit").text().trim() == "hit"?true:false;
        let result = `${x}, ${y}, ${r}, ${hit}`;
        console.log(result);
        let point = {x:x, y:y, r:r, hit:hit};
        table[i]=point;
    });
    if(table.length>0) rValue = table[table.length-1].r;
    drawDataOnGraph(rValue);

});


$("#inpform").on("submit", function(event){
    event.preventDefault();

    console.log("Got data for check!" );
    console.log('y: ', yCoordinate.value);
    removeValidation();

    if(!validateAll()){
        console.log("post canceled")
        return
    }
    console.log("data sending...")
    console.log($(this).serialize());
    $.ajax({
        url: 'controller',     method: "GET",
        data: $(this).serialize() + "&timezone=" + new Date().getTimezoneOffset(),
        dataType: "html",

        success: function(data){
            console.log(data);
            $(".validate_button").attr("disabled", false);

            window.location.replace("result_page.jsp");
            //$("#result_table>tbody").html(data);
        },
        error: function(error){
            console.log(error);
            $(".validate_button").attr("disabled", false);
        },
    });
});


$(".reset_button").on("click",function(e){
    e.preventDefault();
    const params = {'clear': true}
    window.location.replace("controller" + formatParams(params));

})