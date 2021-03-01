// // for the backspacing thing. problem.
// fir the players;
let cm = 60;





let word_or_not = false;
let last_char = " ";
let cur_char = " ";
let last_correct = 0;
let current_now = 0;
let into_lenght = 0;
var socket = io();
const func = e => {
    if (e.keyCode == 8) {
        console.log("Working!  ->", last_correct, current_now);
        if (last_correct >= current_now - 1) {
            console.log("noBackspaceallowed\n");
            e.preventDefault();
        } else {
            console.log("spacr not")

        }
    } else {
        console.log(last_char, "-> Key");
    }
}



window.onload = function() {


    let time = 0;
    //    let  correct_characters=0;
    let total_words = 0;
    let len_of_text = 0;
    let i = 0;
    let pre = 0;
    let indd = 0;
    let speed = 1;
    let moves = 0;
    let now = 0;
    let moves_width = 0;
    let start_min = 1;
    let time_ = start_min * 60;
    const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';
    const quoteDisplayElement = document.getElementById('quoteDisplay');
    const quoteInputElement = document.getElementById('quoteInput');
    const timer = document.getElementById('Timer');
    const Accuracy = document.getElementById('Accuracy');
    const WPM = document.getElementById('WPM');
    const CPM = document.getElementById('CPM');
    const camp = document.getElementById('camp');

    function getRandomQuote() {
        return fetch(RANDOM_QUOTE_API_URL)
            .then(response => response.json())
            .then(data => data.content)
    }

    function startTimer() {
        setInterval(update_count, 1000);
    }

    function update_count() {
        let minutes = Math.floor(time_ / 60);
        let seconds = time_ % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        timer.innerHTML = `${minutes}:${seconds}`
            --time_;
    }


    async function renderNewQuote() {
        quoteDisplayElement.innerHTML = ''
        for (let i = 0; i < 2; i++) {
            const quote = await getRandomQuote();
            quote.split('').forEach(character => {
                const characterSpan = document.createElement('span')
                characterSpan.innerText = character
                quoteDisplayElement.appendChild(characterSpan)
            })
            const characterSpan = document.createElement('span')
            characterSpan.innerText = " "
            quoteDisplayElement.appendChild(characterSpan)
            quoteInputElement.value = null;

        }


        let quote1 = quoteDisplayElement.querySelectorAll('span');
        quote1.forEach((characterSpan, index) => {
            if (characterSpan.innerText == " ") ++total_words;

        });
        ++total_words;
        time = quote1.length - pre;
        let moves_width = 1200 / time;
        len_of_text = quote1.length;
        time = total_words;
        console.log("->------------------------------------------------------------------------------------------------- ", time, len_of_text); // time will be 14 seconds;
        //timer.innerText=startTimer();
        //timer.style.color="green";
        pre = time;
        WPM.innerText = 0;
        WPM.style.color = "green";
        CPM.innerText = 0;
        CPM.style.color = "green";
        Accuracy.innerText = 0;
        Accuracy.style.color = "green";

        //     






    }




    const createAligned = (scene, count, texture, scrollFactor) => {
        let x = 0;
        for (let i = 0; i < count; ++i) {
            const m = scene.add.image(x, scene.scale.height, texture).
            setOrigin(0, 1).
            setScrollFactor(scrollFactor);
            x += m.width;
        }
    }

    /* ------------------------------------------------------------------------------------*/



    console.log("Successful task");
    var config = {
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.FIT,
            width: 1200,
            height: 1000,
        },
        backgroundColor: 0xff00cc,
        parent: 'mynetwork',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 1000,
                },
                debug: false,
            }
        },

        scene: {
            preload: preload,
            create: create,
            update: update,
        }

    };

    let game = new Phaser.Game(config);
    console.log(game);
    // the jumping and the speed of the player.
    let player_config = {
        player_speed: 150,
        player_jump: -750,
    }





    let correct_characters = 0;
    let correct_words = 0;
    let temp_len = 0;



    quoteInputElement.addEventListener('input', (event) => {
        // for the timer;


        if (indd == 0) {
            timer.innerText = startTimer();
            timer.style.color = "green";
            ++indd;
        }

        const arrayQuote = quoteDisplayElement.querySelectorAll('span');
        correct_characters = 0;
        correct_words = 0;
        temp_len = 0;
        const arrayValue = quoteInputElement.value.split('');
        quoteInputElement.style.textDecoration = 'line-through';
        quoteInputElement.style.textShadow = "5px 5px 10px black";


        len_of_text = arrayQuote.length;
        temp_len = arrayValue.length;
        let correct = true
        let first = "",
            second = "";
        if (arrayValue.length > now) {
            now = arrayValue.length;
            lets_now = Math.floor(1200 / len_of_text);
            console.log("this is it-> ", lets_now);
            if (arrayValue[now - 1] == arrayQuote[now - 1].innerText) {
                if (into_lenght == len_of_text - 5) {
                    bird.x += (1200 - bird.x);
                    you.x += (1200 - you.x);
                    one.x += (1200 - one.x);
                    // not only the player one pencho;
                } else {
                    bird.x += lets_now;
                    you.x += lets_now;
                    one.x += lets_now;
                }
                console.log(bird.x, you.x, one.x, into_lenght, len_of_text);
            } else {
                //    bird.x-=(1200/len_of_text);
                //    you.x-=(1200/len_of_text);
                //    one.x-=(1200/len_of_text);
            }
        }





        current_now = arrayValue.length;

        console.log("---------------------", arrayValue[now - 1], arrayQuote[now - 1].innerText, 1200 / len_of_text, now, arrayValue.length);

        /// loop to array
        arrayQuote.forEach((characterSpan, index) => {
                const character = arrayValue[index]
                if (characterSpan.innerText == " ") {
                    if (first == second && first != "") correct_words++;
                    first = "";
                    second = "";
                }
                if (character == null) {
                    first += character;
                    second += characterSpan.innerText;
                    characterSpan.classList.remove('correct')
                    characterSpan.classList.remove('incorrect')
                    correct = false

                } else if (character === characterSpan.innerText) {
                    characterSpan.classList.add('correct')
                    correct_characters++;
                    first += character;
                    second += characterSpan.innerText;
                    characterSpan.classList.remove('incorrect')
                } else {
                    characterSpan.classList.remove('correct')
                    characterSpan.classList.add('incorrect')
                    first += character;
                    second += characterSpan.innerText;
                    correct = false
                }

            })
            // when correct happens, then no need to backspace fuck update the index of the backspace;
            //last_correct update this function;
        let flag = 0;
        arrayQuote.forEach((characterSpan, index) => {
            let character = arrayValue[index]
            if (character == characterSpan.innerText && flag == 0) {
                if (last_correct <= index) last_correct = index;
            } else flag = 1;

        });




        let baby = true;
        into_lenght = 0;
        let baby1 = true;
        arrayQuote.forEach((characterSpan, index) => {
            let character = arrayValue[index]
            if (index <= current_now - 1) {
                if (character != characterSpan.innerText) baby = false;

            }




            if (character == characterSpan.innerText && baby1 == true) {
                into_lenght++;
                baby1 = false;
            }

        });






        if (baby == false) {
            quoteInputElement.style.background = '#ff6c00';
            //      quoteInputElement.style.opacity = 10;
        } else {
            quoteInputElement.style.background = '#3cb371';
            //         quoteInputElement.style.opacity = 0.4;
        }


        console.log("last-correct-> ", );
        if (arrayValue[arrayValue.length - 1] == " ") last_char = -1;
        else last_char = arrayValue[arrayValue.length - 1];
        if (first == second) ++correct_words;

        if (correct) {
            ++i;
            renderNewQuote();
        }
    });




    let client_positions = {};

    function preload() {

        // loading all the images in the preload function
        console.log("In Preload");
        // JSalert();
        renderNewQuote();
        this.load.image("sky", "Assets/sky.png");
        this.load.image("mountain", "Assets/mountains.png");
        this.load.image("plateau", "Assets/plateau.png");
        this.load.image("ground", "Assets/ground.png");
        this.load.image("plants", "Assets/plant.png");
        this.load.image("bird", "Assets/bird.png");
        this.load.image("bird2", "Assets/bird2.png");
        this.load.image("bird3", "Assets/bird3.png");
        this.load.image("bird4", "Assets/bird4.png");
        this.load.image("bird5", "Assets/bird5.png");
        this.load.image("dot", "Assets/line.png");
        this.load.image("you", "Assets/you.png");
        this.load.image("light", "Assets/light.png");
        this.load.image("one", "Assets/one.png");
        this.load.image("two", "Assets/two.png");
        this.load.image("three", "Assets/three.png");
        this.load.image("four", "Assets/four.png");
        this.load.image("five", "Assets/five.png");
        this.load.image("ship", "Assets/manme.png");

    }

    //  var speed = 4;
    // the closer it to the player,  move every thing in the backgrond in the differnet speed,
    function create() {

        const width = this.scale.width;
        const height = this.scale.height;
        console.log(width, height);
        sky = this.add.image(width * 0.5, height * 0.5, 'sky').setScrollFactor(0);
        createAligned(this, 100, 'mountain', 0.25)
        bird = this.add.image(100, 60, 'bird').setScrollFactor(0);
        one = this.add.image(20, 70, 'one').setScrollFactor(0);

        let x = 0;
        for (let i = 0; i <= 100; ++i) {
            track = this.add.image(x, 120, 'dot').setOrigin(0, 1).setScrollFactor(0);
            x += track.width;
        }
        you = this.add.image(98, 70, 'you').setScrollFactor(0);

        light = this.add.image(100, 700, 'light').setScrollFactor(0.2);


        createAligned(this, 100, 'plateau', 0.5)
        createAligned(this, 100, 'ground', 1)
        createAligned(this, 100, 'plants', 1.25)
        this.cameras.main.setBounds(0, 0, width * 100, height);




        // bird1 = this.add.image(100, 160, 'bird2').setScrollFactor(0);
        // two = this.add.image(20, 170, 'two').setScrollFactor(0);

        // x = 0;
        // for (let i = 0; i <= 100; ++i) {
        //     track = this.add.image(x, 220, 'dot').setOrigin(0, 1).setScrollFactor(0);
        //     x += track.width;
        // }

        // bird2 = this.add.image(100, 260, 'bird3').setScrollFactor(0);
        // three = this.add.image(20, 270, 'three').setScrollFactor(0);

        // x = 0;
        // for (let i = 0; i <= 100; ++i) {
        //     track = this.add.image(x, 320, 'dot').setOrigin(0, 1).setScrollFactor(0);
        //     x += track.width;
        // }

        // bird3 = this.add.image(100, 360, 'bird4').setScrollFactor(0);
        // four = this.add.image(20, 370, 'four').setScrollFactor(0);

        // x = 0;
        // for (let i = 0; i <= 100; ++i) {
        //     track = this.add.image(x, 420, 'dot').setOrigin(0, 1).setScrollFactor(0);
        //     x += track.width;
        // }


        // bird4 = this.add.image(100, 460, 'bird5').setScrollFactor(0);
        // five = this.add.image(20, 470, 'five').setScrollFactor(0);

        // x = 0;
        // for (let i = 0; i <= 100; ++i) {
        //     track = this.add.image(x, 520, 'dot').setOrigin(0, 1).setScrollFactor(0);
        //     x += track.width;
        // }




        // /*****************************ADDING TEXT   ***********************************************/
        // text = this.add.text(1120, 30, "WEM", {
        //     font: "30px Impact",
        //     fill: "#black",
        //     align: "center"

        // }).setScrollFactor(0);
        // /*****************************ADDING TEXT   ***********************************************/
        // text2 = this.add.text(1120, 140, "WEM", {
        //     font: "30px Impact",
        //     fill: "#ff4f47",
        //     align: "center"
        // }).setScrollFactor(0);;

        // /*****************************ADDING TEXT   ***********************************************/
        // text3 = this.add.text(1120, 250, "WEM", {
        //     font: "30px Impact",
        //     fill: "#2bff59",
        //     align: "center"
        // }).setScrollFactor(0);;
        // /*****************************ADDING TEXT   ***********************************************/
        // text4 = this.add.text(1120, 350, "WEM", {
        //     font: "30px Impact",
        //     fill: "#0000ff",
        //     align: "center"
        // }).setScrollFactor(0);;
        // /*****************************ADDING TEXT   ***********************************************/
        // text5 = this.add.text(1120, 450, "WEM", {
        //     font: "30px Impact",
        //     fill: "#cc30ff",
        //     align: "center"
        // }).setScrollFactor(0);;







        /*********************************************************************************************************************/

        // socket.on('test', msg => {
        //     alert(msg);
        // });
        // var btn = document.getElementById('check_button');

        // socket.on('server_to_client', (data) => {
        //     alert(data);
        // });

        // btn.addEventListener('click', () => {
        //     socket.emit('client_to_client', "Hello to all the clients!");
        // });


        socket.emit('new_player', bird); // giving info to the server about the player;

        socket.on('update_players', players => {
            players_found = {};
            for (let id in players) {
                if (client_positions[id] == undefined && id != socket.id) { // not present pencho;
                    if (Object.keys(client_positions).length == 0) { new_bird = this.add.image(bird.x, cm + 100, 'bird2').setScrollFactor(0); }
                    if (Object.keys(client_positions).length == 1) { new_bird = this.add.image(bird.x, cm + 100, 'bird3').setScrollFactor(0); }
                    if (Object.keys(client_positions).length == 2) { new_bird = this.add.image(bird.x, cm + 100, 'bird4').setScrollFactor(0); }
                    if (Object.keys(client_positions).length == 3) { new_bird = this.add.image(bird.x, cm + 100, 'bird5').setScrollFactor(0); }

                    client_positions[id] = new_bird;
                    cm += 100;
                }
                players_found[id] = true;
            }
            // console.log(Object.keys(client_positions).length);
            for (let id in client_positions) {
                if (!players_found[id]) {
                    client_positions[id].destroy();
                    console.log(client_positions);
                    delete client_positions[id]; // delete from the client position dictionary
                }
            }
        });

    }



    function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }




    function update() {


        //  console.log("In update");
        //    console.log("->       _>_> ",len_of_text,total_words,correct_characters,correct_words,temp_len,timer.innerText);
        //

        const cam = this.cameras.main;
        ///decided by the accuracy of typing speed of the player;

        if (timer.innerText >= total_words - 5) {
            timer.style.color = "red";
        }



        if (speed >= 30) speed = 30;
        if (timer.innerText >= total_words) {
            Accuracy.innerText = (correct_characters / len_of_text) * 100;
        }
        WPM.innerText = correct_words;
        CPM.innerText = correct_characters;
        Accuracy.innerText = (correct_characters / len_of_text) * 100;
        let aa, bb, cc, dd;
        aa = randomNumber(0, 0.9);
        bb = randomNumber(0, 1.3);
        cc = randomNumber(0, 1.6);
        dd = randomNumber(0, 1.5);
        // (totallength-numer_of_red_charcters)/(totallength*100)


        if (indd >= 1) {
            // bird1.x += aa;
            // two.x += aa;
            // bird2.x += bb;
            // three.x += bb;
            // bird3.x += cc;
            // four.x += cc;
            // bird4.x += dd;
            // five.x += dd;
            cam.scrollX += speed;
            speed += 0.2;
            //give my player's position 
            // socket.emit('update', bird.x);

        }


        //console.log(bird1.x,bird2.x,bird3.x,bird4.x);

        // text.text = bird.x + "%";
        // text2.text = bird1.x + "%";
        // text3.text = bird2.x + "%";
        // text4.text = bird3.x + "%";
        // text5.text = bird4.x + "%";



    }


}