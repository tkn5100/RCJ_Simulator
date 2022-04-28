(()=>{
    //メインプログラムのためのjsファイル

    const $doc = document;
    const $guide = $doc.getElementById('guidetext');
    const $img = $doc.getElementsByClassName('image');
    const $course_nrl = $doc.getElementsByClassName('menu-img-n');
    const $course_wrl = $doc.getElementsByClassName('menu-img-w');
    const imgLen = $img.length;
    const courseNrlLen = $course_nrl.length;
    const courseWrlLen = $course_wrl.length;
    const $tools = $doc.getElementsByClassName('tools');
    const $main = $doc.getElementsByClassName('main');
    const $menu = $doc.getElementsByClassName('menu');
    const $toolbar = $doc.getElementsByClassName('toolbar');
    const $table = $doc.getElementsByTagName('table');
    const $copyright = $doc.getElementsByClassName('copyright')[0];
    // const $index = document.getElementsByClassName('index')
    const $coursedata = $doc.getElementsByClassName('coursedata');
    let nowturn = null;
    let src = null;
    let secondOrFirst = null;
    let checkOrUncheck = null;
    let newCheckMarker = null;
    let obOrUnob = null;
    let newObstacle = null;
    let bumpOrUnbump = null;
    let newBump = null;
    let bump_rotate = null;
    let output_data = [[],[],[],[],[],[]];
    let csv_arrays = null
    let input_data_course = [];
    let input_data_turn = [];
    let input_data_border = [];
    let input_data_check = [];
    let input_data_obstacle = [];
    let input_data_bump = [];
    let file = null;
    // let course_show = 0;
    let data = null;
    let auto_save_tile = [];
    let auto_save_input = [];


    function nomal_guide() {
      if(document.getElementById('tab-nav').textContent == 'WRLタイルへ'){
        $guide.textContent = 'タイルをダブルクリックすると時計回りに90度回転します';
      } else {
        if($tools[0].dataset.one == 1){
          $guide.textContent = 'ただいま1階部分を作成中です';
        }else{
          $guide.textContent = 'ただいま2階・半2階部分を作成中です';
        }
      }
    };

    function auto_save(){
      for (let index = 0; index < imgLen; index++) {
        auto_save_tile.push(".././img/" + $img[index].src.slice(-6));
      }
      if (localStorage.hasOwnProperty("rrl_auto-save")){
        localStorage.removeItem("rrl_auto-save");
      }
      localStorage.setItem("rrl_auto-save", JSON.stringify(auto_save_tile));
      auto_save_tile = [];
    }


    //回転
    function turn() {
      for (let index = 0; index < imgLen; index++) {
        nowturn = null; 
        $img[index].addEventListener('dblclick', (e)=> {
          nowturn = Number(e.target.dataset.turn);
          e.target.style.transform = 'rotate(' + (90 + nowturn) +'deg)';
          e.target.dataset.turn = 90 + nowturn;
        });
      }
    }
    turn();


    // 本プログラム
    function course_input() {
      for (let index = 1; index < courseNrlLen; index++) {
        $course_nrl[index].addEventListener('click', (e)=> {
          src = e.target.src;
          for (let index = 0; index < imgLen; index++) {
            $img[index].addEventListener('click', (e)=> {
              e.target.src = src;
              auto_save();
            });
          }
        });
      }
      for (let index = 1; index < courseWrlLen; index++) {
        $course_wrl[index].addEventListener('click', (e)=> {
          src = e.target.src;
          for (let index = 0; index < imgLen; index++) {
            $img[index].addEventListener('click', (e)=> {
              e.target.src = src;
              auto_save();
            });
          }
        });
      }
    }
    course_input();

    //タイル情報
    function course_data() {
      for (let index = 0; index < $coursedata.length; index++) {
        $coursedata[index].addEventListener('click', (e) => {
          data = e.target.style.border
          for (let i = 0; i < imgLen; i++) {
            $img[i].addEventListener('click', (e)=> {
              e.target.style.border = data;
            });
          }
        });
      }
    }
    course_data();

    // 被災者ゾーンの自動入力
    const corner = '.././img/r1.png';
    const wall = '.././img/r2.png';
    const white = '.././img/wt.png';
    let a = 0;
    function hisaisya(arg) {
      if (a === 0){
        $img[arg].src = corner;
        $img[arg + 1].src = wall;
        $img[arg + 2].src = wall;
        $img[arg + 3].src = corner;
        $img[arg + 3].style.transform = 'rotate(90deg)';
        $img[arg + 3].dataset.turn = 90;
        $img[arg + 8].src = wall;
        $img[arg + 8].style.transform = 'rotate(270deg)';
        $img[arg + 8].dataset.turn = 270;
        $img[arg + 9].src = white;
        $img[arg + 10].src = white;
        $img[arg + 11].src = wall;
        $img[arg + 11].style.transform = 'rotate(90deg)';
        $img[arg + 11].dataset.turn = 90;
        $img[arg + 16].src = corner;
        $img[arg + 16].style.transform = 'rotate(270deg)';
        $img[arg + 16].dataset.turn = 270;
        $img[arg + 17].src = wall;
        $img[arg + 17].style.transform = 'rotate(180deg)';
        $img[arg + 17].dataset.turn = 180;
        $img[arg + 18].src = wall;
        $img[arg + 18].style.transform = 'rotate(180deg)';
        $img[arg + 18].dataset.turn = 180;
        $img[arg + 19].src = corner;
        $img[arg + 19].style.transform = 'rotate(180deg)';
        $img[arg + 19].dataset.turn = 180;
        a = 1
        auto_save();
        nomal_guide();
      } else if (src != '.././img/r1.png'){} else{
        window.alert('コートに避難ゾーンは一つしか置けません。');
      }
    };
    
    $course_nrl[0].addEventListener('click', ()=>{
      //もしほかのタイルをクリックした後にこれを実行した時用
      src = '.././img/r1.png';
      $guide.textContent = 'このタイルを一番左上、その3つ下、それらの3つ右のどこかに置くと被災者ゾーンを自動入力します';
      $img[0].onclick = function () {
        hisaisya(0);
      };
      $img[4].onclick = function () {
        hisaisya(4);
      };
      $img[24].onclick = function () {
        hisaisya(24);
      };
      $img[28].onclick = function () {
        hisaisya(28);
      };
    });
    $course_wrl[0].addEventListener('click', ()=>{
      //もしほかのタイルをクリックした後にこれを実行した時用
      src = '.././img/r1.png';
      $guide.textContent = 'このタイルを一番左上、その3つ下、それらの3つ右のどこかに置くと被災者ゾーンを自動入力します';
      $img[0].onclick = function () {
        hisaisya(0);
      };
      $img[4].onclick = function () {
        hisaisya(4);
      };
      $img[24].onclick = function () {
        hisaisya(24);
      };
      $img[28].onclick = function () {
        hisaisya(28);
      };
    });


    function tile(arg) {
      $table[0].style.display = 'none';
      $table[1].style.display = 'none';
      $table[2].style.display = 'none';
      $table[3].style.display = 'none';
      $table[4].style.display = 'none';
      $table[5].style.display = 'none';
      $table[arg].style.display = 'block';
    }

    //2階・半2階
    $tools[0].addEventListener('click', () => {
      if($tools[0].dataset.one == 1){
        if($table[0].style.display == 'block'){
          tile(1);
        }else if ($table[2].style.display == 'block'){
          tile(3);
        }else if($table[4].style.display == 'block'){
          tile(5);
        }
        $tools[0].textContent = '1階部分の作成';
        $tools[0].dataset.one = 2;
        nomal_guide();
      }else{
        if($table[1].style.display == 'block'){
          tile(0);
        }else if ($table[3].style.display == 'block'){
          tile(2);
        }else if($table[5].style.display == 'block'){
          tile(4);
        }
        $tools[0].textContent = '2階・半2階部分の作成';
        $tools[0].dataset.one = 1;
        nomal_guide();
      }
    });

    //グリッドの表示・非表示
    $tools[1].addEventListener('click', () => {
      if($tools[1].dataset.grid == 1){
        //tdとimgの数は一緒
        for (let index = 0; index < imgLen; index++) {
          $doc.getElementsByTagName('td')[index].style.border = 'none';
        }
        $tools[1].textContent = 'グリッドの表示';
        $tools[1].dataset.grid = 0;
        $guide.textContent = 'グリッドを表示しています';
        setTimeout(nomal_guide, 2000);
      }else{
        for (let index = 0; index < imgLen; index++) {
          $doc.getElementsByTagName('td')[index].style.border = '1px solid #AAAAAA';
        }
        $tools[1].textContent = 'グリッドの非表示';
        $tools[1].dataset.grid = 1;
        $guide.textContent = 'グリッドを非表示にしました';
        setTimeout(nomal_guide, 2000);
      }
    });

    //プロジェクトの保存
    function downloadCSV() {
      output_data = [[],[],[],[],[],[]];
      //ダウンロードするCSVファイル名を指定する
      const filename = window.prompt('ファイル名を入力:');
      if (filename) {
        //ダウンロードするタイルを配列に入れる
        for (let index = 0; index < imgLen; index++) {
          output_data[0].push(".././img/" + $img[index].src.slice(-6));
          output_data[1].push($img[index].dataset.turn);
          if ($img[index].style.border =="1px solid rgb(102, 51, 102)"){
            output_data[2].push("solid 1px #663366");
          }else if ($img[index].style.border =="1px solid rgb(153, 51, 102)"){
            output_data[2].push("solid 1px #993366");
          }else if ($img[index].style.border =="1px solid rgb(204, 51, 102)"){
            output_data[2].push("solid 1px #CC3366");
          }else if ($img[index].style.border =="1px solid rgb(255, 51, 102)"){
            output_data[2].push("solid 1px #FF3366");
          }else{
            output_data[2].push("none");
          }
          output_data[3].push($img[index].dataset.check);
          output_data[4].push($img[index].dataset.obstacle);
          output_data[5].push($img[index].dataset.bump);
        };
        output_data[0].push('\n');
        output_data[1].push('\n');
        output_data[2].push('\n');
        output_data[3].push('\n');
        output_data[4].push('\n');
        //BOMを付与する（Excelでの文字化け対策）
        const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
        //Blobでデータを作成する
        const blob = new Blob([bom, output_data], { type: "text/csv" });
        //BlobからオブジェクトURLを作成する
        const url = (window.URL || window.webkitURL).createObjectURL(blob);
        //ダウンロード用にリンクを作成する
        const download = document.createElement("a");
        //リンク先に上記で生成したURLを指定する
        download.href = url;
        //download属性にファイル名を指定する
        download.download = filename + ".rrl";
        //作成したリンクをクリックしてダウンロードを実行する
        download.click();
        //createObjectURLで作成したオブジェクトURLを開放する
        (window.URL || window.webkitURL).revokeObjectURL(url);
        $guide.textContent = 'プロジェクトを保存しました';
        setTimeout(nomal_guide, 2000);
      }
    }
    $tools[2].addEventListener('click', downloadCSV, false);


    //プロジェクトの読み込み
    let reader = new FileReader();
    document.getElementById('input_file').addEventListener('change', () => {
      if (document.getElementById('input_file').files[0].name.slice(-3) === 'rrl') {
        file = document.getElementById('input_file').files[0];
        reader.readAsText(file);
        reader.onload = function () {
          try{
            csv_arrays = reader.result.split('\n');
            input_data_course = csv_arrays[0].split(',');
            input_data_turn = csv_arrays[1].split(',');
            input_data_border = csv_arrays[2].split(',');
            input_data_check = csv_arrays[3].split(',');
            input_data_obstacle = csv_arrays[4].split(',');
            input_data_bump = csv_arrays[5].split(',');
          }catch (e){
            window.alert('エラー:データの読み込みに失敗しました。ファイルが破損している可能性があります。ページを再読み込みします。')
            window.location.reload();
          }
          all_clear();
          for (let index = 0; index < imgLen; index++) {
            $img[index].src = input_data_course[index];
            $img[index].dataset.turn = input_data_turn[index + 1];
            $img[index].style.transform = 'rotate(' + input_data_turn[index + 1] + 'deg)';
            $img[index].style.border = input_data_border[index + 1];
            //チェックマーカー
            if(input_data_check[index + 1] == 1){
              newCheckMarker = document.createElement("div");
              newCheckMarker.className = "check-marker";
              $img[index].parentElement.appendChild(newCheckMarker);
              $img[index].dataset.check = 1;
            }
            //障害物
            if(input_data_obstacle[index + 1] == 1){
              newObstacle = document.createElement("img");
              newObstacle.src = ".././img/ob.svg";
              newObstacle.className = "obstacle";
              $img[index].parentElement.appendChild(newObstacle);
              $img[index].dataset.obstacle = 1;
            }
            //バンプ
            if(input_data_bump[index + 1] != 0){
              newBump = document.createElement("img");
              newBump.src = ".././img/bu.png";
              newBump.className = "bump";
              bump_rotate = input_data_bump[index + 1];
              newBump.setAttribute("style", "transform: rotate(" + bump_rotate + "deg)");
              $img[index].parentElement.appendChild(newBump);
              $img[index].dataset.bump = bump_rotate;
            }
          };
          document.getElementById('input_file').value = '';
          $guide.textContent = 'プロジェクトを読み込みました';
          setTimeout(nomal_guide, 2000);
        }
      }else{
        window.alert('拡張子は.rrlしか対応していません。')
      }
    });

    //自動保存の読み込み
    $tools[4].addEventListener('click', ()=> {
      if (window.confirm('最新の自動保存データを読み込みますか？このデータにはタイルのみが含まれます。詳細はヘルプをご覧ください。')) {
        auto_save_input = localStorage.getItem("rrl_auto-save",);
        if (auto_save_input == null){
          window.alert('自動保存データがありません')
        }else{
          auto_save_input = JSON.parse(auto_save_input)
          for (let index = 0; index < imgLen; index++) {
            $img[index].src = auto_save_input[index];
          }
        }
      }
    });

    //プリント
    function print() {
      $tools[5].addEventListener('click', ()=> {
        window.alert('PDFとして印刷するにはプリンターを「PDFとして保存」にしてください。印刷するときはレイアウトを「横」にしてください。');
        $menu[0].style.display = 'none';
        $toolbar[0].style.display = 'none';
        $guide.style.display = 'none';
        $copyright.style.display = 'none';
        document.body.style.background = '#FFFFFF';
        if($table[0].style.display == 'block'){
          $table[1].style.display = 'block';
          print_block = 0;
        }else if ($table[1].style.display == 'block'){
          $table[0].style.display = 'block';
          print_block = 1;
        }else if ($table[2].style.display == 'block'){
          $table[3].style.display = 'block';
          print_block = 2;
        }else if ($table[3].style.display == 'block'){
          $table[2].style.display = 'block';
          print_block = 3;
        }else if ($table[4].style.display == 'block'){
          $table[5].style.display = 'block';
          print_block = 4;
        }else if($table[5].style.display == 'block'){
          $table[4].style.display = 'block';
          print_block = 5;
        }
        window.print();
        $menu[0].style.display = 'flex';
        $toolbar[0].style.display = 'flex';
        $guide.style.display = 'block';
        $copyright.style.display = 'block';
        document.body.style.background = '#F8F8F8';
        if(print_block = 0){
          $table[1].style.display = 'none';
        }else if(print_block = 1){
          $table[0].style.display = 'none';
        }else if(print_block = 2){
          $table[3].style.display = 'none';
        }else if(print_block = 3){
          $table[2].style.display = 'none';
        }else if(print_block = 4){
          $table[5].style.display = 'none';
        }else if(print_block = 5){
          $table[4].style.display = 'none';
        }
      });
    }
    print();    


    //オールクリア
    function all_clear(){
      for (let index = 0; index < imgLen; index++) {
        $img[index].src = '.././img/no.png';
        $img[index].style = '';
        if($img[index].dataset.check == 1){
          $img[index].nextElementSibling.remove();
          $img[index].dataset.check = 0;
        }else if ($img[index].dataset.obstacle == 1){
          $img[index].nextElementSibling.remove();
          $img[index].dataset.obstacle = 0;
        }else if ($img[index].dataset.bump != 0){
          $img[index].nextElementSibling.remove();
          $img[index].dataset.bump = 0;
        }
      }
      a = 0;
    }
    $tools[6].addEventListener('click', ()=> {
      if(window.confirm('すべてのコースデータを削除しますか?この作業は取り消しできません。')){
        all_clear();
        $guide.textContent = 'すべてのコースデータを削除しました';
        setTimeout(nomal_guide, 2000);
      }
    });

    //残り全部を白にする
    $tools[7].addEventListener('click', ()=> {
      for (let index = 0; index < imgLen; index++) {
        if($img[index].src.lastIndexOf('no.png') !== -1){
          $img[index].src = '.././img/wt.png';
        }
      }
      auto_save();
      $guide.textContent = '未入力のタイルをすべて白色にしました';
      setTimeout(nomal_guide, 2000);
    });


    //6×8タイル
    $tools[8].addEventListener('click', ()=> {
      tile(0);
      $tools[0].dataset.one = 1;
      $guide.textContent = '6×8タイルに切り替えました';
        setTimeout(nomal_guide, 2000);
    });

    //4×9タイル
    $tools[9].addEventListener('click', ()=> {
      tile(2);
      $tools[0].dataset.one = 1;
      $guide.textContent = '4×9タイルに切り替えました。このモードでは被災者ゾーンの自動入力機能は使えません。';
        setTimeout(nomal_guide, 3000);
    });

    //3×12タイル
    $tools[10].addEventListener('click', ()=> {
      tile(4);
      $tools[0].dataset.one = 1;
      $guide.textContent = '3×12タイルに切り替えました。このモードでは被災者ゾーンの自動入力機能は使えません。';
        setTimeout(nomal_guide, 3000);
    });

    //ヘルプ
    $tools[11].addEventListener('click', ()=> {
      window.open('help.html')
    });
    //ヘルプ(F1キー)
    window.addEventListener("keydown", function(e){
      if (e.key == "F1") {
        e.preventDefault();
        window.open('help.html')
      }
    });


    //チェックマーカー・障害物・バンプどれか1つに絞る
    function narrow_down(arg){
      document.getElementsByClassName('contextmenu-title')[2].style.color = "#AAAAAA";
      document.getElementsByClassName('contextmenu-title')[2].style.cursor = "default";
      document.getElementsByClassName('contextmenu-title')[3].style.color = "#AAAAAA";
      document.getElementsByClassName('contextmenu-title')[3].style.cursor = "default";
      document.getElementsByClassName('contextmenu-title')[4].style.color = "#AAAAAA";
      document.getElementsByClassName('contextmenu-title')[4].style.cursor = "default";
      document.getElementsByClassName('contextmenu-title')[5].style.color = "#AAAAAA";
      document.getElementsByClassName('contextmenu-title')[5].style.cursor = "default";
      document.getElementsByClassName('contextmenu-title')[6].style.color = "#AAAAAA";
      document.getElementsByClassName('contextmenu-title')[6].style.cursor = "default";
      document.getElementsByClassName('contextmenu-title')[7].style.color = "#AAAAAA";
      document.getElementsByClassName('contextmenu-title')[7].style.cursor = "default";

      if($img[arg].dataset.check == 1){
        document.getElementsByClassName('contextmenu-title')[3].style.color = "#000000";
        document.getElementsByClassName('contextmenu-title')[3].style.cursor = "pointer";
        checkOrUncheck = 1;
      }else if($img[arg].dataset.obstacle == 1){
        document.getElementsByClassName('contextmenu-title')[5].style.color = "#000000";
        document.getElementsByClassName('contextmenu-title')[5].style.cursor = "pointer";
        obOrUnob = 1;
      }else if($img[arg].dataset.bump != 0){
        document.getElementsByClassName('contextmenu-title')[7].style.color = "#000000";
        document.getElementsByClassName('contextmenu-title')[7].style.cursor = "pointer";
        bumpOrUnbump = 1;
      }else{
        document.getElementsByClassName('contextmenu-title')[2].style.color = "#000000";
        document.getElementsByClassName('contextmenu-title')[2].style.cursor = "pointer";
        document.getElementsByClassName('contextmenu-title')[4].style.color = "#000000";
        document.getElementsByClassName('contextmenu-title')[4].style.cursor = "pointer";
        document.getElementsByClassName('contextmenu-title')[6].style.color = "#000000";
        document.getElementsByClassName('contextmenu-title')[6].style.cursor = "pointer";
        checkOrUncheck = 0;
        obOrUnob = 0;
        bumpOrUnbump = 0;
      }
    }


    //右クリックメニュー
    for (let index = 0; index < imgLen; index++) {
      secondOrFirst = null;
      $img[index].addEventListener('contextmenu', (e) => {
        e.preventDefault();
        document.getElementById('contextmenu').style.display = "block";
        //topとbottomの決定(もし下のスペースがなければメニューを上にずらす)
        if (window.innerHeight - e.pageY < 250) {
          document.getElementById('contextmenu').style.top = "auto";
          document.getElementById('contextmenu').style.bottom = "10px";
        } else {
          document.getElementById('contextmenu').style.top = e.pageY+"px";
          document.getElementById('contextmenu').style.bottom = "auto";
        }
        //rightとleftの決定(もし右のスペースがなければメニューを左にずらす)
        if (window.innerWidth - e.pageX < 180) {
          document.getElementById('contextmenu').style.right = (window.innerWidth - e.pageX) + "px";
          document.getElementById('contextmenu').style.left = "auto";
        } else {
          document.getElementById('contextmenu').style.left = e.pageX+"px";
          document.getElementById('contextmenu').style.right = "auto";
        }
        //90度回転
        document.getElementsByClassName('contextmenu-title')[0].onclick= function() {
          nowturn = Number(e.target.dataset.turn);
          $img[index].style.transform = 'rotate(' + (90 + nowturn) +'deg)';
          $img[index].dataset.turn = 90 + nowturn;
        };
        //タイル情報の削除
        document.getElementsByClassName('contextmenu-title')[1].onclick= function() {
          $img[index].src = ".././img/no.png";
          $img[index].style.transform = 'rotate(0deg)';
          $img[index].dataset.turn = 0;
          $img[index].style.border = 'none';
          $img[index].dataset.floor = 0;
          if ($img[index].dataset.check == 1){
            $img[index].nextElementSibling.remove();
            $img[index].dataset.check = 0;
          }else if ($img[index].dataset.obstacle == 1){
            $img[index].nextElementSibling.remove();
            $img[index].dataset.obstacle = 0;
          }
        };
        narrow_down(index);
          //チェックマーカー
          if (checkOrUncheck == 0){
            document.getElementsByClassName('contextmenu-title')[2].onclick = function(){
              newCheckMarker = document.createElement("div");
              newCheckMarker.className = "check-marker";
              $img[index].parentElement.appendChild(newCheckMarker);
              $img[index].dataset.check = 1;
            }
            document.getElementsByClassName('contextmenu-title')[3].onclick = function(){}
          } else {
            document.getElementsByClassName('contextmenu-title')[3].onclick = function() {
              $img[index].nextElementSibling.remove();
              $img[index].dataset.check = 0;
            };
            document.getElementsByClassName('contextmenu-title')[2].onclick = function(){}
          }
          //障害物
          if (obOrUnob == 0){
            document.getElementsByClassName('contextmenu-title')[4].onclick = function() {
              newObstacle = document.createElement("img");
              newObstacle.src = ".././img/ob.svg";
              newObstacle.className = "obstacle";
              $img[index].parentElement.appendChild(newObstacle);
              $img[index].dataset.obstacle = 1;
            };
            document.getElementsByClassName('contextmenu-title')[5].onclick = function(){}
          } else {
            document.getElementsByClassName('contextmenu-title')[5].onclick= function() {
              $img[index].nextElementSibling.remove();
              $img[index].dataset.obstacle = 0;
            };
            document.getElementsByClassName('contextmenu-title')[4].onclick = function(){}
          }
          //バンプ
          if (bumpOrUnbump == 0){
            document.getElementsByClassName('contextmenu-title')[6].onclick = function() {
              bump_rotate = prompt('バンプの角度を入力(0~180、0度で縦向き、半角数字ではない場合0度になります):');
              if(bump_rotate){
                newBump = document.createElement("img");
                newBump.src = ".././img/bu.png";
                newBump.className = "bump";
                newBump.setAttribute("style", "transform: rotate(" + (Number(bump_rotate) + 180) + "deg)");
                $img[index].parentElement.appendChild(newBump);
                $img[index].dataset.bump = bump_rotate;
              }
            };
            document.getElementsByClassName('contextmenu-title')[7].onclick = function(){}
          } else {
            document.getElementsByClassName('contextmenu-title')[7].onclick= function() {
              $img[index].nextElementSibling.remove();
              $img[index].dataset.bump = 0;
            };
            document.getElementsByClassName('contextmenu-title')[6].onclick = function(){}
          }
      });
    }

    //右クリックメニュー非表示
    document.body.addEventListener('click',function (){
      document.getElementById('contextmenu').style.display="none";
    });

    //NRL・WRL切り替え
    document.getElementById('tab-nav').addEventListener('click', (e) => {
      e.preventDefault();
      if(document.getElementById('tab-nav').textContent == 'WRLタイルへ'){
        console.log('a')
        document.getElementById('wrl-tiles').style.display = 'block';
        document.getElementById('nrl-tiles').style.display = 'none';
        document.getElementById('tab-nav').textContent ='NRLタイルへ';
        $tools[0].style.display = 'block';
        nomal_guide();
      } else {
        console.log('b')
        document.getElementById('wrl-tiles').style.display = 'none';
        document.getElementById('nrl-tiles').style.display = 'block';
        document.getElementById('tab-nav').textContent ='WRLタイルへ';
        $tools[0].style.display = 'none';
        nomal_guide();
      }
    });

  })();