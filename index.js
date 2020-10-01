'use strict'

{
  class Panel {
    constructor(){

      const section = document.createElement('section');//セクションタグを作る
      section.classList.add('panel'); //セクションにpanelというclassをつける

      this.img = document.createElement('img'); //imgタグ生成
      this.img.src = this.getRandomImage(); //imgを設定

      this.timeoutId = undefined; //最初は値が定まっていないのでundefined

      this.stop = document.createElement('div'); //divタグを作る
      this.stop.textContent = 'stop'; //中身のテキストをstopに設定
      this.stop.classList.add('stop','inactive'); //stop,inactiveというclassをつける
      this.stop.addEventListener('click',() => {//クリックイベント
        if(this.stop.classList.contains('inactive')){
          return; //insctiveクラスがついていたらここで処理を止める
        }
        this.stop.classList.add('inactive'); //inactiveクラスをつける
        clearTimeout(this.timeoutId); //setTimeoutを止める

        panelsLeft--; //stopボタンを押すたびにー1する

        if(panelsLeft === 0){ //パネルが0になったら
          spin.classList.remove('inactive'); //inactiveクラスを外す
          panelsLeft = 3; //初期値の3に戻す
          checkResult();//関数宣言
        }
      });

      section.appendChild(this.img); //img要素を追加
      section.appendChild(this.stop); //stop要素を追加

      const main = document.querySelector('main'); //main要素を取得
      main.appendChild(section);  //mainにsectionを追加
    }

    getRandomImage(){
      const images = [ //選ぶ画像をはいれつで宣言
        'img/seven.png',
        'img/bell.png',
        'img/cherry.png'
      ];
      return images[Math.floor(Math.random() * images.length)];
      //imgの中からランダムで画像をリターン（返す）処理
    }

    spin(){ //spinメソッドを定義する
      this.img.src = this.getRandomImage(); //ランダムimgの設定
      this.timeoutId = setTimeout(() => {
        this.spin();
      },50);
    }

    isUnmatched(p1,p2){ //p1p2で他のパネルを受け取る
    
      return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
      //このクラスのインスタンスの img の src プロパティが、ほかの img の src プロパティと異なっている場合に true を返してあげて、そうでなかったら false を返す
    }

    unmatch(){
      this.img.classList.add('unmatched');//unmatched classをつける
    }

    activate(){
      this.img.classList.remove('unmatched'); //imgからunmatchedクラスを外す
      this.stop.classList.remove('inactive'); //stopボタンにクラスがついていたら外す
    }
  }

  function checkResult(){//他のパネルと一致しているかのif文
    if(panels[0].isUnmatched(panels[1],panels[2])){
      panels[0].unmatch();
    }
    if(panels[1].isUnmatched(panels[0],panels[2])){
      panels[1].unmatch();
    }
    if(panels[2].isUnmatched(panels[0],panels[1])){
      panels[2].unmatch();
    }
  }

  const panels = [ //配列を宣言し3つのインスタンスを生成
    new Panel(),
    new Panel(),
    new Panel(),
  ];

  let panelsLeft = 3; //パネルの初期値は3枚

  const spin = document.getElementById('spin'); //spinID取得
  spin.addEventListener('click',() =>{ //クリックイベント
    if(spin.classList.contains('inactive')){
      return; //insctiveクラスがついていたらここで処理を止める
    }
    spin.classList.add('inactive'); //spinを押すとinactiveクラスをつける
    panels.forEach(panel => { // 一つ一つの要素をpanelで受け取って処理
      panel.activate(); //メソッド呼ぶ
      panel.spin(); //スピンメソッドを呼び出す
    });
  });















}