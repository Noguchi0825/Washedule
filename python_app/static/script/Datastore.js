/////////関数/////////
//set_____()
//inputフォームの値をlocalstorageに保存

//get_____()
//localstorageを取得（確認用なので使用しない）

//requiredInput_____()
//inputフォームに値が入力されたかを判定し、されていれば次のページに遷移する

//createJSON()
//戻り値　JSON形式の取得データ
//取得できた値を合わせて、JSONを作成しlocalstorageに保存する

//getJSONForm(actionURL)
//引数　actionURL：送信先のURL
//javascriptで擬似的にフォームを作り、指定したURLに値を送信（get）する
//（重要）送信（リクエスト）することで、python上での受け渡しが可能（重要）

//////////////////////////////////////////////////////////////////////////////////

function setPostNumber(){
      var data = document.querySelector("#zip01").value + document.querySelector("#zip02").value
      localStorage.setItem("postnumber", JSON.stringify(data));
}

function getPostNumber(){
if(localStorage.getItem('postnumber')){
      postnumber = JSON.parse(localStorage.getItem('postnumber'));
      console.log(JSON.stringify(postnumber));
  }
}

function requiredInput_post(){
  if((document.querySelector("#zip01").value) && (document.querySelector("#zip02").value)){
    setPostNumber();
    location.href = "http://10.10.92.155:8000/initial/worktime/";
  }
}

//////////////////////////////////////////////////////////////////////////////////

function setWorkTime(){
  var data = {
        end : document.querySelector("#starttime").value,
        start : document.querySelector("#endtime").value
  }
  localStorage.setItem("worktime", JSON.stringify(data));
}

function getWorkTime(){
if(localStorage.getItem('worktime')){
  worktime = JSON.parse(localStorage.getItem('worktime'));
  console.log(JSON.stringify(worktime));
}
}
function requiredInput_work(){
  if((document.querySelector("#starttime").value) && (document.querySelector("#endtime").value)){
    setWorkTime();
    location.href = "http://10.10.92.155:8000/initial/laundryscale/";
  }
}

//////////////////////////////////////////////////////////////////////////////////

function setLaundryScale(){
  var element = document.getElementById( "target" ) ;
  var radioNodeList = element.q1 ;
  var data = radioNodeList.value ;
  localStorage.setItem("laundryscale", JSON.stringify(data));
}

function getLaundryScale(){
if(localStorage.getItem('laundryscale')){
  laundryscale = JSON.parse(localStorage.getItem('laundryscale'));
  console.log(JSON.stringify(laundryscale));
}
}

//////////////////////////////////////////////////////////////////////////////////

function createJSON(){
  postnumber = JSON.parse(localStorage.getItem('postnumber'));
  worktime = JSON.parse(localStorage.getItem('worktime'));
  laundryscale = JSON.parse(localStorage.getItem('laundryscale'));

  var json = {
    "PostNumber": postnumber,
    "StartWorkTime": worktime['start'],
    "EndWorkTime": worktime['end'],
    "LaundryScale": laundryscale
  }

  var data = JSON.stringify(json)
  localStorage.setItem("Customer", JSON.stringify(json));
  return data
}

function getJSONForm(actionURL) {
 
  var form = document.createElement('form');
  var request = document.createElement('input');
  var value = createJSON();

  form.method = 'GET';
  form.action = actionURL;

  request.type = 'hidden';
  request.name = 'sendJSON';
  request.value = value;

  form.appendChild(request);

  document.body.appendChild(form);

  form.submit();
}

//////////////////////////////////////////////////////////////////////////////////
