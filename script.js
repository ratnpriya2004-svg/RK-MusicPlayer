// 🎵 RK MUSIC PLAYER - COMPLETE WORKING VERSION
// 🎵 RK MUSIC PLAYER - 45+ HINDI SONGS VERSION
const songs = [
    // ORIGINAL 15 SONGS
    {title: "Let Me Down Slowly", artist: "Alec Benjamin", img: "/img/1.jpeg", audio: "/song/1.mp3"},
    {title: "Pardesiya", artist: "Arijit Singh", img: "/img/per.jpg", audio: "/song/2.mp3"},
    {title: "Poison Baby", artist: "Beyonce", img: "/img/2.jpg", audio: "/song/3.mp3"},
    {title: "Aawara Angara", artist: "Jubin Nautiyal", img: "/img/3.jpg", audio: "/song/4.mp3"},
    {title: "Tu Mera Main Tera", artist: "Neha Kakkar", img: "/img/4.jpg", audio: "/song/5.mp3"},
    {title: "V Kamleya", artist: "Arijit Singh", img: "/img/5.jpg", audio: "/song/6.mp3"},
    {title: "Tum Mera Na Hua", artist: "Jubin Nautiyal", img: "/img/6.jpg", audio: "/song/7.mp3"},
    {title: "Chiggy Wiggy", artist: "Sunidhi Chauhan", img: "/img/7.jpg", audio: "/song/8.mp3"},
    {title: "Kokaina", artist: "Phoenix", img: "/img/8.jpg", audio: "/song/9.mp3"},
    {title: "Lalala", artist: "Y2K", img: "/img/9.jpg", audio: "/song/10.mp3"},
   {title: "Tum Hi Ho", artist: "Arijit Singh", img: "/img/16.jpg", audio: "/song/t1.mp3"},

    {title: "Zaalim", artist: "Badshah,payal..", img: "/img/12.jpg", audio: "/song/11.mp3"},
    {title: "Door ho gya", artist: "Akhil sachdeva", img: "/img/13.jpg", audio: "/song/12.mp3"},
    {title: "Gehra hua", artist: "Jasleen Royal", img: "/img/14.jpg", audio: "/song/13.mp3"},
    {title: "Ghungroo 2", artist: "Tanishk Bagchi", img: "/img/15.jpg", audio: "/song/14.mp3"},
    {title: "Go baby", artist: "King", img: "/img/11.jpg", audio: "/song/15.mp3"},
    {title: "Ek gal ", artist: "Ali Sethi", img: "/img/17.jpg", audio: "/song/16.mp3"},
    {title: "ishq jalakar", artist: "G.V. Prakash", img: "/img/18.jpg", audio: "/song/17.mp3"},
    
    {title: "Jhum sharabi", artist: "Vishal Mishra", img: "/img/20.jpg", audio: "/song/19.mp3"},
    {title: "Jutti mutti ", artist: "Arijit Singh", img: "/img/21.jpg", audio: "/song/20.mp3"},
    {title: "Kiya ho rha y", artist: "Jubin Nautiyal", img: "/img/21.jpg", audio: "/song/21.mp3"},
    {title: "Mare jazbat", artist: "Sachin-Jigar", img: "/img/22.jpg", audio: "/song/22.mp3"},
    {title: "furr", artist: "Asim Riaz", img: "/img/23.jpg", audio: "/song/23.mp3"},
    {title: "Raat bhar", artist: "Arijit Singh", img: "/img/24.jpg", audio: "/song/24.mp3"},
    {title: "Sundara", artist: "Mohit Chauhan", img: "/img/25.jpg", audio: "/song/25.mp3"},
    

    {title: "Tera bn jaunga", artist: "Arijit Singh", img: "/img/26.jpg", audio: "/song/26.mp3"},
    
];




let currentSong = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

// 🔐 USER SYSTEM
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let isAdminLoggedIn = false;
const ADMIN_CREDENTIALS = { username: 'ratnpriya', password: 'rk123' };

// 🎵 DOM ELEMENTS
const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressFill = document.getElementById('progressFill');
const currentTimeEl = document.getElementById('currentTime');
const totalDurationEl = document.getElementById('totalDuration');
const currentTitle = document.getElementById('currentTitle');
const currentArtist = document.getElementById('currentArtist');
const currentCover = document.getElementById('currentCover');
const volumeSlider = document.getElementById('volumeSlider');
const playlistGrid = document.getElementById('playlistGrid');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');

// 🔥 MAIN INIT
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥 RK Music Player Loaded!');
    updateSongCount();
    loadSong(currentSong);
    setupMusicControls();
    setupUserSystem();
    createPlaylist();
    updateLoginButton();
    
    // 🔥 BULLETPROOF PLAYLIST TOGGLE
    // YE 10 LINE CODE - KUCH BHI HO JAYE KAAM KAREGA
document.getElementById('playlistToggleBtn').addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const grid = document.getElementById('playlistGrid');
    
    if (grid.classList.contains('playlist-visible')) {
        grid.classList.remove('playlist-visible');
        grid.classList.add('playlist-hidden');
        grid.style.display = 'none';
        this.innerHTML = '<i class="fas fa-list"></i> Show Playlist';
    } else {
        grid.classList.remove('playlist-hidden');
        grid.classList.add('playlist-visible');
        grid.style.display = 'grid';
        this.innerHTML = '<i class="fas fa-list-ul"></i> Hide Playlist';
    }
});

});


// 🎵 MUSIC FUNCTIONS
function loadSong(index) {
    if (!currentUser && index >= 0) {
        alert('🔐 First login here!');
        return;
    }
    const song = songs[index];
    audioPlayer.src = song.audio;
    currentTitle.textContent = song.title;
    currentArtist.textContent = song.artist;
    currentCover.src = song.img;
    document.title = `${song.title} - RK Music Player`;
    currentSong = index;
    updatePlaylistHighlight();
    audioPlayer.load();
}

function togglePlay() {
    if (!currentUser) {
        alert('🔐 LOGIN first!');
        document.getElementById('loginLink').click();
        return;
    }
    
    if (isPlaying) {
        audioPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        isPlaying = false;
    } else {
        audioPlayer.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        isPlaying = true;
    }
}

function nextSong() {
    if (!currentUser) {
        alert('🔐 LOGIN ZAROORI!');
        return;
    }
    currentSong = isShuffle ? Math.floor(Math.random() * songs.length) : (currentSong + 1) % songs.length;
    loadSong(currentSong);
    if (isPlaying) audioPlayer.play();
}

function prevSong() {
    if (!currentUser) {
        alert('🔐 LOGIN ZAROORI!');
        return;
    }
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    if (isPlaying) audioPlayer.play();
}

function updateProgress(e) {
    const {currentTime, duration} = e.srcElement;
    if (duration) {
        const progress = (currentTime / duration) * 100;
        progressFill.style.width = progress + '%';
        currentTimeEl.textContent = formatTime(currentTime);
    }
}

function updateTotalTime(e) {
    const duration = e.srcElement.duration;
    totalDurationEl.textContent = formatTime(duration);
}

function setProgress(e) {
    const progressBar = document.querySelector('.progress-bar');
    const width = progressBar.clientWidth;
    const clickX = e.offsetX;
    audioPlayer.currentTime = (clickX / width) * audioPlayer.duration;
}

function formatTime(time) {
    if (!time) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    shuffleBtn.style.background = isShuffle ? '#667eea' : 'rgba(255,255,255,0.1)';
}

function toggleRepeat() {
    isRepeat = !isRepeat;
    repeatBtn.style.background = isRepeat ? '#f5576c' : 'rgba(255,255,255,0.1)';
}

function updatePlaylistHighlight() {
    const songCards = document.querySelectorAll('.song-card');
    songCards.forEach((card, index) => {
        card.classList.toggle('active', index === currentSong);
    });
}

function createPlaylist() {
    if (!currentUser) {
        playlistGrid.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:4rem;color:#ff6b6b">
                <i class="fas fa-lock" style="font-size:4rem"></i>
                <h3>🔐 LOGIN first</h3>
                <p>Login ke baad 25+ songs suno!</p>
                <button class="btn-primary" onclick="document.getElementById('loginLink').click()">LOGIN</button>
            </div>
        `;
        return;
    }
    
    playlistGrid.innerHTML = songs.map((song, index) => `
        <div class="song-card compact-song" onclick="loadSong(${index}); togglePlay();">
            <div class="compact-song-info">
                <div class="song-title-compact">${song.title}</div>
                <div class="song-artist-compact">${song.artist}</div>
            </div>
            <i class="fas fa-play compact-play-icon"></i>
        </div>
    `).join('');
}

function updateSongCount() {
    document.getElementById('songCountDisplay').textContent = `(${songs.length} Songs)`;
}

function setupMusicControls() {
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    shuffleBtn.addEventListener('click', toggleShuffle);
    repeatBtn.addEventListener('click', toggleRepeat);
    
    document.querySelector('.progress-bar').addEventListener('click', setProgress);
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('loadedmetadata', updateTotalTime);
    audioPlayer.addEventListener('ended', nextSong);
    
    volumeSlider.addEventListener('input', function() {
        audioPlayer.volume = this.value / 100;
    });
}

// 🔐 USER SYSTEM
function setupUserSystem() {
    // Login button
    document.getElementById('loginLink').onclick = function(e) {
        e.preventDefault();
        toggleUserModal();
    };
    
    // Admin button
    document.getElementById('adminBtn').onclick = function() {
        document.getElementById('adminModal').style.display = 'flex';
    };
    
    // Close buttons
    document.getElementById('adminClose').onclick = closeAdminModal;
    document.getElementById('userClose').onclick = closeUserModal;
    
    // Click outside to close
    window.onclick = function(event) {
        if (event.target.id === 'adminModal') closeAdminModal();
        if (event.target.id === 'userLoginModal') closeUserModal();
    };
}

function updateLoginButton() {
    const loginText = document.getElementById('loginText');
    if (currentUser) {
        loginText.textContent = currentUser.username;
        loginText.parentElement.classList.add('active');
        createPlaylist(); // Refresh playlist after login
    } else {
        loginText.textContent = 'Login';
        loginText.parentElement.classList.remove('active');
        createPlaylist();
    }
}

function userRegister() {
    const username = document.getElementById('userUsername').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const password = document.getElementById('userPassword').value;
    
    if (!username || !email || !password || password.length < 4) {
        alert('❌ Sab fields fill karo! Password 4+ chars ka!');
        return;
    }
    
    if (users.find(u => u.username === username || u.email === email)) {
        alert('❌ User pehle se hai!');
        return;
    }
    
    const newUser = {
        id: Date.now(),
        username, email, password,
        loginTime: new Date().toLocaleString('en-IN'),
        isOnline: true
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('✅ Account has been created.Please login now!');
    document.getElementById('userLoginForm').querySelectorAll('input').forEach(i => i.value = '');
}

function userLogin() {
    const username = document.getElementById('userUsername').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const password = document.getElementById('userPassword').value;
    
    const user = users.find(u =>
        (u.username === username || u.email === email) && u.password === password
    );
    
    if (user) {
        currentUser = user;
        user.isOnline = true;
        user.loginTime = new Date().toLocaleString('en-IN');
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(user));
        showUserDashboard();
        updateLoginButton();
        closeUserModal();
        alert(`✅ Welcome ${user.username}! 🎵`);
    } else {
        alert('❌ Galat details! Try: test / test@email.com / 1234');
    }
}

function showUserDashboard() {
    document.getElementById('userLoginForm').style.display = 'none';
    document.getElementById('userDashboard').style.display = 'block';
    document.getElementById('userModalTitle').textContent = 'Dashboard';
    document.getElementById('userNameDisplay').textContent = currentUser.username;
    document.getElementById('userLoginTime').textContent = currentUser.loginTime;
}

function userLogout() {
    if (currentUser) {
        currentUser.isOnline = false;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.removeItem('currentUser');
        currentUser = null;
        updateLoginButton();
        toggleUserModal();
        alert('👋 Logout successful!');
    }
}

function toggleUserModal() {
    const modal = document.getElementById('userLoginModal');
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
    
    if (currentUser) {
        showUserDashboard();
    } else {
        document.getElementById('userLoginForm').style.display = 'block';
        document.getElementById('userDashboard').style.display = 'none';
    }
}

function adminLogin() {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        isAdminLoggedIn = true;
        document.getElementById('adminLoginForm').style.display = 'none';
        document.getElementById('adminDashboard').style.display = 'block';
        document.getElementById('adminTitle').textContent = 'Admin Dashboard';
        document.getElementById('adminNameDisplay').textContent = 'Ratnpriya';
        loadUsersTable();
    } else {
        alert('❌ Admin: ratnpriya / rk123');
    }
}

function loadUsersTable() {
    const tbody = document.getElementById('usersTableBody');
    const totalUsersEl = document.getElementById('totalUsers');
    const onlineUsersEl = document.getElementById('onlineUsers');
    
    tbody.innerHTML = '';
    const onlineCount = users.filter(u => u.isOnline).length;
    totalUsersEl.textContent = users.length;
    onlineUsersEl.textContent = onlineCount;
    
    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td title="${user.username || 'N/A'}">${user.username || 'N/A'}</td>
            <td title="${user.email || 'N/A'}">${user.email || 'N/A'}</td>
            <td title="${user.loginTime || 'Never'}">${user.loginTime || 'Never'}</td>
            <td>
                <span class="status-badge ${user.isOnline ? 'online' : 'offline'}">
                    ${user.isOnline ? '🟢 LIVE' : '🔴 OFF'}
                </span>
            </td>
            <td>
                <button class="btn-kick btn-sm" onclick="kickUser(${user.id})" 
                        ${user.isOnline ? '' : 'disabled'}>
                    ${user.isOnline ? '🚫 Kick' : '⚪'}
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function kickUser(userId) {
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        users[userIndex].isOnline = false;
        localStorage.setItem('users', JSON.stringify(users));
        loadUsersTable();
        alert('👢 User kicked!');
    }
}

function closeAdminModal() { document.getElementById('adminModal').style.display = 'none'; }
function closeUserModal() { document.getElementById('userLoginModal').style.display = 'none'; }

// GLOBAL FUNCTIONS FOR HTML onclick
window.startPlayer = function() {
    document.getElementById('player').scrollIntoView({behavior: 'smooth'});
    setTimeout(() => {
        if (currentUser) togglePlay();
        else document.getElementById('loginLink').click();
    }, 500);
};

window.scrollToPlaylist = function() {
    document.getElementById('playlist').scrollIntoView({behavior: 'smooth'});
};

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
    }
    if (e.key === 'Escape') {
        closeAdminModal();
        closeUserModal();
    }
});
// YE 5 LINE CODE PURA REPLACE KARO - कहीं भी script में add कर दो

