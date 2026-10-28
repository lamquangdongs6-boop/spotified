// Kiểm tra email hợp lệ
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Kiểm tra mật khẩu đăng ký
function validateRegister(pass, confirm) {
  if (pass.length < 6) {
    alert("Mật khẩu phải có ít nhất 6 ký tự!");
    return false;
  }
  if (pass !== confirm) {
    alert("Mật khẩu xác nhận không khớp!");
    return false;
  }
  return true;
}

document.addEventListener("DOMContentLoaded", () => {
  // Đăng ký email
  // Đăng ký email
  const registerEmailBtn = document.querySelector("#registerEmailBtn");
  if (registerEmailBtn) {
    registerEmailBtn.addEventListener("click", (e) => {
      const email = document.querySelector("#registerEmail").value;
      if (!validateEmail(email)) {
        e.preventDefault();
        alert("Email không hợp lệ!");
      } else if (localStorage.getItem("userEmail") === email) {
        e.preventDefault();
        alert("Email này đã được đăng ký!");
      } else {
        // Lưu email tạm để sang DK1
        localStorage.setItem("tempEmail", email);
      }
    });
  }

  // Đăng ký mật khẩu
  const registerBtn = document.querySelector("#registerBtn");
  if (registerBtn) {
    registerBtn.addEventListener("click", (e) => {
      const pass = document.querySelector("#password").value;
      const confirm = document.querySelector("#confirmPassword").value;
      const email = localStorage.getItem("tempEmail"); // lấy email tạm

      if (!validateRegister(pass, confirm)) {
        e.preventDefault();
      } else {
        // Lưu email + mật khẩu chính thức
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", pass);
        alert("Đăng ký thành công!");
        window.location.href = "Index.html";
      }
    });
  }

  // Đăng nhập email (trangDN.html)
  const loginEmailBtn = document.querySelector("#loginEmailBtn");
  if (loginEmailBtn) {
    loginEmailBtn.addEventListener("click", (e) => {
      const email = document.querySelector("#loginEmail").value;
      if (localStorage.getItem("userEmail") !== email) {
        e.preventDefault();
        alert("Email chưa được đăng ký!");
      } else {
        localStorage.setItem("tempLoginEmail", email);
      }
    });
  }

  // Đăng nhập mật khẩu (trangDN1.html)
  const loginBtn = document.querySelector("#loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
      const pass = document.querySelector("#loginPassword").value;
      const savedPass = localStorage.getItem("userPassword");
      if (pass !== savedPass) {
        e.preventDefault();
        alert("Mật khẩu không đúng!");
      } else {
        alert("Đăng nhập thành công!");
        window.location.href = "Index.html";
      }
    });
  }
});

const MUSIC_API_BASE = "https://api.musicapi.com";

// Thay bằng Client ID của bạn trên MusicAPI Dashboard
const MUSIC_API_CLIENT_ID = "5c2ab6b0-cd14-471b-868e-3b3e7cd9a479";

async function checkMusicAPI() {
  try {
    const response = await fetch(
      `${"https://api.musicapi.com"}/search/introspection`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${"5c2ab6b0-cd14-471b-868e-3b3e7cd9a479"}`,
          "Content-Type": "application/json; charset=utf-8",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("MusicAPI response:", data);

    return data;
  } catch (error) {
    console.error("Không thể gọi MusicAPI:", error);
    throw error;
  }
}

checkMusicAPI();

async function searchMusic(songName) {
  try {
    const response = await fetch("https://api.musicapi.com/public/search", {
      method: "POST",
      headers: {
        Authorization: "Token 5c2ab6b0-cd14-471b-868e-3b3e7cd9a479",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "track",
        track: "Numb",
        artist: "Linkin Park",
        sources: ["spotify", "appleMusic"],
      }),
    });

    console.log("Status:", response.status);
    console.log("Response:", await response.text());

    const data = await response.json();

    console.log("Dữ liệu MusicAPI:", data);

    return data;
  } catch (error) {
    console.error("Lỗi gọi API:", error);
  }
}

searchMusic("Numb");
