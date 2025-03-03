let dropdown, slider, btnElement, colorPicker, radioElement, iframe;
let randomValue = 0;
let mode = "一般";

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  dropdown = createSelect(); // 創建下拉式選單
  dropdown.option("來了");
  dropdown.option("淡江大學");
  dropdown.option("教育科技");
  dropdown.position((width - dropdown.width) / 2, 10); // 將下拉式選單移到上方中間
  dropdown.changed(handleDropdownChange); // 設定選項改變時的處理函數
  
  slider = createSlider(10, 100, 32); // 創建滑桿，範圍從10到100，初始值為32
  slider.position((width - slider.width) / 2, 50); // 將滑桿移到下拉式選單下方中間
  
  btnElement = createButton("瘋狂"); // 創建按鈕
  btnElement.position((width - btnElement.width) / 2, 90); // 將按鈕移到滑桿下方中間
  btnElement.mousePressed(goCrazy); // 設定按鈕按下滑鼠執行的程式碼
  
  colorPicker = createColorPicker('#ed225d'); // 創建顏色選擇器，預設值為紅色
  colorPicker.position((width - colorPicker.width) / 2, 130); // 將顏色選擇器移到按鈕下方中間
  
  radioElement = createRadio(); // 創建旋鈕
  radioElement.option("一般");
  radioElement.option("旋轉(rotate)");
  radioElement.option("大小(scale)");
  radioElement.style("background-color", 'white'); // 設定為CSS格式
  radioElement.position((width - radioElement.width) / 2, 170); // 將旋鈕移到顏色選擇器下方中間
  
  iframe = createElement('iframe'); // 創建 iframe 元素
  iframe.position(0, 200); // 將 iframe 移到適當位置
  iframe.size(windowWidth, windowHeight - 200); // 設定 iframe 大小
}

function draw() {
  background(0); // 背景改成黑色
  fill(colorPicker.value()); // 使用顏色選擇器的值來填充文字
  let txt = dropdown.value(); // 獲取下拉式選單的值
  let textSizeValue = slider.value(); // 獲取滑桿的值
  textSize(textSizeValue);
  textAlign(LEFT, TOP);
  let y = 100; // 起始位置
  let xOffset = sin(frameCount * 0.1) * randomValue; // 隨著時間變化的水平偏移
  let yOffset = cos(frameCount * 0.1) * randomValue; // 隨著時間變化的垂直偏移
  mode = radioElement.value(); // 獲取旋鈕的值
  
  while (y < height) {
    let x = 0;
    while (x < width) {
      push();
      translate(x + xOffset, y + yOffset);
      if (mode === "旋轉(rotate)") {
        rotate(frameCount * 0.05);
      } else if (mode === "大小(scale)") {
        scale(sin(frameCount * 0.05) * 0.5 + 1);
      }
      text(txt, 0, 0);
      pop();
      x += textWidth(txt) + 20; // 每句話之間有間隔
    }
    y += textSizeValue + 20; // 每句話之間有間隔
  }
}

function goCrazy() {
  if (randomValue > 0) {
    randomValue = 0;
  } else {
    randomValue = 2; // 輕微震動
  }
}

function handleDropdownChange() {
  if (dropdown.value() === "教育科技") {
    iframe.attribute('src', 'https://www.et.tku.edu.tw/'); // 使用 iframe 嵌入網頁
  } else {
    iframe.attribute('src', ''); // 清空 iframe
  }
}