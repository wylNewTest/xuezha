/**
* 交互漫画：第一场景包含主人公形象和对话气泡
* - 场景 1：主人公 + 对话气泡 + 文字
* - 场景 2：保持原有设计
* - 点击或按空格在场景间切换
*/


// 如果你想用图片背景，把 useImages 设为 true，并替换 img1/img2 路径
const useImages = true; // ← 改为 true 使用图片
const img1Path = 'assets/scene1.jpg';
const img2Path = 'assets/scene2.jpg';
const img3Path = 'assets/scene3.jpg';
const img4Path = 'assets/scene4.jpg';
const img5Path = 'assets/scene5.jpg';
const img6Path = 'assets/scene6.jpg';
const img7Path = 'assets/scene7.jpg';
const img8Path = 'assets/scene8.jpg';
const img9Path = 'assets/scene9.jpg';
const img10Path = 'assets/scene10.jpg';
const img11Path = 'assets/scene11.jpg';
//const img12Path = 'assets/scene12.jpg';
const imgHero1Path = 'assets/hero1.png';
const imgHero2Path = 'assets/hero2.png';
const imgHero3Path = 'assets/hero3.png';
const imgHero4Path = 'assets/hero4.png';
const imgHero5Path = 'assets/hero5.png';
const imgHero6Path = 'assets/hero6.png';
const imgHero7Path = 'assets/hero7.png';
const imgHero8Path = 'assets/hero8.png';
const imgDongzhiyuanPath = 'assets/dongzhiyuan.png';
const imgWenwanPath = 'assets/wenwan.png';
const imgMathTeacherPath = 'assets/mathTeacher.png';
const imgArtTeacherPath = 'assets/artTeacher.png';
const imgPaintingPath = 'assets/painting.jpg';
const paintingMusicPath = 'assets/paintingMusic.m4a';
let img1, img2,img3, img4,img5, img6, img7, img8, img9, img10, img11, imgHero1, imgHero2, imgHero3, imgHero4, imgHero5, imgHero6, imgHero7, imgHero8, imgPainting, imgDongzhiyuan, imgWenwan, imgMathTeacher, imgArtTeacher, paintingMusic;

let lastPaintingRect = null; // 记录画作的最新绘制区域，用于悬停与点击检测
let scene3BtnBackRect = null; // 场景3：返回场景2按钮区域
let scene3BtnNextRect = null; // 场景3：跳转场景4按钮区域
let scene4BtnNextRect = null; // 场景4：跳转场景5按钮区域
let scene5BtnNextRect = null; // 场景5：跳转场景6按钮区域
let scene8BtnNextRect = null; // 场景8：跳转场景9按钮区域
let scene10BtnMathRect = null; // 场景10：change math score按钮区域
let scene10BtnDreamRect = null; // 场景10：draw big dream按钮区域


// 对话内容
const dialogue1 = "Mom, I'm leaving for school today.";
const dialogue2 = "(Silence)Song Wanqian stared at the painting, lost in thought.";

// Scene4 对话状态管理
let scene4DialogueState = 0; // 0: dongzhiyuan说话, 1: 主角说话
const scene4Dialogues = [
  "Wow, here comes the artist! When will you sign an autograph for me?", // dongzhiyuan的对话内容
  "Go away！leave me alone."  // 主角的对话内容（先空着）
];

// Scene5 对话状态管理
let scene5DialogueState = 0; // 0: wenwan说话, 1: 主角说话
const scene5Dialogues = [
  "You look quite energetic today, Song Wanqian.", // wenwan的对话内容（先空着）
  "I went to bed early yesterday. I heard the math results were out."  // 主角的对话内容（先空着）
];

// Scene6 对话内容
const scene6Dialogue = "Your math exam results are out. Song Wanqian, you are the last one.";

// Scene7 对话内容
const scene7Dialogue = "I need to work harder and improve my math skills.";

// Scene8 对话状态管理
let scene8DialogueState = 0; // 0: artTeacher说话, 1: 主角说话
const scene8Dialogues = [
  "Come to my office after class. Song Wanqian", // artTeacher的对话内容
  "Ok,teacher Qin."  // 主角的对话内容（先空着）
];

// Scene9 对话内容
const scene9Dialogue = "This is a brush that I have treasured for a long time. I give it to you to help you realize your dream.";

// Scene10 对话内容
const scene10Dialogue = "(Song Wanqian realized it is a magic brush. He can draw anything he wants.)";

// Scene11 对话内容
const scene11Dialogue = "I cheated, I will never realize my dream!";

// Scene12 对话内容
const scene12Dialogue = "Finally,I got into CAFA. I will be a great artist!";

// 两个场景的配置
let currentScene = 0; // 0 或 1
const scenes = [
{
id: 0,
name: 'Scene 1: Song Wanqian Go to School',
bgColor: '#87CEEB', // 天蓝色背景
tip: 'Please click or press space to Scene 2',
draw() {
// 画背景
if (useImages && img1) {
image(img1, 0, 0, width, height);
} else {
background(this.bgColor);
}
// 画标题与提示
drawCenteredText(this.name, 32, -height/2 + 50);
drawCenteredText(this.tip, 18, height/2 - 30);
// 绘制主人公
drawCharacter();
// 绘制对话气泡
drawSpeechBubble1();
}
},
  {
    id: 1,
    name: 'Scene 2: On the Subway, See a Beautiful Painting',
    bgColor: '#4c6ef5',
    tip: 'Hover painting to zoom; click painting to enter Scene 3.',
    draw() {
      if (useImages && img2) {
        image(img2, 0, 0, width, height);
      } else {
        background(this.bgColor);
      }
      drawCenteredText(this.name, 32, -height/2 + 50);
      drawCenteredText(this.tip, 18, height/2 - 30);
      // 绘制主人公（使用hero2图片）
      drawCharacterScene2();
      // 绘制对话气泡
      drawSpeechBubble2();
      // 绘制画作
      drawPainting();
    }
  },
{
  id: 2,
  name: 'Scene 3: Immerse in the Painting',
  bgColor: '#333333',
  tip: 'Press space to go back to Scene 1',
  draw() {
    background(this.bgColor);
    drawCenteredText(this.name, 32, -height/2 + 50);
    drawCenteredText(this.tip, 18, height/2 - 30);
    // 在场景 3 中把画作放大并居中显示
    const centerW = min(width * 0.6, 900);
    const centerH = centerW * 0.68;
    const cx = (width - centerW) / 2;
    const cy = (height - centerH) / 2;
    if (imgPainting) {
      image(imgPainting, cx, cy, centerW, centerH);
    }
    // 场景 3：绘制两个按钮
    drawScene3Buttons();
    }
  },
  {
    id: 3,
    name: 'Scene 4: At the school Gate',
    bgColor: '#4c6ef5',
    tip: 'Click to switch dialogue between characters.',
    draw() {
      if (useImages && img3) {
        image(img3, 0, 0, width, height);
      } else {
        background(this.bgColor);
      }
      drawCenteredText(this.name, 32, -height/2 + 50);
      drawCenteredText(this.tip, 18, height/2 - 30);
      
      // 绘制两个角色
      drawCharacterScene4Hero3(); // 绘制主人公（左侧，使用hero3图片）
      drawDongzhiyuan();          // 绘制dongzhiyuan（右侧）
      
      // 绘制对话气泡
      drawScene4Dialogue();
      
      // 绘制跳转按钮
      drawScene4Button();
    }
  },
  {
    id: 4,
    name: 'Scene 5: in the Classroom',
    bgColor: '#4c6ef5',
    tip: 'Click to switch dialogue between characters.',
    draw() {
      if (useImages && img4) {
        image(img4, 0, 0, width, height);
      } else {
        background(this.bgColor);
      }
      drawCenteredText(this.name, 32, -height/2 + 50);
      drawCenteredText(this.tip, 18, height/2 - 30);
      
      // 绘制两个角色
      drawCharacterScene5Hero4(); // 绘制主人公（左侧，使用hero4图片）
      drawWenwan();                // 绘制wenwan（右侧）
      
      // 绘制对话气泡
      drawScene5Dialogue();
      
      // 绘制跳转按钮
      drawScene5Button();
    }
  },
  {
    id: 5,
    name: 'Scene 6: Math Teacher',
    bgColor: '#87CEEB',
    tip: 'Click or press space to next scene',
    draw() {
      if (useImages && img5) {
        image(img5, 0, 0, width, height);
      } else {
        background(this.bgColor);
      }
      drawCenteredText(this.name, 32, -height/2 + 50);
      drawCenteredText(this.tip, 18, height/2 - 30);
      
      // 绘制mathTeacher角色
      drawMathTeacher();
      
      // 绘制对话气泡
      drawScene6Dialogue();
    }
  },
  {
    id: 6,
    name: 'Scene 7: Feel Embarrassed',
    bgColor: '#87CEEB',
    tip: 'Please click or press space to next scene',
    draw() {
      // 画背景
      if (useImages && img6) {
        image(img6, 0, 0, width, height);
      } else {
        background(this.bgColor);
      }
      // 画标题与提示
      drawCenteredText(this.name, 32, -height/2 + 50);
      drawCenteredText(this.tip, 18, height/2 - 30);
      // 绘制主人公（使用hero5图片）
      drawCharacterScene7Hero5();
      // 绘制对话气泡
      drawScene7Dialogue();
    }
  },
  {
    id: 7,
    name: 'Scene 8: Art Teacher',
    bgColor: '#4c6ef5',
    tip: 'Click to switch dialogue between characters.',
    draw() {
      if (useImages && img7) {
        image(img7, 0, 0, width, height);
      } else {
        background(this.bgColor);
      }
      drawCenteredText(this.name, 32, -height/2 + 50);
      drawCenteredText(this.tip, 18, height/2 - 30);
      
      // 绘制两个角色
      drawCharacterScene8(); // 绘制主人公（左侧）
      drawArtTeacher();      // 绘制artTeacher（右侧）
      
      // 绘制对话气泡
      drawScene8Dialogue();
      
      // 绘制跳转按钮
      drawScene8Button();
    }
  },
  {
    id: 8,
    name: 'Scene 9: Qin Ming’s Office',
    bgColor: '#87CEEB',
    tip: 'Please click or press space to restart',
    draw() {
      if (useImages && img8) {
        image(img8, 0, 0, width, height);
      } else {
        background(this.bgColor);
      }
      drawCenteredText(this.name, 32, -height/2 + 50);
      drawCenteredText(this.tip, 18, height/2 - 30);
      
      // 绘制artTeacher
      drawArtTeacherScene9();
      
      // 绘制对话气泡
      drawScene9Dialogue();
    }
  },
  {
    id: 9,
    name: 'Scene 10: Final Reflection',
    bgColor: '#87CEEB',
    tip: 'Choose your action below',
    draw() {
      // 画背景
      if (useImages && img9) {
        image(img9, 0, 0, width, height);
      } else {
        background(this.bgColor);
      }
      // 画标题与提示
      drawCenteredText(this.name, 32, -height/2 + 50);
      drawCenteredText(this.tip, 18, height/2 - 30);
      // 绘制主人公（使用hero6图片）
      drawCharacterScene10Hero6();
      // 绘制对话气泡
      drawScene10Dialogue();
      // 绘制两个按钮
      drawScene10Buttons();
    }
  },
  {
    id: 10,
    name: 'Scene 11: Change Math Score',
    bgColor: '#87CEEB',
    tip: 'Please click or press space to restart',
    draw() {
      // 画背景
      if (useImages && img10) {
        image(img10, 0, 0, width, height);
      } else {
        background(this.bgColor);
      }
      // 画标题与提示
      drawCenteredText(this.name, 32, -height/2 + 50);
      drawCenteredText(this.tip, 18, height/2 - 30);
      // 绘制主人公（使用hero7图片）
      drawCharacterScene11Hero7();
      // 绘制对话气泡
      drawScene11Dialogue();
    }
  },
  {
    id: 11,
    name: 'Scene 12: Draw Big Dream',
    bgColor: '#87CEEB',
    tip: 'Please click or press space to restart',
    draw() {
      // 画背景
      if (useImages && img11) {
        image(img11, 0, 0, width, height);
      } else {
        background(this.bgColor);
      }
      // 画标题与提示
      drawCenteredText(this.name, 32, -height/2 + 50);
      drawCenteredText(this.tip, 18, height/2 - 30);
      // 绘制主人公（使用hero8图片）
      drawCharacterScene12Hero8();
      // 绘制对话气泡
      drawScene12Dialogue();
    }
  }
];





function preload() {
if (useImages) {
// 尝试加载图片；如果路径无效，仍然能以纯色背景运行
img1 = loadImage(img1Path, () => {}, () => { img1 = null; });
img2 = loadImage(img2Path, () => {}, () => { img2 = null; });
img3 = loadImage(img3Path, () => {}, () => { img3 = null; });
img4 = loadImage(img4Path, () => {}, () => { img4 = null; });
img5 = loadImage(img5Path, () => {}, () => { img5 = null; });
img6 = loadImage(img6Path, () => {}, () => { img6 = null; });
img7 = loadImage(img7Path, () => {}, () => { img7 = null; });
img8 = loadImage(img8Path, () => {}, () => { img8 = null; });
img9 = loadImage(img9Path, () => {}, () => { img9 = null; });
img10 = loadImage(img10Path, () => {}, () => { img10 = null; });
img11 = loadImage(img11Path, () => {}, () => { img11 = null; });
//img12 = loadImage(img12Path, () => {}, () => { img12 = null; });
}
// 加载主人公图片（无论 useImages 是什么值）
imgHero1 = loadImage(imgHero1Path, 
  () => { console.log('主人公图片加载成功'); }, 
  () => { 
    console.log('主人公图片加载失败，将使用默认绘制');
    imgHero1 = null; 
  }
);
// 加载主人公2图片
imgHero2 = loadImage(imgHero2Path, 
  () => { console.log('主人公2图片加载成功'); }, 
  () => { 
    console.log('主人公2图片加载失败，将使用默认绘制');
    imgHero2 = null; 
  }
);
// 加载主人公3图片
imgHero3 = loadImage(imgHero3Path, 
  () => { console.log('主人公3图片加载成功'); }, 
  () => { 
    console.log('主人公3图片加载失败，将使用默认绘制');
    imgHero3 = null; 
  }
);
// 加载主人公4图片
imgHero4 = loadImage(imgHero4Path, 
  () => { console.log('主人公4图片加载成功'); }, 
  () => { 
    console.log('主人公4图片加载失败，将使用默认绘制');
    imgHero4 = null; 
  }
);
// 加载主人公5图片
imgHero5 = loadImage(imgHero5Path, 
  () => { console.log('主人公5图片加载成功'); }, 
  () => { 
    console.log('主人公5图片加载失败，将使用默认绘制');
    imgHero5 = null; 
  }
);
// 加载主人公6图片
imgHero6 = loadImage(imgHero6Path, 
  () => { console.log('主人公6图片加载成功'); }, 
  () => { 
    console.log('主人公6图片加载失败，将使用默认绘制');
    imgHero6 = null; 
  }
);
// 加载主人公7图片
imgHero7 = loadImage(imgHero7Path, 
  () => { console.log('主人公7图片加载成功'); }, 
  () => { 
    console.log('主人公7图片加载失败，将使用默认绘制');
    imgHero7 = null; 
  }
);
// 加载主人公8图片
imgHero8 = loadImage(imgHero8Path, 
  () => { console.log('主人公8图片加载成功'); }, 
  () => { 
    console.log('主人公8图片加载失败，将使用默认绘制');
    imgHero8 = null; 
  }
);
// 加载dongzhiyuan图片
imgDongzhiyuan = loadImage(imgDongzhiyuanPath, 
  () => { console.log('dongzhiyuan图片加载成功'); }, 
  () => { 
    console.log('dongzhiyuan图片加载失败，将使用默认绘制');
    imgDongzhiyuan = null; 
  }
);
// 加载wenwan图片
imgWenwan = loadImage(imgWenwanPath, 
  () => { console.log('wenwan图片加载成功'); }, 
  () => { 
    console.log('wenwan图片加载失败，将使用默认绘制');
    imgWenwan = null; 
  }
);
// 加载mathTeacher图片
imgMathTeacher = loadImage(imgMathTeacherPath, 
  () => { console.log('mathTeacher图片加载成功'); }, 
  () => { 
    console.log('mathTeacher图片加载失败，将使用默认绘制');
    imgMathTeacher = null; 
  }
);
// 加载artTeacher图片
imgArtTeacher = loadImage(imgArtTeacherPath, 
  () => { console.log('artTeacher图片加载成功'); }, 
  () => { 
    console.log('artTeacher图片加载失败，将使用默认绘制');
    imgArtTeacher = null; 
  }
);
imgPainting = loadImage(imgPaintingPath); // 加载画作图片
 // 加载音频（p5.sound 已在 index.html 引入）
 paintingMusic = loadSound(paintingMusicPath, 
   () => console.log('paintingMusic 加载成功'), 
   (e) => console.warn('paintingMusic 加载失败', e)
 );
}


function setup() {
createCanvas(windowWidth, windowHeight);
textFont('system-ui');
}


function draw() {
// 根据 currentScene 绘制当前场景
scenes[currentScene].draw();
}


function mousePressed() {
// Safari/Chrome 自动播放策略：首次用户交互时解锁音频
if (getAudioContext && getAudioContext().state !== 'running') {
  getAudioContext().resume();
}
// 在场景 2 中，如果点击到画作，则进入场景 3
if (currentScene === 1 && isMouseOverPainting()) {
  setScene(2);
  return;
}
// 在场景 3 中，如果点击到按钮，分别跳转
if (currentScene === 2) {
  if (isMouseOverRect(scene3BtnBackRect)) { setScene(1); return; }
  if (isMouseOverRect(scene3BtnNextRect)) { setScene(3); return; }
}
// 在场景 4 中，如果点击到按钮，跳转到场景5
if (currentScene === 3) {
  if (isMouseOverRect(scene4BtnNextRect)) { setScene(4); return; }
  // 否则切换对话
  scene4DialogueState = (scene4DialogueState + 1) % 2; // 在0和1之间切换
  return;
}
// 在场景 5 中，如果点击到按钮，跳转到场景6
if (currentScene === 4) {
  if (isMouseOverRect(scene5BtnNextRect)) { setScene(5); return; }
  // 否则切换对话
  scene5DialogueState = (scene5DialogueState + 1) % 2; // 在0和1之间切换
  return;
}
// 在场景 8 中，如果点击到按钮，跳转到场景9
if (currentScene === 7) {
  if (isMouseOverRect(scene8BtnNextRect)) { setScene(8); return; }
  // 否则切换对话
  scene8DialogueState = (scene8DialogueState + 1) % 2; // 在0和1之间切换
  return;
}
// 在场景 10 中，如果点击到按钮，跳转到相应场景
if (currentScene === 9) {
  if (isMouseOverRect(scene10BtnMathRect)) { 
    // 跳转到scene11
    setScene(10);
    return; 
  }
  if (isMouseOverRect(scene10BtnDreamRect)) { 
    // 跳转到scene12
    setScene(11);
    return; 
  }
  // 否则重新开始场景循环
  setScene(0);
  return;
}
// 在场景 11 中，点击跳回场景 1
if (currentScene === 10) {
  setScene(0);
  return;
}
// 在场景 12 中，点击跳回场景 1
if (currentScene === 11) {
  setScene(0);
  return;
}
// 其他情况：点击则顺序切换场景（0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 0）
advanceScene();
}
function keyPressed() {
if (key === ' ' || keyCode === ENTER) {
  if (getAudioContext && getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
  advanceScene();
}
}
function windowResized() { resizeCanvas(windowWidth, windowHeight); }


// —— 场景跳转（按顺序循环）——
function advanceScene() {
setScene((currentScene + 1) % 12);
}

function setScene(next) {
const prev = currentScene;
currentScene = next;
// 进入 Scene 3 时播放音乐
if (currentScene === 2) {
  playPaintingMusic();
}
// 离开 Scene 3 时停止音乐
if (prev === 2 && currentScene !== 2) {
  stopPaintingMusic();
}
}

function playPaintingMusic() {
if (!paintingMusic) return;
// 如果已经在播放，避免重复叠加
if (paintingMusic.isPlaying()) return;
paintingMusic.setLoop(true);
paintingMusic.setVolume(0.6);
paintingMusic.play();
}

function stopPaintingMusic() {
 if (!paintingMusic) return;
 if (paintingMusic.isPlaying()) {
   paintingMusic.stop();
 }
}


// 绘制主人公形象
function drawCharacter() {
    // 主人公位置
    const charX = width/2;
    const charY = height/2;
    const charSize = 500;
      
    // 如果图片加载成功，使用图片
    if (imgHero1) {
        image(imgHero1, charX - charSize/2, charY - charSize/2, charSize, charSize/7*10);
    }
    
}

// 绘制Scene2中的主人公（使用hero2图片）
function drawCharacterScene2() {
    // 主人公位置
    const charX = width/2;
    const charY = height/2;
    const charSize = 440;
      
    // 如果图片加载成功，使用hero2图片
    if (imgHero2) {
        image(imgHero2, charX - charSize/2, charY - charSize/2, charSize, charSize/7*10);
    }
    
}

// 绘制Scene4中的主人公（使用hero3图片）
function drawCharacterScene4Hero3() {
    // 主人公位置（在左侧）
    const charX = width/2 - 200;
    const charY = height/2;
    const charSize = 480;
      
    // 如果图片加载成功，使用hero3图片
    if (imgHero3) {
        image(imgHero3, charX - charSize/2, charY - charSize/2, charSize, charSize/7*10);
    }
}

// 绘制Scene5中的主人公（使用hero4图片）
function drawCharacterScene5Hero4() {
    // 主人公位置（在左侧）
    const charX = width/2 - 200;
    const charY = height/2;
    const charSize = 500;
      
    // 如果图片加载成功，使用hero4图片
    if (imgHero4) {
        image(imgHero4, charX - charSize/2, charY - charSize/2, charSize, charSize/7*10);
    }
}

// 绘制Scene7中的主人公（使用hero5图片）
function drawCharacterScene7Hero5() {
    // 主人公位置（在画布中央）
    const charX = width/2;
    const charY = height/2;
    const charSize = 440;
      
    // 如果图片加载成功，使用hero5图片
    if (imgHero5) {
        image(imgHero5, charX - charSize/2, charY - charSize/2, charSize, charSize/7*10);
    }
}

// 绘制Scene10中的主人公（使用hero6图片）
function drawCharacterScene10Hero6() {
    // 主人公位置（在画布中央）
    const charX = width/2;
    const charY = height/2;
    const charSize = 460;
      
    // 如果图片加载成功，使用hero6图片
    if (imgHero6) {
        image(imgHero6, charX - charSize/2, charY - charSize/2, charSize, charSize/7*10);
    }
}

// 绘制Scene11中的主人公（使用hero7图片）
function drawCharacterScene11Hero7() {
    // 主人公位置（在画布中央）
    const charX = width/2;
    const charY = height/2;
    const charSize = 440;
      
    // 如果图片加载成功，使用hero7图片
    if (imgHero7) {
        image(imgHero7, charX - charSize/2, charY - charSize/2, charSize, charSize/7*10);
    }
}

// 绘制Scene12中的主人公（使用hero8图片）
function drawCharacterScene12Hero8() {
    // 主人公位置（在画布中央）
    const charX = width/2;
    const charY = height/2;
    const charSize = 460;
      
    // 如果图片加载成功，使用hero8图片
    if (imgHero8) {
        image(imgHero8, charX - charSize/2, charY - charSize/2, charSize, charSize/7*10);
    }
}

// 绘制dongzhiyuan角色
function drawDongzhiyuan() {
    // dongzhiyuan位置（在右侧）
    const charX = width/2 + 200;
    const charY = height/2;
    const charSize = 500;
    
    // 如果图片加载成功，使用图片
    if (imgDongzhiyuan) {
      image(imgDongzhiyuan, charX - charSize/2, charY - charSize/2, charSize, charSize/7*10);
    }
}

// 绘制Scene4中的主人公（左侧位置）
function drawCharacterScene4() {
    // 主人公位置（在左侧）
    const charX = width/2 - 200;
    const charY = height/2;
    const charSize = 500;
      
    // 如果图片加载成功，使用图片
    if (imgHero1) {
        image(imgHero1, charX - charSize/2, charY - charSize/2, charSize, charSize/7*10);
    }
}

// 绘制Scene5中的主人公（左侧位置）
function drawCharacterScene5() {
    // 主人公位置（在左侧）
    const charX = width/2 - 200;
    const charY = height/2;
    const charSize = 500;
      
    // 如果图片加载成功，使用图片
    if (imgHero1) {
        image(imgHero1, charX - charSize/2, charY - charSize/2, charSize, charSize/7*10);
    }
}

// 绘制wenwan角色
function drawWenwan() {
    // wenwan位置（在右侧）
    const charX = width/2 + 200;
    const charY = height/2;
    const charSize = 420;
    
    // 如果图片加载成功，使用图片
    if (imgWenwan) {
      image(imgWenwan, charX - charSize/2, charY - charSize/2, charSize, charSize/7*10);
    }
}

// 绘制mathTeacher角色
function drawMathTeacher() {
    // mathTeacher位置（在画布中央）
    const charX = width/2;
    const charY = height/2;
    const charSize = 460;
    
    // 如果图片加载成功，使用图片
    if (imgMathTeacher) {
      image(imgMathTeacher, charX - charSize/2, charY - charSize/2, charSize, charSize/7*10);
    }
}

// 绘制Scene8中的主人公（左侧位置）
function drawCharacterScene8() {
    // 主人公位置（在左侧）
    const charX = width/2 - 200;
    const charY = height/2;
    const charSize = 500;
      
    // 如果图片加载成功，使用图片
    if (imgHero1) {
        image(imgHero1, charX - charSize/2, charY - charSize/2, charSize, charSize/7*10);
    }
}

// 绘制artTeacher角色
function drawArtTeacher() {
    // artTeacher位置（在右侧）
    const charX = width/2 + 200;
    const charY = height/2;
    const charSize = 500;
    
    // 如果图片加载成功，使用图片
    if (imgArtTeacher) {
      image(imgArtTeacher, charX - charSize/2, charY - charSize/2, charSize, charSize/7*10);
    }
}

// 绘制Scene9中的artTeacher（中央位置）
function drawArtTeacherScene9() {
    // artTeacher位置（在画布中央）
    const charX = width/2;
    const charY = height/2;
    const charSize = 500;
    
    // 如果图片加载成功，使用图片
    if (imgArtTeacher) {
      image(imgArtTeacher, charX - charSize/2, charY - charSize/2, charSize, charSize/7*10);
    }
}

// 绘制对话气泡
function drawSpeechBubble1() {
const bubbleX = width/2 + 150;
const bubbleY = height/2 - 50;
const bubbleWidth = 200;
const bubbleHeight = 100;
  
// 气泡主体
fill(255);
stroke(0);
strokeWeight(2);
rect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 15);
  
// 气泡尾巴（指向主人公）
fill(255);
stroke(0);
strokeWeight(2);
triangle(
bubbleX - 20, bubbleY + bubbleHeight/2,
bubbleX - 10, bubbleY + bubbleHeight/2 - 10,
bubbleX - 10, bubbleY + bubbleHeight/2 + 10
);
  
// 气泡内的文字
fill(0);
noStroke();
textAlign(LEFT, TOP);
textSize(16);
textWrap(WORD);
text(dialogue1, bubbleX + 15, bubbleY + 15, bubbleWidth - 30, bubbleHeight - 30);
}

function drawSpeechBubble2() {
  const bubbleX = width/2 + 150;
  const bubbleY = height/2 - 50;
  const bubbleWidth = 200;
  const bubbleHeight = 100;
    
  // 气泡主体
  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 15);
    
  // 气泡尾巴（指向主人公）
  fill(255);
  stroke(0);
  strokeWeight(2);
  triangle(
  bubbleX - 20, bubbleY + bubbleHeight/2,
  bubbleX - 10, bubbleY + bubbleHeight/2 - 10,
  bubbleX - 10, bubbleY + bubbleHeight/2 + 10
  );
    
  // 气泡内的文字
  fill(0);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(16);
  textWrap(WORD);
  text(dialogue2, bubbleX + 15, bubbleY + 15, bubbleWidth - 30, bubbleHeight - 20);
  }

// 绘制Scene4的对话气泡
function drawScene4Dialogue() {
  const bubbleWidth = 250;
  const bubbleHeight = 80;
  
  if (scene4DialogueState === 0) {
    // dongzhiyuan说话 - 气泡在右侧（指向dongzhiyuan）
    const bubbleX = width/2 + 350;
    const bubbleY = height/2 - 100;
    
    // 气泡主体
    fill(255);
    stroke(0);
    strokeWeight(2);
    rect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 15);
    
    // 气泡尾巴（指向dongzhiyuan）
    fill(255);
    stroke(0);
    strokeWeight(2);
    triangle(
      bubbleX - 20, bubbleY + bubbleHeight/2,
      bubbleX - 10, bubbleY + bubbleHeight/2 - 10,
      bubbleX - 10, bubbleY + bubbleHeight/2 + 10
    );
    
    // 气泡内的文字
    fill(0);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(16);
    textWrap(WORD);
    text(scene4Dialogues[0], bubbleX + 15, bubbleY + 15, bubbleWidth - 30, bubbleHeight - 20);
    
  } else {
    // 主角说话 - 气泡在左侧（指向主人公）
    const bubbleX = width/2 - 550;
    const bubbleY = height/2 - 100;
    
    // 气泡主体
    fill(255);
    stroke(0);
    strokeWeight(2);
    rect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 15);
    
    // 气泡尾巴（指向主人公）
    fill(255);
    stroke(0);
    strokeWeight(2);
    triangle(
      bubbleX + bubbleWidth + 10, bubbleY + bubbleHeight/2,
      bubbleX + bubbleWidth, bubbleY + bubbleHeight/2 - 10,
      bubbleX + bubbleWidth, bubbleY + bubbleHeight/2 + 10
    );
    
    // 气泡内的文字
    fill(0);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(16);
    textWrap(WORD);
    text(scene4Dialogues[1], bubbleX + 15, bubbleY + 15, bubbleWidth - 30, bubbleHeight - 20);
  }
}

// 绘制Scene4的跳转按钮
function drawScene4Button() {
  const btnW = 200;
  const btnH = 50;
  const x = width/2 - btnW/2;
  const y = height - 100;
  
  drawButton(x, y, btnW, btnH, 'Enter the classroom');
  scene4BtnNextRect = { x, y, w: btnW, h: btnH };
}

// 绘制Scene5的跳转按钮
function drawScene5Button() {
  const btnW = 200;
  const btnH = 50;
  const x = width/2 - btnW/2;
  const y = height - 100;
  
  drawButton(x, y, btnW, btnH, 'The math teacher comes');
  scene5BtnNextRect = { x, y, w: btnW, h: btnH };
}

// 绘制Scene8的跳转按钮
function drawScene8Button() {
  const btnW = 200;
  const btnH = 50;
  const x = width/2 - btnW/2;
  const y = height - 100;
  
  drawButton(x, y, btnW, btnH, 'Meet Qin Ming');
  scene8BtnNextRect = { x, y, w: btnW, h: btnH };
}

// 绘制Scene10的两个按钮
function drawScene10Buttons() {
  const btnW = 180;
  const btnH = 50;
  const gap = 20;
  const totalW = btnW * 2 + gap;
  const startX = width/2 - totalW/2;
  const y = height - 100;

  // Change Math Score 按钮
  const mathX = startX;
  drawButton(mathX, y, btnW, btnH, 'Change Math Score');
  scene10BtnMathRect = { x: mathX, y, w: btnW, h: btnH };

  // Draw Big Dream 按钮
  const dreamX = startX + btnW + gap;
  drawButton(dreamX, y, btnW, btnH, 'Draw Big Dream');
  scene10BtnDreamRect = { x: dreamX, y, w: btnW, h: btnH };
}

// 绘制Scene5的对话气泡
function drawScene5Dialogue() {
  const bubbleWidth = 250;
  const bubbleHeight = 80;
  
  if (scene5DialogueState === 0) {
    // wenwan说话 - 气泡在右侧（指向wenwan）
    const bubbleX = width/2 + 350;
    const bubbleY = height/2 - 100;
    
    // 气泡主体
    fill(255);
    stroke(0);
    strokeWeight(2);
    rect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 15);
    
    // 气泡尾巴（指向wenwan）
    fill(255);
    stroke(0);
    strokeWeight(2);
    triangle(
      bubbleX - 20, bubbleY + bubbleHeight/2,
      bubbleX - 10, bubbleY + bubbleHeight/2 - 10,
      bubbleX - 10, bubbleY + bubbleHeight/2 + 10
    );
    
    // 气泡内的文字
    fill(0);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(16);
    textWrap(WORD);
    text(scene5Dialogues[0], bubbleX + 15, bubbleY + 15, bubbleWidth - 30, bubbleHeight - 20);
    
  } else {
    // 主角说话 - 气泡在左侧（指向主人公）
    const bubbleX = width/2 - 550;
    const bubbleY = height/2 - 100;
    
    // 气泡主体
    fill(255);
    stroke(0);
    strokeWeight(2);
    rect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 15);
    
    // 气泡尾巴（指向主人公）
    fill(255);
    stroke(0);
    strokeWeight(2);
    triangle(
      bubbleX + bubbleWidth + 10, bubbleY + bubbleHeight/2,
      bubbleX + bubbleWidth, bubbleY + bubbleHeight/2 - 10,
      bubbleX + bubbleWidth, bubbleY + bubbleHeight/2 + 10
    );
    
    // 气泡内的文字
    fill(0);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(16);
    textWrap(WORD);
    text(scene5Dialogues[1], bubbleX + 15, bubbleY + 15, bubbleWidth - 30, bubbleHeight - 20);
  }
}

// 绘制Scene6的对话气泡
function drawScene6Dialogue() {
  const bubbleX = width/2 + 150;
  const bubbleY = height/2 - 50;
  const bubbleWidth = 200;
  const bubbleHeight = 100;
  
  // 气泡主体
  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 15);
  
  // 气泡尾巴（指向mathTeacher）
  fill(255);
  stroke(0);
  strokeWeight(2);
  triangle(
    bubbleX - 20, bubbleY + bubbleHeight/2,
    bubbleX - 10, bubbleY + bubbleHeight/2 - 10,
    bubbleX - 10, bubbleY + bubbleHeight/2 + 10
  );
  
  // 气泡内的文字
  fill(0);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(16);
  textWrap(WORD);
  text(scene6Dialogue, bubbleX + 15, bubbleY + 15, bubbleWidth - 30, bubbleHeight - 20);
}

// 绘制Scene7的对话气泡
function drawScene7Dialogue() {
  const bubbleX = width/2 + 150;
  const bubbleY = height/2 - 50;
  const bubbleWidth = 200;
  const bubbleHeight = 100;
  
  // 气泡主体
  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 15);
  
  // 气泡尾巴（指向主人公）
  fill(255);
  stroke(0);
  strokeWeight(2);
  triangle(
    bubbleX - 20, bubbleY + bubbleHeight/2,
    bubbleX - 10, bubbleY + bubbleHeight/2 - 10,
    bubbleX - 10, bubbleY + bubbleHeight/2 + 10
  );
  
  // 气泡内的文字
  fill(0);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(16);
  textWrap(WORD);
  text(scene7Dialogue, bubbleX + 15, bubbleY + 15, bubbleWidth - 30, bubbleHeight - 30);
}

// 绘制Scene8的对话气泡
function drawScene8Dialogue() {
  const bubbleWidth = 250;
  const bubbleHeight = 80;
  
  if (scene8DialogueState === 0) {
    // artTeacher说话 - 气泡在右侧（指向artTeacher）
    const bubbleX = width/2 + 350;
    const bubbleY = height/2 - 100;
    
    // 气泡主体
    fill(255);
    stroke(0);
    strokeWeight(2);
    rect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 15);
    
    // 气泡尾巴（指向artTeacher）
    fill(255);
    stroke(0);
    strokeWeight(2);
    triangle(
      bubbleX - 20, bubbleY + bubbleHeight/2,
      bubbleX - 10, bubbleY + bubbleHeight/2 - 10,
      bubbleX - 10, bubbleY + bubbleHeight/2 + 10
    );
    
    // 气泡内的文字
    fill(0);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(16);
    textWrap(WORD);
    text(scene8Dialogues[0], bubbleX + 15, bubbleY + 15, bubbleWidth - 30, bubbleHeight - 20);
    
  } else {
    // 主角说话 - 气泡在左侧（指向主人公）
    const bubbleX = width/2 - 550;
    const bubbleY = height/2 - 100;
    
    // 气泡主体
    fill(255);
    stroke(0);
    strokeWeight(2);
    rect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 15);
    
    // 气泡尾巴（指向主人公）
    fill(255);
    stroke(0);
    strokeWeight(2);
    triangle(
      bubbleX + bubbleWidth + 10, bubbleY + bubbleHeight/2,
      bubbleX + bubbleWidth, bubbleY + bubbleHeight/2 - 10,
      bubbleX + bubbleWidth, bubbleY + bubbleHeight/2 + 10
    );
    
    // 气泡内的文字
    fill(0);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(16);
    textWrap(WORD);
    text(scene8Dialogues[1], bubbleX + 15, bubbleY + 15, bubbleWidth - 30, bubbleHeight - 20);
  }
}

// 绘制Scene9的对话气泡
function drawScene9Dialogue() {
  const bubbleX = width/2 + 150;
  const bubbleY = height/2 - 50;
  const bubbleWidth = 230;
  const bubbleHeight = 110;
  
  // 气泡主体
  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 15);
  
  // 气泡尾巴（指向artTeacher）
  fill(255);
  stroke(0);
  strokeWeight(2);
  triangle(
    bubbleX - 20, bubbleY + bubbleHeight/2,
    bubbleX - 10, bubbleY + bubbleHeight/2 - 10,
    bubbleX - 10, bubbleY + bubbleHeight/2 + 10
  );
  
  // 气泡内的文字
  fill(0);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(16);
  textWrap(WORD);
  text(scene9Dialogue, bubbleX + 15, bubbleY + 15, bubbleWidth - 30, bubbleHeight - 30);
}

// 绘制Scene10的对话气泡
function drawScene10Dialogue() {
  const bubbleX = width/2 + 150;
  const bubbleY = height/2 - 50;
  const bubbleWidth = 200;
  const bubbleHeight = 100;
  
  // 气泡主体
  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 15);
  
  // 气泡尾巴（指向主人公）
  fill(255);
  stroke(0);
  strokeWeight(2);
  triangle(
    bubbleX - 20, bubbleY + bubbleHeight/2,
    bubbleX - 10, bubbleY + bubbleHeight/2 - 10,
    bubbleX - 10, bubbleY + bubbleHeight/2 + 10
  );
  
  // 气泡内的文字
  fill(0);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(16);
  textWrap(WORD);
  text(scene10Dialogue, bubbleX + 15, bubbleY + 15, bubbleWidth - 20, bubbleHeight - 20);
}

// 绘制Scene11的对话气泡
function drawScene11Dialogue() {
  const bubbleX = width/2 + 150;
  const bubbleY = height/2 - 50;
  const bubbleWidth = 200;
  const bubbleHeight = 100;
  
  // 气泡主体
  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 15);
  
  // 气泡尾巴（指向主人公）
  fill(255);
  stroke(0);
  strokeWeight(2);
  triangle(
    bubbleX - 20, bubbleY + bubbleHeight/2,
    bubbleX - 10, bubbleY + bubbleHeight/2 - 10,
    bubbleX - 10, bubbleY + bubbleHeight/2 + 10
  );
  
  // 气泡内的文字
  fill(0);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(16);
  textWrap(WORD);
  text(scene11Dialogue, bubbleX + 15, bubbleY + 15, bubbleWidth - 30, bubbleHeight - 30);
}

// 绘制Scene12的对话气泡
function drawScene12Dialogue() {
  const bubbleX = width/2 + 150;
  const bubbleY = height/2 - 50;
  const bubbleWidth = 200;
  const bubbleHeight = 100;
  
  // 气泡主体
  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 15);
  
  // 气泡尾巴（指向主人公）
  fill(255);
  stroke(0);
  strokeWeight(2);
  triangle(
    bubbleX - 20, bubbleY + bubbleHeight/2,
    bubbleX - 10, bubbleY + bubbleHeight/2 - 10,
    bubbleX - 10, bubbleY + bubbleHeight/2 + 10
  );
  
  // 气泡内的文字
  fill(0);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(16);
  textWrap(WORD);
  text(scene12Dialogue, bubbleX + 15, bubbleY + 15, bubbleWidth - 30, bubbleHeight - 30);
}

function drawPainting() {
  const baseX = width/2 - 550;
  const baseY = height/2 - 50;
  const baseW = 320;
  const baseH = 220;

  // 悬停放大：仅在场景 2 中对鼠标悬停生效
  let scale = 1.0;
  const hover = (currentScene === 1) && pointInRect(mouseX, mouseY, baseX, baseY, baseW, baseH);
  if (hover) scale = 1.15; // 放大 15%

  // 以中心点为基准进行缩放，保持视觉稳定
  const centerX = baseX + baseW / 2;
  const centerY = baseY + baseH / 2;
  const drawW = baseW * scale;
  const drawH = baseH * scale;
  const drawX = centerX - drawW / 2;
  const drawY = centerY - drawH / 2;

  if (imgPainting) {
    image(imgPainting, drawX, drawY, drawW, drawH);
  }

  // 高亮边框便于反馈
  if (hover) {
    noFill();
    stroke(255, 255, 255, 180);
    strokeWeight(2);
    rect(drawX, drawY, drawW, drawH, 6);
  }

  // 记录绘制区域，用于点击检测
  lastPaintingRect = { x: drawX, y: drawY, w: drawW, h: drawH };
}

function drawScene3Buttons() {
  const btnW = 180;
  const btnH = 48;
  const gap = 24;
  const totalW = btnW * 2 + gap;
  const startX = width/2 - totalW/2;
  const y = height - 120;

  // Back to Scene 2
  const backX = startX;
  drawButton(backX, y, btnW, btnH, 'Back to Subway Station');
  scene3BtnBackRect = { x: backX, y, w: btnW, h: btnH };

  // Go to Scene 4
  const nextX = startX + btnW + gap;
  drawButton(nextX, y, btnW, btnH, 'Go to School');
  scene3BtnNextRect = { x: nextX, y, w: btnW, h: btnH };
}

function drawButton(x, y, w, h, label) {
  const hover = pointInRect(mouseX, mouseY, x, y, w, h);
  noStroke();
  fill(hover ? 255 : 240, hover ? 200 : 240, 0, 220);
  rect(x, y, w, h, 8);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(16);
  text(label, x + w/2, y + h/2);
}

function isMouseOverPainting() {
  if (!lastPaintingRect) return false;
  return pointInRect(mouseX, mouseY, lastPaintingRect.x, lastPaintingRect.y, lastPaintingRect.w, lastPaintingRect.h);
}

function isMouseOverRect(rect) {
  if (!rect) return false;
  return pointInRect(mouseX, mouseY, rect.x, rect.y, rect.w, rect.h);
}

function pointInRect(px, py, rx, ry, rw, rh) {
  return px >= rx && px <= rx + rw && py >= ry && py <= ry + rh;
}

// —— 文本工具：把文字画在画布中心附近 ——
function drawCenteredText(txt, size, dy) {
fill(255);
noStroke();
textAlign(CENTER, CENTER);
textSize(size);
text(txt, width/2, height/2 + dy);
}