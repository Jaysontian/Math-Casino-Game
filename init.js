const palatte = [
    {
        name:"red",
        hex: "rgb(255, 83, 83)"
    },
    {
        name:"blue",
        hex: "rgb(83, 114, 255)"
    },
    {
        name:"yellow",
        hex: "rgb(255, 223, 83)"
    },
    {
        name:"green",
        hex: "rgb(93, 218, 114)"
    },
    {
        name:"purple",
        hex: "rgb(213, 107, 255)"
    },
    {
        name:"orange",
        hex: "rgb(255, 154, 107)"
    },
    {
        name:"brown",
        hex: "rgb(160, 105, 60)"
    }
]

var results = [];
var correct;
var correct2;
var coins = 30;

window.onload = function() {
    $('#coins').text(coins);
    $('#btn1').attr('disabled',true);
    $('#btn2').attr('disabled',true);
    $('#btn3').attr('disabled',true);
}

function start(){
    coins -= 1;
    $('#coins').text(coins);
    $('#startbtn').attr('disabled',true);
    $('#btn1').attr('disabled',false);

    $('#primary').removeClass('active');
    $('#secondary').removeClass('active');

    var random = Math.floor(Math.random()*3);
    correct = random;
    $('#primary').css('background-color', palatte[random].hex);
    random = Math.floor(Math.random()*4) +3;
    correct2 = random;
    $('#secondary').css('background-color', palatte[random].hex);
    $('#1').addClass('active');
    $('#2').addClass('active');
    $('#3').addClass('active');
    $('#4').css('background-color', 'white');
}

function spin(num){
    $('#'+num).removeClass('active');
    var random = Math.floor(Math.random()*3);
    $('#'+num).css('background-color', palatte[random].hex);
    results.push(palatte[random].name);
    if (num == 1) {
        $('#btn1').attr('disabled',true);
        $('#btn2').attr('disabled',false);
    }
    if (num == 2) {
        $('#btn2').attr('disabled',true);
        $('#btn3').attr('disabled',false);
    }
    if (num == 3) {
        $('#btn3').attr('disabled',true);
        check();
    }
}

function check(){
    var result = output(results);
    $('#4').removeClass('active');
    $('#4').css('background-color', palatte[result].hex);
    if (result == correct){
        $('#state').text('You matched the primary color and won $6.');
        coins += 6;   $('#coins').text(coins);
    } 
    if (result == correct2){
        $('#state').text('You matched the secondary color and won $2.')
        coins += 2;   $('#coins').text(coins);
    }
    
    if (result != correct && result != correct2) {
        $('#state').text('You lost brotha')
    };
    clear();
}

function clear() {
    results = [];
    correct = '';
    correct2 = '';
    $('#startbtn').attr('disabled',false);
}

function output(array){
    var r = Array.from(new Set(array));
    if (r.includes('red') && !r.includes('blue') && !r.includes('yellow')){
        return 0
    }
    if (r.includes('yellow') && !r.includes('red') && !r.includes('blue')){
        return 2
    }
    if (r.includes('blue') && !r.includes('red') && !r.includes('yellow')){
        return 1
    }
    if (r.includes('blue') && r.includes('red') && !r.includes('yellow')){
        return 4
    }
    if (r.includes('blue') && r.includes('yellow') && !r.includes('red')){
        return 3
    }
    if (r.includes('yellow') && r.includes('red') && !r.includes('blue')){
        return 5
    }
    if (r.includes('yellow') && r.includes('red') && r.includes('blue')){
        return 6
    }
}