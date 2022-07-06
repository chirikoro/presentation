'use strict'
// 1行目に記載している 'use strict' は削除しないでください
const systemButton = document.getElementById('systemButton');
let selectsystem = "";


let quizLength = 0;
let quizIndex = 0;
let score = 0;
let clickCnt = 0;
const $selectButton = document.getElementsByClassName('select');

systemButton.addEventListener('click', ()=>{
    const selectBox = document.getElementById('selector');
    selectsystem = selectBox.value;
    quizLength = quiz[selectsystem].length;
    document.getElementById('quiz-area').style.display = 'block';
    document.getElementById('select-area').style.display = 'none';
    setupQuiz();
});

//クイズの問題文、選択肢を定義
const setupQuiz = () => {
    const $quizPanel = document.getElementById("quiz")
    $quizPanel.textContent = quiz[selectsystem][quizIndex].question;
    for (let i = 0; i < $selectButton.length; i++) {
        $selectButton[i].textContent = quiz[selectsystem][quizIndex].answers[i];
    }
    clickCnt = 0;
}


//選択肢をクリックした後の動作
const clickHandler = (e) => {
    // 正解、不正解を表示するタグと画像を出現させる
    const correct = document.getElementById('correct-area');
    correct.style.display = 'block';
    const pictureId = document.getElementById('picture');
    pictureId.style.display = 'block';
    // 正解不正解の文言、画像を変更する
    const h1 = document.getElementById('correct');
    const img = document.getElementsByTagName('img')[0];
    clickCnt++
    if (quiz[selectsystem][quizIndex].correct === e.target.textContent) {
        img.src = 'img/22868269_s.jpg'
        h1.textContent = '正解';
        h1.style.color = 'blue'
        score++; //得点加算
    } else {
        img.src = 'img/3693522_s.jpg'
        h1.textContent = '不正解';
        h1.style.color = 'red'
    }
    // 次へのボタンを出力させる
    const nextButton = document.getElementById('next-button');
    nextButton.style.display = 'inline-block';
    
    // 次の問題があるか判別
    quizIndex++;

    if(quizIndex < quizLength) {
        // 次へボタンをクリックしたら次の問題を表示して正解不正解の表示、画像を消す
        nextButton.addEventListener('click', ()=>{
            setupQuiz();
            correct.style.display = 'none';
            pictureId.style.display = 'none';
            nextButton.style.display = 'none';
        });
    } else {
        // 結果発表ボタンを表示
        nextButton.textContent = '結果発表';
        // 結果発表ボタンをクリックしたら結果発表を表示し、最初に戻るボタンを表示する
        nextButton.addEventListener('click', ()=>{
            nextButton.textContent = '最初の画面へ戻る';
            document.getElementById('quiz-area').style.display = 'none';
            if(score === 3){
                img.src = 'img/ME_biz20160902112315_TP_V4.jpg'
                h1.textContent = "よく出来ました";
            } else if(score < 3 && score > 0) {
                img.src = 'img/SAYA072155409_TP_V4.jpg'
                h1.textContent = "残念";
            } else {
                img.src = 'img/TRTM1831_TP_V4.jpg'
                h1.textContent = "ちゃんとやれ";
            }
            // 最初に戻るをクリックしたらリロードする
            nextButton.addEventListener('click', ()=>{
                document.location.reload()
            });
        });
    }
    
}

//ボタンをクリックしたら正誤判定
for(let i = 0; i < $selectButton.length; i++){
    $selectButton[i].addEventListener('click', (e) => {
        if(clickCnt === 0) {
        clickHandler(e);
        }
    });
}

// https://github.com/chirikoro/presentation.git
// https://chirikoro.github.io/presentation/
