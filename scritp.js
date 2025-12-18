    const dateModal = document.getElementById('dateModal');
    const openDateModal = document.getElementById('openDateModal');
    const closeDateButton = document.querySelector('.close-button');
    const submitDate = document.getElementById('submitDate');
    const dateInput = document.getElementById('dateInput');

    const correctDate = '2025-08-09'; //Fecha que se ingresa para pasar a la siguiente pagina

    // Attach date modal handlers only if the related elements exist on the page
    if (openDateModal && dateModal) {
      openDateModal.addEventListener('click', () => {
        dateModal.style.display = 'flex';
      });
    }

    if (closeDateButton && dateModal) {
      closeDateButton.addEventListener('click', () => {
        dateModal.style.display = 'none';
      });
    }

    window.addEventListener('click', (event) => {
      if (dateModal && event.target === dateModal) {
        dateModal.style.display = 'none';
      }
    });

    if (submitDate && dateInput) {
      submitDate.addEventListener('click', () => {
        if (dateInput.value === correctDate) {
          window.location.href = 'cartaNavidena.html'; //Envia hacia la pagina correcta
        } else {
          alert('Ingresa la fecha correcta corazon.');
        }
      });
    }
    
    // Photo modal / carrusel
    (function(){
      const galleryThumbs = Array.from(document.querySelectorAll('.gallery img'));
      const photoModal = document.getElementById('photoModal');
      const pmImage = document.getElementById('pmImage');
      const pmCaption = document.getElementById('pmCaption');
      const pmClose = document.getElementById('pmClose');
      const pmPrev = document.getElementById('pmPrev');
      const pmNext = document.getElementById('pmNext');
      const pmOverlay = document.getElementById('pmOverlay');
      let currentIndex = 0;

      if(!photoModal) return;


      function openModal(index){
        currentIndex = index;
        updateModal();
        photoModal.setAttribute('aria-hidden','false');
        document.body.style.overflow = 'hidden';
        pmClose.focus();
      }

      function closeModal(){
        photoModal.setAttribute('aria-hidden','true');
        document.body.style.overflow = '';
      }

      function updateModal(){
        const thumb = galleryThumbs[currentIndex];
        const full = thumb.dataset.full || thumb.src;
        pmImage.src = full;
        pmImage.alt = thumb.alt || '';
        pmCaption.innerText = thumb.dataset.caption || thumb.alt || '';
      }

      function showNext(delta){
        currentIndex = (currentIndex + delta + galleryThumbs.length) % galleryThumbs.length;
        updateModal();
      }

      galleryThumbs.forEach((t, i)=>{
        t.addEventListener('click', ()=> openModal(i));
      });

      pmClose.addEventListener('click', closeModal);
      pmOverlay.addEventListener('click', closeModal);
      pmPrev.addEventListener('click', ()=> showNext(-1));
      pmNext.addEventListener('click', ()=> showNext(1));

      window.addEventListener('keydown', (e)=>{
        if(photoModal.getAttribute('aria-hidden') === 'false'){
          if(e.key === 'ArrowRight') showNext(1);
          if(e.key === 'ArrowLeft') showNext(-1);
          if(e.key === 'Escape') closeModal();
        }
      });
    })();

    // Background audio: try autoplay; if blocked show a small play button
    (function(){
      const audio = document.getElementById('bgAudio');
      const playBtn = document.getElementById('audioPlayButton');
      if(!audio) return;
      audio.volume = 0.7;

      function enableAudioViaUser(){
        audio.play().then(()=>{
          if(playBtn) playBtn.style.display = 'none';
        }).catch(()=>{
          /* still blocked */
        });
      }

      // Try to autoplay immediately (script is deferred)
      const p = audio.play();
      if(p !== undefined){
        p.then(()=>{
          if(playBtn) playBtn.style.display = 'none';
        }).catch(()=>{
          // Autoplay with sound blocked by browser: show small control to allow user
          if(playBtn) {
            playBtn.style.display = 'flex';
            playBtn.addEventListener('click', function onClick(){
              enableAudioViaUser();
              playBtn.removeEventListener('click', onClick);
            });
          }
        });
      }

      // Also listen for any user interaction to try enabling audio
      ['click','keydown','touchstart'].forEach(evt => {
        window.addEventListener(evt, function handler(){
          if(audio.paused){
            enableAudioViaUser();
          }
          window.removeEventListener(evt, handler);
        }, {passive:true});
      });
    })();
