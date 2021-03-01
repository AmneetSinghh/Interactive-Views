// // for the backspacing thing. problem.

let word_or_not = false;
let last_char = " ";
let cur_char = " ";
let last_correct = 0;
let current_now = 0;
let current_click = 0;
let into_lenght = 0;
let your_wish = 100;
let cccc = false;
let space_back = 0;
let temp_string = "";

const func = e => {
    if (e.keyCode == 8) {
        console.log("Working!  ->", last_correct, current_now);
        space_back += 0.34;

        if (last_correct == 0) {
            console.log("spacr not")

        } else if (last_correct >= current_now - 1) {
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
    let time_1 = 5;
    const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';
    const quoteDisplayElement = document.getElementById('quoteDisplay');
    const quoteInputElement = document.getElementById('quoteInput')
    const fifty = document.getElementById('fifty');
    const ready = document.getElementById('ready');
    const restart = document.getElementById('restart');
    const under_ready = document.getElementById('under_ready');
    const timer = document.getElementById('Timer');
    const timer1 = document.getElementById('timer1');
    const Accuracy = document.getElementById('Accuracy');
    const WPM = document.getElementById('WPM');
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
        if (timer.innerText == "0:00") {
            timer.innerText = "0.00";
            under_ready.innerText = "Race is Completed";
            window.location.reload(true);
            alert("You loss the game!");
        }

    }


    function startTimer10seconds() {
        setInterval(update_count1, 1000);
    }

    function update_count1() {
        let minutes = Math.floor(time_1 / 60);
        let seconds = time_1 % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        timer1.innerHTML = `${minutes}:${seconds}`;
        console.log(time_1, seconds, timer1.innerText);

        if (seconds == "00") {
            if (cccc == true) {
                under_ready.innerText = "";
                timer1.innerText = "";
            } else {
                under_ready.innerText = "Type Something to start race!";
                timer1.innerText = "";
            }

        } else {

            --time_1;

            if (time_1 <= 3) {
                under_ready.innerText = "Just Starting ";
                under_ready.style.color = "#CCCC00";
                timer1.style.color = "#CCCC00";
            }

            if (time_1 <= 1) {
                under_ready.innerText = "Lets Race ";
                under_ready.style.color = "red";
                timer1.style.color = "red";
            }


        }
    }

    async function renderNewQuote() {

        for (let i = 0; i < 2; i++) {
            const quote = await getRandomQuote();
            quote.split('').forEach(character => {
                const characterSpan = document.createElement('span')
                characterSpan.innerText = character
                temp_string += character;
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
        pre = time;
        WPM.innerText = 0;
        WPM.style.color = "green";
        Accuracy.innerText = 0;
        Accuracy.style.color = "green";





    }

    const delay = ms => new Promise(res => setTimeout(res, ms));


    function buttons_disabled() {
        fifty.disabled = true;
        fifty.style.backgroundColor = "#9900CC";


    }


    //****************************************    choose words baby ***************************** */
    const yourFunction = async() => {
        timer1.style.color = "green";
        under_ready.innerText = "Starting the race! ";
        timer1.innerText = startTimer10seconds();
        await delay(5000);
        quoteInputElement.disabled = false;

    };


    restart.addEventListener('click', (event) => {
        window.location.reload(true);
    });
    fifty.addEventListener('click', (event) => {
        buttons_disabled();
        yourFunction();
    });

















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

    let correct_characters = 0;
    let correct_words = 0;
    let temp_len = 0;




    quoteInputElement.addEventListener('input', (event) => {
        // for the timer;
        if (indd == 0) {
            timer.innerText = startTimer();
            timer.style.color = "green";
            timer1.innerText = "";
            cccc = true;
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
            lets_now = Math.floor(1320 / len_of_text);
            console.log("this is it-> ", lets_now);
            if (arrayValue[now - 1] == arrayQuote[now - 1].innerText) {
                if (into_lenght == len_of_text - 5) {
                    bird.x += (1400 - bird.x);
                } else {
                    bird.x += lets_now;
                }
                console.log(bird.xinto_lenght, len_of_text);
            }
        }


        current_now = arrayValue.length;

        /// loop to array
        console.log("Accuracy-> ", arrayValue[arrayValue.length - 1])
        arrayQuote.forEach((characterSpan, index) => {
                const character = arrayValue[index]

                if (index == arrayValue.length - 1 && characterSpan.innerText != character) {
                    timer.innerText = "0.00";
                    under_ready.innerText = "------------------------------Game Over-------------------------";
                    window.location.reload(true);
                    alert("You loss the game!");
                }


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


        console.log("last-correct-> ", last_correct, len_of_text);
        if (arrayValue[arrayValue.length - 1] == " ") last_char = -1;
        else last_char = arrayValue[arrayValue.length - 1];
        if (first == second) ++correct_words;





        if (last_correct == len_of_text - 2) {
            timer.innerText = "0.00";
            under_ready.innerText = "Race is Completed";
            window.location.reload(true);

            alert("You won the game!");
            ++i;
            renderNewQuote();
        }
    });






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
        this.load.image("chidi", "Assets/chidi.png");
        this.load.image("chidi2", "Assets/chidi2.png");

    }

    //  var speed = 4;
    // the closer it to the player,  move every thing in the backgrond in the differnet speed,
    function create() {

        const width = this.scale.width;
        const height = this.scale.height;
        console.log(width, height);
        sky = this.add.image(width * 0.5, height * 0.5, 'sky').setScrollFactor(0);
        createAligned(this, 100, 'mountain', 0.25)
        bird = this.add.image(100, 400, 'bird').setScrollFactor(0);

        let x = 0;
        for (let i = 0; i <= 100; ++i) {
            track = this.add.image(x, 465, 'dot').setOrigin(0, 1).setScrollFactor(0);
            x += track.width;
        }
        light = this.add.image(100, 700, 'light').setScrollFactor(0.2);


        createAligned(this, 100, 'plateau', 0.5)
        createAligned(this, 100, 'ground', 1)
        createAligned(this, 100, 'plants', 1.25)
        this.cameras.main.setBounds(0, 0, width * 100, height);




        /*****************************ADDING TEXT   ***********************************************/


        // text = this.add.text(1120, 30, "WEM", {
        //     font: "30px Impact",
        //     fill: "#black",
        //     align: "center"

        // }).setScrollFactor(0);

        one = this.add.text(420, 95, "Type GO", {
            font: "100px Luminari, fantasy",
            fill: "#DA70D6",
            align: "center"
        }).setScrollFactor(0);

        two = this.add.text(360, 200, "Typing Multi-player", {
            font: "50px Luminari, fantasy",
            fill: "#DA70D6",
            align: "center"
        }).setScrollFactor(0);

        three = this.add.text(280, 200, "The", {
            font: "50px Luminari, fantasy",
            fill: "#000000",
            align: "center"
        }).setScrollFactor(0);

        four = this.add.text(764, 200, "Game", {
            font: "50px Luminari, fantasy",
            fill: "#000000",
            align: "center"
        }).setScrollFactor(0);

        five = this.add.text(400, 850, "Time", {
            font: "50px Luminari, fantasy",
            fill: "#000000",
            align: "center"
        }).setScrollFactor(0);
        six = this.add.text(510, 850, "to kill the", {
            font: "50px Luminari, fantasy",
            fill: "#DA70D6",
            align: "center"
        }).setScrollFactor(0);

        seven = this.add.text(710, 850, "keypad", {
            font: "50px Luminari, fantasy",
            fill: "#000000",
            align: "center"
        }).setScrollFactor(0);
        ffi = this.add.text(20, 10, "Death", {
            font: "50px Luminari, fantasy",
            fill: "#DA70D6",
            align: "center"
        }).setScrollFactor(0);
        ffii = this.add.text(150, 10, "Race", {
            font: "50px Luminari, fantasy",
            fill: "#000000",
            align: "center"
        }).setScrollFactor(0);
        chidi = this.add.image(596, 944, 'chidi2').setScrollFactor(0);

        // fuck = this.add.text(150, 430, "fuck", {
        //     font: "50px Luminari, fantasy",
        //     fill: "#000000",
        //     align: "center"
        // }).setScrollFactor(0);

        chidi = this.add.image(596, 944, 'chidi2').setScrollFactor(0);




    }



    function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }




    function update() {
        const cam = this.cameras.main;
        if (timer.innerText >= total_words - 5) {
            timer.style.color = "red";
        }



        WPM.innerText = correct_words;

        if (speed >= 30) speed = 30;
        if (indd >= 1) {
            cam.scrollX += speed;
            speed += 0.2;
            // console.log("Orignla speed-> ", correct_characters / len_of_text);
            let cal = ((correct_characters / len_of_text) * 100);
            let cal1 = cal.toFixed(2);
            Accuracy.innerText = 100 - space_back;

        }

    }


}