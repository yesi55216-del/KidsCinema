// =========================================
// 🎬 KIDS CINEMA - FINAL LOGIC SCRIPT
// =========================================

$(function(){
  
  // --- 1. DATABASE FILM (Mock Data) ---
const MOVIES = [
        {
          id: 'm1',
          title: 'Tangled',
          genre: 'Adventure • Musical',
          rating: 4.8,
          poster: 'img/Tangled.jpg',
          synopsis: 'The magically long-haired Rapunzel has spent her entire life in a tower, but now that a runaway thief has stumbled upon her, she is about to discover the world for the first time.'
        },
        {
          id: 'm2',
          title: 'Moana',
          genre: 'Adventure • Fantasy',
          rating: 4.9,
          poster: 'img/Moana.jpg',
          synopsis: 'In Ancient Polynesia, a terrible curse incurs the displeasure of the Demigod Maui. Moana answers the Ocean\'s call to seek out the Demigod to set things right.'
        },
        {
          id: 'm3',
          title: 'Coco',
          genre: 'Animation • Family',
          rating: 4.9,
          poster: 'img/Coco.jpg',
          synopsis: 'Aspiring musician Miguel, confronted with his family\'s ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.'
        },
        {
          id: 'm4',
          title: 'Frozen',
          genre: 'Fantasy • Musical',
          rating: 4.7,
          poster: 'img/Frozen.jpg',
          synopsis: 'When the newly-crowned Queen Elsa accidentally uses her power to turn things into ice to curse her home in infinite winter, her sister Anna teams up with a mountain man, his playful reindeer, and a snowman to change the weather condition.'
        },
        {
          id: 'm5',
          title: 'Inside Out',
          genre: 'Comedy • Drama',
          rating: 4.8,
          poster: 'img/InsideOut.jpg',
          synopsis: 'After young Riley is uprooted from her Midwest life and moved to San Francisco, her emotions—Joy, Fear, Anger, Disgust and Sadness—conflict on how best to navigate a new city, house, and school.'
        },
        {
          id: 'm6',
          title: 'Jumbo',
          genre: 'Animation • Fantasy',
          rating: 4.1,
          poster: 'img/Jumbo.jpg',
          synopsis: 'Don, a chubby boy bullied as "Jumbo", encounters Meri, a spirit seeking help to reunite with her troubled family\'s spirits. Their journey unfolds.'
        },
        {
          id: 'm7',
          title: 'Toy Story 3',
          genre: 'Adventure • Comedy',
          rating: 4.9,
          poster: 'img/TS3.jpg',
          synopsis: 'The toys are mistakenly delivered to a day-care center instead of the attic right before Andy leaves for college, and it\'s up to Woody to convince the other toys that they weren\'t abandoned and to return home.'
        },
        {
          id: 'm8',
          title: 'Ratatouille',
          genre: 'Comedy • Cooking',
          rating: 4.8,
          poster: 'img/Ratatouille.jpg',
          synopsis: 'A rat who can cook makes an unusual alliance with a young kitchen worker at a famous Paris restaurant.'
        },
        {
          id: 'm9',
          title: 'Trolls',
          genre: 'Musical • Fantasy',
          rating: 4.5,
          poster: 'img/Trolls.jpg',
          synopsis: 'After the Bergens invade Troll Village, Poppy, the happiest Troll ever born, and the curmudgeonly Branch set off on a journey to rescue her friends.'
        },
        {
          id: 'm10',
          title: 'Zootopia',
          genre: 'Action • Mystery',
          rating: 4.8,
          poster: 'img/Zootopia.jpg',
          synopsis: 'In a city of anthropomorphic animals, a rookie bunny cop and a cynical con artist fox must work together to uncover a conspiracy.'
        }
      ];

      // 2. GET HTML ELEMENTS
      const movieContainer = document.getElementById('movieGrid');
      const modal = document.getElementById('detailModal');
      const closeModalBtn = document.getElementById('closeModal');

      // Elements inside the modal (to fill with data)
      const modalImg = document.getElementById('modalImg');
      const modalTitle = document.getElementById('modalTitle');
      const modalGenre = document.getElementById('modalGenre');
      const modalDesc = document.getElementById('modalDesc');


  // --- 2. STORAGE KEYS ---
  const KEY_SESSION = 'kc_session_final';
  const KEY_COMMENTS = 'kc_comments_final';
  const KEY_HISTORY = 'kc_history_final';

  // --- 3. HELPER FUNCTIONS ---
  function read(key){ return JSON.parse(localStorage.getItem(key) || 'null'); }
  function write(key,val){ localStorage.setItem(key, JSON.stringify(val)); }

  // TOAST NOTIFICATION SYSTEM
  function showToast(msg, type = 'success') {
      const icon = type === 'success' ? '✅' : '⚠️';
      const color = type === 'success' ? 'var(--accent)' : 'var(--accent-secondary)';
      
      const $toast = $(`
        <div class="toast" style="border-left-color: ${color};">
            <span style="font-size: 22px;">${icon}</span>
            <span style="font-weight: 700; font-size: 14px; color: #0F172A;">${msg}</span>
        </div>
      `);

      let $container = $('#toast-container');
      if($container.length === 0) {
          $('body').append('<div id="toast-container"></div>');
          $container = $('#toast-container');
      }
      
      $container.append($toast);
      setTimeout(() => {
          $toast.fadeOut(500, function(){ $(this).remove(); });
      }, 3000);
  }

  // --- 4. AUTH & UI STATE ---
  const currentUser = read(KEY_SESSION);

  function refreshUserUI(){
  const $userArea = $('#userSidebarArea');
  if(!$userArea.length) return;

  // ✅ kalau ada iframe mainFrame (berarti sedang di frame.html)
  const inFrameHost = $('#mainFrame').length > 0;
  const loginTargetAttr = inFrameHost ? ' target="mainFrame"' : '';

  if(currentUser) {
    $userArea.html(`
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:30px; padding: 15px; background: #F8FAFC; border-radius: 16px; border: 1px solid #E2E8F0;">
        <div style="width:40px; height:40px; border-radius:50%; background:var(--accent); color:white; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:18px;">
          ${currentUser.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <div style="font-weight:800; font-size:14px; color:#0F172A;">${currentUser.name}</div>
          <small style="color:#22C55E; font-weight:600;">● Online</small>
        </div>
      </div>
    `);

    $('#navLoginLink').html(`
      <a href="#" id="navLogout" class="menu-link" style="color:#FF3D00;">
        <span class="menu-icon">🚪</span> Logout
      </a>
    `);

    $('#navLogout').off('click').on('click', function(e){
      e.preventDefault();
      localStorage.removeItem(KEY_SESSION);
      showToast("Logging out...", "error");

      setTimeout(() => {
        if(inFrameHost) {
          // ✅ balik ke Home di dalam iframe
          $('#mainFrame').attr('src', 'index.html');
        } else {
          // ✅ normal mode
          window.location.href = 'index.html';
        }
      }, 1000);
    });

  } else {
    $userArea.empty();

    // ✅ Login tetap kebuka di iframe kalau sedang pakai frame.html
    $('#navLoginLink').html(`
      <a href="login.html" class="menu-link"${loginTargetAttr}>
        <span class="menu-icon">🔐</span> Login
      </a>
    `);
  }
}
  refreshUserUI();

  // --- 5. CORE RENDER FUNCTION ---
  function renderGrid(target, data){
    const $t = $(target).empty();
    if(data.length === 0) {
        $t.html('<div style="grid-column:1/-1; text-align:center; padding:40px; color:#64748b;"><h4>No movies found 😔</h4></div>');
        return;
    }

    data.forEach(m => {
      const allComments = read(KEY_COMMENTS) || {};
      const count = allComments[m.id] ? allComments[m.id].length : 0;

      const $card = $(`
        <div class="movie-card" onclick="openModal('${m.id}')">
            <img src="${m.poster}" alt="${m.title}" class="movie-poster">
            <div class="movie-info">
                <h4>${m.title}</h4>
                <div class="movie-meta">
                    <span>${m.genre}</span>
                    <span style="color:var(--accent-secondary); font-weight:800; background:#FFF0EB; padding:4px 10px; border-radius:8px;">★ ${m.rating} (${count})</span>
                </div>
            </div>
        </div>
      `);
      $t.append($card);
    });
  }

  // --- 6. SEARCH & FILTER LOGIC ---
  
  // Search (Home)
  $('#searchInput').on('keyup', function(){
      const val = $(this).val().toLowerCase();
      const filtered = MOVIES.filter(m => m.title.toLowerCase().includes(val) || m.genre.toLowerCase().includes(val));
      renderGrid('#movieGrid', filtered);
  });

  // Filter & Sort (Recommend Page)
  $('#filterGenre').on('change', function(){
      const genre = $(this).val();
      const filtered = genre ? MOVIES.filter(m => m.genre === genre) : MOVIES;
      renderGrid('#recommendGrid', filtered);
  });

  $('#sortBy').on('change', function(){
      const sortType = $(this).val();
      let sorted = [...MOVIES];
      if(sortType === 'rating') {
          sorted.sort((a,b) => b.rating - a.rating);
      } else if(sortType === 'title') {
          sorted.sort((a,b) => a.title.localeCompare(b.title));
      }
      renderGrid('#recommendGrid', sorted);
  });

  // --- 7. MODAL & COMMENT SYSTEM ---
  window.openModal = function(id) {
      const m = MOVIES.find(x => x.id === id);
      if(!m) return;
      
      $('#modalTitle').text(m.title);
      $('#modalGenre').text(m.genre + " • " + m.rating + " Rating");
      $('#modalDesc').text(m.synopsis); 
      $('#modalImg').attr('src', m.poster);
      $('#modalMovieId').val(id);
      
      loadComments(id);
      $('#detailModal').fadeIn().css('display', 'flex');
  };

  function loadComments(movieId) {
      const allComments = read(KEY_COMMENTS) || {};
      const list = allComments[movieId] || [];
      const $list = $('#commentList').empty();
      $('#reviewCount').text(`(${list.length} Reviews)`);

      if(list.length === 0) {
          $list.html(`<div style="text-align:center; padding:30px; color:#94A3B8; background:#F8FAFC; border-radius:20px;">📝 Be the first to review!</div>`);
      } else {
          list.forEach(c => {
             const initial = c.user ? c.user.charAt(0).toUpperCase() : 'U';
             let starsHTML = ''; for(let i=0; i<c.stars; i++) starsHTML += '★';

             $list.append(`
                <div class="comment-item">
                    <div class="comment-avatar">${initial}</div>
                    <div class="comment-bubble">
                        <div class="comment-header">
                            <span class="comment-user">${c.user}</span>
                            <span class="comment-rating" style="color:#FFB400;">${starsHTML}</span>
                        </div>
                        <p class="comment-text">${c.text}</p>
                    </div>
                </div>
             `); 
          });
      }
  }

  // Handle Post Comment
  $('#btnPostComment').click(function(){
      if(!currentUser) {
          showToast("Please Login to comment!", "error");
          setTimeout(() => window.location.href = 'login.html', 1500); return;
      }
      const txt = $('#commentInput').val();
      const stars = $('#starInput').val(); 
      const mid = $('#modalMovieId').val();

      if(!txt) return showToast("Please write a review!", "error");

      const allComments = read(KEY_COMMENTS) || {};
      if(!allComments[mid]) allComments[mid] = [];
      
      allComments[mid].unshift({ user: currentUser.name, text: txt, stars: stars });
      write(KEY_COMMENTS, allComments); 
      $('#commentInput').val(''); 
      showToast("Review posted!", "success");
      loadComments(mid); 
  });

  // Modal Buttons
  $('#btnBuyFromModal').click(function(){
      if(!currentUser) { showToast("Login required!", "error"); setTimeout(() => window.location.href = 'login.html', 1500); } 
      else { window.location.href = 'buyticket.html'; }
  });
  $('#closeModal').click(() => $('#detailModal').fadeOut());

  // --- 8. INITIALIZE PAGES ---
  if($('#movieGrid').length) renderGrid('#movieGrid', MOVIES);
  if($('#recommendGrid').length) renderGrid('#recommendGrid', MOVIES); // Ini yang sebelumnya tertinggal

  // Forms Handlers
  $('#loginForm').on('submit', function(e){ e.preventDefault(); write(KEY_SESSION, {name: $('#loginUser').val() || 'User'}); showToast("Welcome back!"); setTimeout(() => window.location.href = 'index.html', 1000); });
  $('#registerForm').on('submit', function(e){ e.preventDefault(); showToast("Account created!"); setTimeout(() => window.location.href = 'login.html', 1000); });
  $('#contactForm').on('submit', function(e){ e.preventDefault(); showToast("Message sent!"); this.reset(); });
  $('#forgotForm').on('submit', function(e){ e.preventDefault(); showToast("Reset link sent!"); setTimeout(() => window.location.href = 'login.html', 2000); });

  // --- 9. TICKET SYSTEM & HISTORY ---
  if($('#ticketMovie').length) {
      if(!currentUser) { 
          alert("Please Login first."); // Alert cepat sebelum redirect
          window.location.href = 'login.html'; 
      } else { 
          $('#ticketMovie').append('<option value="">-- Select Movie --</option>');
          MOVIES.forEach(m => $('#ticketMovie').append(`<option value='${m.id}'>${m.title}</option>`));
          loadTicketHistory();
      }

      // Logic Tombol Waktu
      $('.time-btn').on('click', function(){
          $('.time-btn').removeClass('btn-primary').addClass('btn-glass');
          $(this).removeClass('btn-glass').addClass('btn-primary');
          $('#selectedTime').val($(this).data('time'));
      });

      function calcPurchase(){
        const movieId = $('#ticketMovie').val();
        const qty = Number($('#ticketQty').val() || 1);
        const seat = $('input[name=seat]:checked').val();
        if(!movieId) { $('#purchaseSummary').html('<div style="text-align:center; color:#94A3B8;">Select movie...</div>'); return null; }
        
        let base = 50000; if(seat === 'vip') base = 85000; let total = base * qty;
        
// Masukkan logika ini ke dalam event listener atau fungsi hitung kamu
function calculateTotal() {
    // 1. Ambil harga dari Radio Button yang dipilih
    const selectedRadio = document.querySelector('input[name="ticket_price"]:checked');
    const price = selectedRadio ? parseInt(selectedRadio.value) : 0;
    
    // 2. Ambil Quantity
    const qtyInput = document.getElementById('ticketQty');
    const qty = parseInt(qtyInput.value) || 1;

    // 3. Hitung Total
    const total = price * qty;

    // 4. Update Tampilan (Sesuaikan ID elemen total kamu)
    // Contoh: ID elemen total kamu adalah 'totalPriceText'
    const totalElement = document.getElementById('purchaseSummary'); 
    
    if (price === 0) {
        totalElement.innerHTML = "Silakan pilih tipe tiket dulu";
    } else {
        totalElement.innerHTML = `Total: IDR ${total.toLocaleString('id-ID')}`;
    }
}

// Pasang Event Listener agar otomatis berubah saat diklik
const radios = document.querySelectorAll('input[name="ticket_price"]');
radios.forEach(radio => {
    radio.addEventListener('change', calculateTotal);
});

// Jangan lupa pasang di quantity juga
document.getElementById('ticketQty').addEventListener('input', calculateTotal);

        $('#purchaseSummary').html(`
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;"><span>Ticket (${seat.toUpperCase()})</span> <span>IDR ${base.toLocaleString()}</span></div>
            <div style="display:flex; justify-content:space-between; margin-bottom:10px;"><span>Qty</span> <span>x ${qty}</span></div>
            <hr style="border-color:#D6E4FF; margin:15px 0;">
            <div style="display:flex; justify-content:space-between; font-weight:800; font-size:20px; color:var(--accent);"><span>Total</span> <span>IDR ${total.toLocaleString()}</span></div>
        `);
        return {movieId, qty, seat, total};
      }
      $('#ticketMovie, #ticketQty, input[name=seat]').on('change input', calcPurchase);

      // Submit Pembelian
      $('#purchaseForm').on('submit', function(e){
        e.preventDefault(); 
        const p = calcPurchase(); 
        const time = $('#selectedTime').val();

        if(!p) return showToast("Select a movie!", "error");
        if(!time) return showToast("Select showtime!", "error");
        
        const m = MOVIES.find(x => x.id === p.movieId);
        const dateNow = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        
        // Simpan History
        const historyData = read(KEY_HISTORY) || [];
        historyData.unshift({ user: currentUser.name, movieTitle: m.title, seatType: p.seat, qty: p.qty, total: p.total, date: dateNow, time: time });
        write(KEY_HISTORY, historyData);

        // Tampilkan Invoice
        $('#invoiceContent').html(`
            <p><strong>Movie:</strong> ${m.title}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Seat:</strong> ${p.qty} x ${p.seat.toUpperCase()}</p>
            <h2 style="color:var(--accent); margin-top:10px;">IDR ${p.total.toLocaleString()}</h2>
        `);
        
        $('#invoiceModal').fadeIn().css('display', 'flex');
        showToast("Booking Success!");
        loadTicketHistory();
      });

      $('#closeInvoice').click(function(){ 
          $('#invoiceModal').fadeOut(); 
          // Reset
          $('#purchaseForm')[0].reset();
          $('.time-btn').removeClass('btn-primary').addClass('btn-glass');
          $('#selectedTime').val('');
          $('#purchaseSummary').html('');
      });
  }

  function loadTicketHistory() {
      const allHistory = read(KEY_HISTORY) || [];
      const myHistory = allHistory.filter(h => h.user === currentUser.name);
      const $list = $('#historyList').empty();

      if(myHistory.length === 0) {
          $list.html('<div style="text-align:center; color:#94A3B8; padding:20px;">No tickets purchased yet.</div>');
      } else {
          myHistory.forEach(h => {
              const timeDisplay = h.time ? ` • ⏰ ${h.time}` : '';
              $list.append(`
                <div class="history-card">
                    <div class="ticket-info">
                        <h4>${h.movieTitle}</h4>
                        <div class="ticket-detail"><span>📅 ${h.date}${timeDisplay}</span><span>💺 ${h.seatType.toUpperCase()} (x${h.qty})</span></div>
                    </div>
                    <div class="ticket-price">IDR ${h.total.toLocaleString()}</div>
                </div>
              `);
          });
      }
  }
});