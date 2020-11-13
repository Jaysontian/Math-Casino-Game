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
    $('#1').css('background-color','white');
    $('#2').css('background-color','white');
    $('#3').css('background-color','white');
    $('#4').css('background-color','white');

    var random = Math.floor(Math.random()*7);
    correct = random;
    $('#0').css('background-color', palatte[random].hex);
}

function spin(num){
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
    $('#4').css('background-color', palatte[result].hex);
    if (result == correct){
        alert('you got it!');
    } else {
        alert('you lost')
    };
    clear();
}

function clear() {
    results = [];
    correct = '';
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