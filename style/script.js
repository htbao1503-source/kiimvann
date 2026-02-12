// ===== Canvas full màn hình =====
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
document.getElementById("credit").classList.add("show");


function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);


const countdownEl = document.getElementById("countdown");
const nameEl = document.getElementById("newyear");

let count = 3;
nameEl.style.opacity = 0;

// ⭐ HIỆN SỐ NGAY KHI LOAD
showNumber();

const countdownInterval = setInterval(() => {
  count--;

  if (count <= 0) {
    clearInterval(countdownInterval);
    countdownEl.textContent = "";

    nameEl.style.opacity = 1;

    setTimeout(() => {
      nameEl.style.opacity = 0;
      setTimeout(() => {
        startFireworks();
        setInterval(createFloatingImage, 1200);
      }, 2000);
    }, 1300);

    return;
  }

  showNumber();
}, 1000);


// ===== hàm hiển thị số + animation =====
function showNumber() {
  countdownEl.textContent = count;

  countdownEl.style.animation = "none";
  countdownEl.offsetHeight; // reset animation
  countdownEl.style.animation = "countdownPop 1s ease";
}


// ==== Trái tim bay (chậm hơn) ====
function createHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.left = Math.random() * window.innerWidth + 'px';
  heart.style.top = window.innerHeight + 'px';
  document.body.appendChild(heart);

  let y = window.innerHeight;
  const speed = 0.5 + Math.random() * 1; // giảm tốc độ (trước: 1~3)
  const amplitude = Math.random() * 20; // giảm lắc lư

  function move() {
    y -= speed;
    const x = parseFloat(heart.style.left) + Math.sin((window.innerHeight - y) / 100) * amplitude;
    heart.style.top = y + 'px';
    heart.style.left = x + 'px';
    if (y + 20 > 0) requestAnimationFrame(move);
    else heart.remove();
  }
  move();
}

// Tạo trái tim chậm hơn, khoảng cách 600ms thay vì 300ms
setInterval(createHeart, 600);

// ===== Pháo hoa đơn giản nhiều màu =====
const fireworks = [];
const colors = ["yellow", "#FF4DA6", "#00FFFF", "#FF8C00", "#ADFF2F", "#FFFF00"]; // danh sách màu

function createFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;
  const color = colors[Math.floor(Math.random() * colors.length)]; // màu cho pháo bông này
  const particles = [];

  for (let i = 0; i < 50; i++) {
    particles.push({
      x,
      y,
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 4 + 1,
      life: 100,
      color // gán màu cho từng particle
    });
  }

  fireworks.push(particles);
}

function updateFireworks() {
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((particles, index) => {
    particles.forEach(p => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.life--;

      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = p.color; // dùng màu riêng của pháo bông
      ctx.fill();
    });

    fireworks[index] = particles.filter(p => p.life > 0);
  });

  requestAnimationFrame(updateFireworks);
}

const phrases = [
    "Mãi bên nhau bạn nhé", 
    "Ăn mau chóng lớn",
    "Happy New Year 2026", 
    "Forever and Always",
    "Năm mới hạnh phúc",
    "Ngày càng xinh đẹp",
    "Ngày càng giỏi giang",
    "Học tập tiến bộ",
    'Giữ gìn sức khoẻ',
    'Không được bỏ bữa sáng nhé!',
    'Ăn uống lành mạnh nè!',
    'Đeo khẩu trang vào nè!',
    'Ngủ sớm nè!',
    '❤️Kiim Vânn🖇️',
    'Mang áo khoác vào nha!'
];

const textColors = [
  "#00FFFF", // cyan neon
  "#FFD700", // vàng neon
  "#7CFC00", // xanh lá neon
  "#FF8C00", // cam neon
  "#FFFFFF",  // trắng neon
  "#ff4da6"  // hồng neon
];

function createText() {
    const container = document.getElementById('galaxy');
    const textElement = document.createElement('div');

    textElement.className = 'floating-text';
    textElement.innerText = phrases[Math.floor(Math.random() * phrases.length)];

    // 👇 chỉ đổi màu chữ
    textElement.style.color = textColors[Math.floor(Math.random() * textColors.length)];

    const randomLeft = Math.floor(Math.random() * 90);
    textElement.style.left = randomLeft + '%';

    const duration = Math.random() * 5 + 5;
    textElement.style.animationDuration = duration + 's';

    container.appendChild(textElement);

    setTimeout(() => textElement.remove(), duration * 1000);
}


function startFireworks() {
  const intro = document.getElementById("intro");

  intro.style.opacity = "0";   // mờ dần
  setTimeout(() => {
    intro.style.display = "none"; // biến mất hoàn toàn
  }, 1000);

  document.getElementById("stars").classList.add("active");

  fireworkInterval = setInterval(createFirework, 800);
  textInterval = setInterval(createText, 1500);
  shootingStarInterval = setInterval(createShootingStar, 3000);

  updateFireworks();
}

function createShootingStar() {
  const star = document.createElement("div");
  star.className = "shooting-star";

  // vị trí xuất phát ngẫu nhiên
  const startX = Math.random() * window.innerWidth;
  const startY = Math.random() * window.innerHeight * 0.3;

  star.style.left = startX + "px";
  star.style.top = startY + "px";

  // gán góc random
  const angle = Math.random() * 40 + 20; // 20-60 độ
  star.style.setProperty("--angle", angle + "deg");

  document.body.appendChild(star);

  setTimeout(() => star.remove(), 1600); // thời gian sao băng bay
}


const images = [
    'images/z7518901751394_2e382adfdb68dca184bd732856eefff8.png',
    'images/z7518901752387_3bf78880e47af3127a3d2e1eb790a2f3.png',
    'images/z7518901753061_017a951c6f768100f6116a6bc712c062.png',
    'images/z7518901757129_a080e580934be23a8c89d0ac24f9d3ee.png',
    'images/z7518901777272_4bcd29fca611a8b3efff836f8d95250c.png',
    'images/z7518901778797_4a0ac32300f3629c01332c8da7e35446.png',
    'images/z7518901781828_b399b2eac61de2255e1db8a04176f9dd.png',
    'images/626667293_1947702186128729_1767569472487154942_n.png.jpg',
    'images/629272313_2152311945607520_8296836550637783513_n.png.jpg',
    'images/614572165_866621676350031_1287008756117070477_n.jpg',
    'images/616034791_1418015956782166_6432417055432132642_n.jpg',
    'images/619555883_1199009858579359_5670282128256793083_n.jpg',
    'images/621173001_25684093271250665_6087658563615206109_n.jpg',
    'images/625354178_1230667039231545_1580582787385830312_n.jpg',
    'images/626765909_2431108314017761_819527911687467788_n.jpg',
    'images/627476347_883966154520876_3715911465141005561_n.jpg',
    'images/z7529132887924_5d32344ee0217871bdbec6185fbf9b64.jpg',
    'images/z7529135330198_c2af812a424ec8b10a49cd2622048962.png',
    'images/z7529136028962_1a431f4f0d483cd94483aab84b263ea1.jpg'
];

function createFloatingImage() {
    const container = document.getElementById('floating-images');
    
    const img = document.createElement('img');
    img.src = images[Math.floor(Math.random() * images.length)]; // chọn ngẫu nhiên 1 hình
    img.className = 'floating-image';

    // vị trí xuất hiện ngẫu nhiên
    img.style.left = Math.random() * 90 + '%';

    // tốc độ bay ngẫu nhiên (5-10s)
    const duration = Math.random() * 5 + 5;
    img.style.animationDuration = duration + 's';

    container.appendChild(img);

    // xóa khi kết thúc animation
    setTimeout(() => img.remove(), duration * 1000);
}

const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");

let isPlaying = false;

musicBtn.addEventListener("click", (e) => {
  e.stopPropagation(); // 🔥 chặn click lan ra document

  if (isPlaying) {
    music.pause();
    musicBtn.textContent = "🔇";
  } else {
    music.play().catch(()=>{});
    musicBtn.textContent = "🔊";
  }
  isPlaying = !isPlaying;
});

function startMusicOnce() {
  music.play().catch(() => {});
  isPlaying = true;
  musicBtn.textContent = "🔊";
  document.removeEventListener("click", startMusicOnce);
}

document.addEventListener("click", startMusicOnce);


