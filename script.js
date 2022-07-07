'use strict'
// 1行目に記載している 'use strict' は削除しないでください
const systemButton = document.getElementById('systemButton');
let selectsystem = "";

const correct = document.getElementById('correct-area');
const pictureId = document.getElementById('picture');
let quizLength = 0;
let quizIndex = 0;
let score = 0;
let clickCnt = 0;
const selectButton = document.getElementsByClassName('select');
const correctAudio = new Audio('sound/crrect_answer3.mp3');
const blipAudio = new Audio('sound/blip01.mp3');
const excellent = new Audio('sound/jajan.mp3');
const bad = new Audio('sound/gaan.mp3');
const angry = new Audio('sound/audio_23087_sample.m4a');

const h1 = document.getElementById('correct');
const img = document.getElementsByTagName('img')[0];
const nextButton = document.getElementById('next-button');
const quizPanel = document.getElementById("quiz")
const selectBox = document.getElementById('selector');
const presenEnd = document.getElementById('end');
const endbtn = document.getElementById('endbtn');
let soundCnt = 0;

systemButton.addEventListener('click', () => {
    selectsystem = selectBox.value;
    quizLength = quiz[selectsystem].length;
    document.getElementById('quiz-area').style.display = 'block';
    document.getElementById('select-area').style.display = 'none';
    setupQuiz();
});

//クイズの問題文、選択肢を定義
const setupQuiz = () => {
    quizPanel.textContent = quiz[selectsystem][quizIndex].question;
    for (let i = 0; i < selectButton.length; i++) {
        selectButton[i].textContent = quiz[selectsystem][quizIndex].answers[i];
    }
    clickCnt = 0;
}


//選択肢をクリックした後の動作
const clickHandler = (e) => {
    // 正解、不正解を表示するタグと画像を出現させる
    correct.style.display = 'block';
    pictureId.style.display = 'block';
    // 正解不正解の文言、画像を変更する
 
    clickCnt++
    if (quiz[selectsystem][quizIndex].correct === e.target.textContent) {
        img.src = 'img/22868269_s.jpg'
        h1.textContent = '正解';
        h1.style.color = 'blue'
        correctAudio.play();
        score++; //得点加算
    } else {
        img.src = 'img/3693522_s.jpg'
        h1.textContent = '不正解';
        h1.style.color = 'red'
        blipAudio.play();
    }
    // 次へのボタンを出力させる
    nextButton.style.display = 'inline-block';

    // 次の問題があるか判別
    quizIndex++;

    if (quizIndex < quizLength) {
        // 次へボタンをクリックしたら次の問題を表示して正解不正解の表示、画像を消す
        nextButton.addEventListener('click', () => {
            setupQuiz();
            correct.style.display = 'none';
            pictureId.style.display = 'none';
            nextButton.style.display = 'none';
        });
    } else {
        // 結果発表ボタンを表示
        nextButton.textContent = '結果発表';
        // 結果発表ボタンをクリックしたら結果発表を表示し、最初に戻るボタンを表示する
        nextButton.addEventListener('click', () => {
            nextButton.textContent = '最初の画面へ戻る';
            document.getElementById('quiz-area').style.display = 'none';
            if (score === 3) {
                img.src = 'img/ME_biz20160902112315_TP_V4.jpg'
                h1.textContent = "よく出来ました";
                if(soundCnt === 0){excellent.play()}
                soundCnt++
            } else if (score < 3 && score > 0) {
                img.src = 'img/SAYA072155409_TP_V4.jpg'
                h1.textContent = "残念";
                if(soundCnt === 0){bad.play()};
                soundCnt++
            } else {
                img.src = 'img/TRTM1831_TP_V4.jpg'
                h1.textContent = "ちゃんとやれ";
                if(soundCnt === 0){angry.play()}
                soundCnt++
            }
            // 最初に戻るをクリックしたらリロードする
            nextButton.addEventListener('click', () => {
                // document.location.reload()
                const presen = document.getElementById('presen');
                presen.style.display = 'block';
                correct.style.display = 'none';
                pictureId.style.display = 'none';
                nextButton.style.display = 'none';
                presenEnd.style.display = 'inline-block';
                endbtn.addEventListener('click',()=>{document.location.reload()})
            });
        });
    }

}

//ボタンをクリックしたら正誤判定
for (let i = 0; i < selectButton.length; i++) {
    selectButton[i].addEventListener('click', (e) => {
        if (clickCnt === 0) {
            clickHandler(e);
        }
    });
}
