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

const betrange = [
    {
        primary: 6,
        secondary: 2,
    },
    {
        primary: 12,
        secondary: 4,
    },
    {
        primary: 18,
        secondary: 6,
    },{
        primary: 30,
        secondary: 10,
    },{
        primary: 60,
        secondary: 20,
    }
]

const bets = [1,2,3,5,10]

var results = [];
var correct;
var correct2;
var coins = 30;
var bet = 1;
var betindex = 0;
var primary = 6;
var secondary = 2;

window.onload = function() {
    $('#coins').text(coins);
    $('#1').attr('disabled',true);
    $('#2').attr('disabled',true);
    $('#3').attr('disabled',true);
}

function start(){
    if (coins >= bet){
        coins -= bet;
        $('#coins').text(coins);
        $('#playbtn').attr('disabled',true);
        $('#1').attr('disabled',false);
        $('#plus').attr('disabled',true);
        $('#minus').attr('disabled',true);

        $('#primary').removeClass().addClass('wantedcolor');
        $('#secondary').removeClass().addClass('wantedcolor');

        var random = Math.floor(Math.random()*3);
        correct = random;
        $('#primary').addClass(palatte[random].name);
        random = Math.floor(Math.random()*4) +3;
        correct2 = random;
        $('#secondary').addClass(palatte[random].name);
        $('#1').removeClass().addClass('color').addClass('active');
        $('#2').removeClass().addClass('color').addClass('active');
        $('#3').removeClass().addClass('color').addClass('active');
        $('#4').removeClass().addClass('color');
        console.log('cleared')
    } else {
        alert('you are bankrupt. you dont have enough mula')
    }
    
}

function spin(num){
    $('#'+num).removeClass().addClass('color');
    var random = Math.floor(Math.random()*3);
    $('#'+num).addClass(palatte[random].name);
    results.push(palatte[random].name);
    if (num == 1) {
        $('#1').attr('disabled',true);
        $('#2').attr('disabled',false);
    }
    if (num == 2) {
        $('#2').attr('disabled',true);
        $('#3').attr('disabled',false);
    }
    if (num == 3) {
        $('#3').attr('disabled',true);
        check();
    }
}

function changebet(val){
    if (val == 'minus' && betindex > 0){
        betindex -= 1;
        bet = bets[betindex];
        $('#betval').text(bet);
        primary = betrange[betindex].primary;
        secondary = betrange[betindex].secondary;
        $('#primary').text('$'+primary);
        $('#secondary').text('$'+secondary);
    }
    if (val == 'plus' && betindex < 4) {
        betindex += 1;
        bet = bets[betindex];
        $('#betval').text(bet);
        primary = betrange[betindex].primary;
        secondary = betrange[betindex].secondary;
        $('#primary').text('$'+ primary);
        $('#secondary').text('$'+ secondary);
    }
    console.log(betindex);
}

function check(){
    var result = output(results);
    $('#4').addClass(palatte[result].name);
    if (result == correct){
        $('#state').text('You matched the primary color and won $6.');
        coins += primary;   $('#coins').text(coins);

        winsnack(true, '+'+primary.toString());
    } 
    if (result == correct2){
        $('#state').text('You matched the secondary color and won $2.')
        coins += secondary;   $('#coins').text(coins);
        winsnack(true, '+'+secondary.toString());
    }
    
    if (result != correct && result != correct2) {
        $('#state').text('You lost brotha');
        winsnack(false, "-"+bet.toString());
    };
    clear();
}

function clear() {
    results = [];
    correct = '';
    correct2 = '';
    $('#playbtn').attr('disabled',false);
    $('#plus').attr('disabled',false);
    $('#minus').attr('disabled',false);
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

function winsnack(state, val){
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    $('#snackbar').text(val);

    if (state){
        $('#snackbar').css('box-shadow','0 0 100px 10px rgb(59, 255, 76),inset 0 0 20px 3px rgb(59, 255, 76)')
    } else {
        $('#snackbar').css('box-shadow','0 0 100px 10px rgb(255, 0, 0),inset 0 0 20px 3px rgb(255, 0, 0)')
    }

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 900);
}