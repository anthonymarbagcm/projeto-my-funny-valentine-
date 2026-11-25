
    (() => {
      const DATAS = [
        { dia: 27, label: 'Sexta',  emoji: '🌙' },
        { dia: 28, label: 'Sábado', emoji: '📅' },
        { dia: 29, label: 'Domingo', emoji: '🌤️' },
      ];

      const CATEGORIAS = [
        {
          titulo: 'Bares estéticos',
          emoji: '📸',
          descricaoGeral: 'Bares legais e esteticamente bonitos pra tirar foto boa pro dump mensal.',
          lugares: [
            {
              nome: 'Lotus Sunset 55+',
              descricao: 'Golden hour, vista bonita e clima perfeito pra foto que salva o feed do mês.',
            },
            {
              nome: 'Janela Bar',
              descricao: 'Ambiente estiloso, luz boa e drinks que pedem um close antes do primeiro gole.',
            },
          ],
        },
        {
          titulo: 'Bar de jazz',
          emoji: '🎷',
          descricaoGeral: 'Bar de jazz pra ouvir Frank Sinatra e discutir política tomando xeque-mate.',
          lugares: [
            {
              nome: 'Dizzy Bar',
              descricao: 'Jazz ao vivo, Sinatra no ar e xeque-mate gelado enquanto a conversa esquenta.',
            },
            {
              nome: 'O Pensador Bar',
              descricao: 'Música boa, clima intimista e mesa pronta pra debate filosófico até tarde.',
            },
          ],
        },
        {
          titulo: 'Underground',
          emoji: '🤘',
          descricaoGeral: 'Lugares undergrounds pra tirar foto com a cybershot de estimação e talvez perder a perna num mosh pit.',
          lugares: [
            {
              nome: '92 Graus',
              descricao: 'Calor, mosh pit e flash da cybershot no meio do caos — puro documento de guerra.',
            },
            {
              nome: 'Belvedere',
              descricao: 'Cantinho underground com estética crua e noite que vira história no cartão de memória.',
            },
          ],
        },
      ];

      const OPCOES_SECRETAS = [
        {
          nome: 'Role na Praça Espanha',
          descricao: 'Dar uma volta na Praça Espanha, bater perna e curtir o clima da praça.',
        },
        {
          nome: 'Centro, brechos e pastel com caldo de cana',
          descricao: 'Andar pelo centro, ver brechos e terminar num restaurante legal com pastel e caldo de cana finalmente.',
        },
      ];

      const yesButton = document.getElementById('yesButton');
      const noButton = document.getElementById('noButton');
      const imageDisplay = document.getElementById('imageDisplay');
      const encontroQuestion = document.getElementById('encontroQuestion');
      const subtexto = document.getElementById('subtexto');
      const buttonArea = document.getElementById('buttonArea');
      const calendarModal = document.getElementById('calendarModal');
      const calendarDays = document.getElementById('calendarDays');
      const calendarTitle = document.getElementById('calendarTitle');
      const calendarSubtitle = document.getElementById('calendarSubtitle');
      const calendarHint = document.getElementById('calendarHint');
      const confirmMessage = document.getElementById('confirmMessage');
      const confirmFooter = document.getElementById('confirmFooter');
      const pendingSelection = document.getElementById('pendingSelection');
      const confirmOptionBtn = document.getElementById('confirmOptionBtn');
      const heartsOverlay = document.getElementById('heartsOverlay');
      const giantHeart = document.getElementById('giantHeart');

      let selectedData = null;
      let pendingChoice = null;

      const HEART_COLORS = ['#ef4444', '#ec4899', '#f472b6', '#fb923c', '#a855f7', '#f43f5e', '#e11d48', '#db2777', '#f97316', '#be185d'];
      const NOTIFY_EMAIL = 'anthonygcmarba0912@gmail.com';

      const MAX_NO_CLICKS = 5;
      const RUNAWAY_THRESHOLD = 100;

      const IMAGE_PATHS = [
        './images/img1.jpg',
        './images/img2.jpg',
        './images/img3.webp',
        './images/img4.webp',
        './images/img5.jpg',
        './images/img3.webp',
        './images/img5.jpg',
      ];

      const NO_BUTTON_MESSAGES = [
        'Não',
        'Tem certeza?',
        'Por favooor 🥺',
        'Não faz isso comigo :(',
        'Vou chorar no banho',
        'Última chance...',
      ];

      const SUBTEXTOS = [
        '(prometo não contar piada ruim... talvez)',
        '(só um cafezinho, juro!)',
        '(eu pago o estacionamento!)',
        '(até aceito ir num lugar que você escolhe)',
        '(já até escolhi a playlist)',
        '(minha dignidade depende disso)',
      ];

      let noClickCount = 0;
      let isRunawayMode = false;

      function setImage(index) {
        const path = IMAGE_PATHS[index];
        const img = new Image();
        img.onload = () => { imageDisplay.src = path; };
        img.onerror = () => { imageDisplay.alt = 'Imagem não encontrada'; };
        img.src = path;
      }

      function spawnThumbsDown(x, y) {
        for (let i = 0; i < 5; i++) {
          const el = document.createElement('span');
          el.textContent = '👎';
          el.className = 'thumb-down';
          el.style.left = `${x + (Math.random() - 0.5) * 80}px`;
          el.style.top = `${y + (Math.random() - 0.5) * 30}px`;
          el.style.fontSize = `${1.2 + Math.random()}rem`;
          document.body.appendChild(el);
          setTimeout(() => el.remove(), 1000);
        }
      }

      function launchRockets() {
        for (let i = 0; i < 12; i++) {
          setTimeout(() => {
            const el = document.createElement('span');
            el.textContent = '🚀';
            el.className = 'rocket';
            el.style.left = `${10 + Math.random() * 80}vw`;
            el.style.bottom = '-40px';
            el.style.fontSize = `${2 + Math.random() * 2}rem`;
            el.style.animationDuration = `${1.2 + Math.random()}s`;
            document.body.appendChild(el);
            setTimeout(() => el.remove(), 2500);
          }, i * 120);
        }
      }

      function growYesButton() {
        yesButton.classList.remove('bounce');
        const scale = Math.min(1 + noClickCount * 0.18, 2.2);
        yesButton.style.transform = `scale(${scale})`;
      }

      function moveNoButtonAway(fromX, fromY) {
        const w = noButton.offsetWidth;
        const h = noButton.offsetHeight;
        const padding = 16;

        let newX, newY;
        let attempts = 0;

        do {
          newX = padding + Math.random() * (window.innerWidth - w - padding * 2);
          newY = padding + Math.random() * (window.innerHeight - h - padding * 2);
          attempts++;
        } while (
          attempts < 10 &&
          Math.hypot(fromX - (newX + w / 2), fromY - (newY + h / 2)) < RUNAWAY_THRESHOLD * 1.5
        );

        noButton.style.left = `${newX}px`;
        noButton.style.top = `${newY}px`;
      }

      function enableRunawayMode() {
        if (isRunawayMode) return;
        isRunawayMode = true;

        const rect = noButton.getBoundingClientRect();
        noButton.classList.add('runaway');
        noButton.style.left = `${rect.left}px`;
        noButton.style.top = `${rect.top}px`;

        document.addEventListener('mousemove', onMouseMoveRunaway);
      }

      function onMouseMoveRunaway(e) {
        const rect = noButton.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - cx, e.clientY - cy);

        if (dist < RUNAWAY_THRESHOLD) {
          moveNoButtonAway(e.clientX, e.clientY);
        }
      }

      function hideConfirmFooter() {
        pendingChoice = null;
        confirmFooter.classList.add('hidden');
        confirmMessage.classList.add('hidden');
      }

      function showPendingChoice(dia, label, nome) {
        pendingChoice = { dia, label, nome };
        pendingSelection.textContent = `${label}, ${dia} de nov — ${nome}`;
        confirmFooter.classList.remove('hidden');
        confirmMessage.classList.add('hidden');
        calendarHint.textContent = 'Confirma aí embaixo!';
      }

      function launchHeartCelebration() {
        calendarModal.classList.add('hidden');
        heartsOverlay.classList.remove('hidden');
        giantHeart.style.fontSize = '120px';

        for (let i = 0; i < 60; i++) {
          setTimeout(() => {
            const heart = document.createElement('span');
            heart.textContent = '❤';
            heart.className = 'floating-heart';
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.bottom = '-40px';
            heart.style.fontSize = `${16 + Math.random() * 40}px`;
            heart.style.color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];
            heart.style.animationDuration = `${2 + Math.random() * 3}s`;
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 5500);
          }, i * 80);
        }

        const choice = { ...pendingChoice };
        setTimeout(() => {
          heartsOverlay.classList.add('hidden');
          encontroQuestion.textContent = 'Combinado!! Te vejo lá 💕';
          subtexto.textContent = `${choice.label}, ${choice.dia} de nov — ${choice.nome}`;
        }, 4000);
      }

      async function sendConfirmationEmail(choice) {
        const response = await fetch(`https://formsubmit.co/ajax/${NOTIFY_EMAIL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            _subject: '💕 Alguém confirmou o encontro!',
            _template: 'table',
            _captcha: 'false',
            Dia: `${choice.label}, ${choice.dia} de novembro de 2026`,
            Lugar: choice.nome,
            Confirmado_em: new Date().toLocaleString('pt-BR'),
          }),
        });

        if (!response.ok) throw new Error('Falha ao enviar e-mail');
        return response.json();
      }

      confirmOptionBtn.addEventListener('click', async () => {
        if (!pendingChoice) return;

        confirmOptionBtn.disabled = true;
        confirmOptionBtn.textContent = 'Enviando...';

        try {
          await sendConfirmationEmail(pendingChoice);
        } catch {
          confirmOptionBtn.textContent = 'Confirmar opção ✨';
          confirmOptionBtn.disabled = false;
          calendarHint.textContent = 'Não consegui enviar o e-mail, tenta de novo';
          return;
        }

        confirmFooter.classList.add('hidden');
        confirmMessage.textContent = `Marcado! ${pendingChoice.label}, ${pendingChoice.dia} de nov — ${pendingChoice.nome} 🎉`;
        confirmMessage.classList.remove('hidden');
        launchHeartCelebration();
      });

      function buildDatesView() {
        selectedData = null;
        hideConfirmFooter();
        calendarSubtitle.textContent = '🗓️ Escolhe o dia!';
        calendarTitle.textContent = '27, 28 ou 29 de nov';
        calendarHint.textContent = 'Marca aí antes que eu fique ansioso demais';
        calendarDays.innerHTML = '';

        DATAS.forEach(({ dia, label, emoji }) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'pick-card w-full text-left p-4 rounded-xl border-2 border-pink-200 bg-pink-50/50';
          btn.innerHTML = `
            <div class="flex items-center gap-3">
              <span class="text-2xl">${emoji}</span>
              <div>
                <p class="font-bold text-[#bd1e59] text-lg">${label}</p>
                <p class="text-pink-500 text-sm">${dia} de novembro</p>
              </div>
            </div>
          `;
          btn.addEventListener('click', () => buildPlacesView(dia, label));
          calendarDays.appendChild(btn);
        });
      }

      function selectPlace(dia, label, nome) {
        document.querySelectorAll('.place-option, .pick-card.secret').forEach((c) => c.classList.remove('selected'));
        showPendingChoice(dia, label, nome);
      }

      function buildPlacesView(dia, label) {
        selectedData = { dia, label };
        hideConfirmFooter();
        calendarSubtitle.textContent = '📍 Onde vamos?';
        calendarTitle.textContent = `${label}, ${dia} de nov`;
        calendarHint.textContent = 'Abre um tópico e escolhe o lugar';
        calendarDays.innerHTML = '';

        const back = document.createElement('button');
        back.type = 'button';
        back.className = 'back-btn';
        back.textContent = '← Voltar às datas';
        back.addEventListener('click', buildDatesView);
        calendarDays.appendChild(back);

        CATEGORIAS.forEach((cat) => {
          const topic = document.createElement('div');
          topic.className = 'topic-card';

          const header = document.createElement('button');
          header.type = 'button';
          header.className = 'topic-header';
          header.innerHTML = `
            <span class="font-bold text-[#bd1e59]">${cat.emoji} ${cat.titulo}</span>
            <span class="topic-chevron">▼</span>
          `;

          const body = document.createElement('div');
          body.className = 'topic-body';
          body.innerHTML = `<p class="topic-geral">${cat.descricaoGeral}</p>`;

          cat.lugares.forEach((lugar) => {
            const opt = document.createElement('div');
            opt.className = 'place-option';
            opt.innerHTML = `
              <p class="font-bold text-[#bd1e59] text-sm">${lugar.nome}</p>
              <p class="text-gray-600 text-sm mt-1 leading-relaxed">${lugar.descricao}</p>
            `;
            opt.addEventListener('click', (e) => {
              e.stopPropagation();
              document.querySelectorAll('.place-option').forEach((c) => c.classList.remove('selected'));
              opt.classList.add('selected');
              selectPlace(dia, label, lugar.nome);
            });
            body.appendChild(opt);
          });

          header.addEventListener('click', () => {
            const wasOpen = topic.classList.contains('open');
            document.querySelectorAll('.topic-card').forEach((t) => t.classList.remove('open'));
            if (!wasOpen) topic.classList.add('open');
          });

          topic.appendChild(header);
          topic.appendChild(body);
          calendarDays.appendChild(topic);
        });

        // Tópico secreto com as duas opções agrupadas
        const secretTopic = document.createElement('div');
        secretTopic.className = 'topic-card';

        const secretHeader = document.createElement('button');
        secretHeader.type = 'button';
        secretHeader.className = 'topic-header';
        secretHeader.innerHTML = \`
          <span class="font-bold text-[#bd1e59]">🤫 Secreto</span>
          <span class="topic-chevron">▼</span>
        \`;

        const secretBody = document.createElement('div');
        secretBody.className = 'topic-body';
        secretBody.innerHTML = `<p class="topic-geral">Opções especiais que não aparecem para qualquer um.</p>`;

        OPCOES_SECRETAS.forEach((opcao) => {
          const opt = document.createElement('div');
          opt.className = 'place-option';
          opt.innerHTML = \`
            <p class="font-bold text-[#bd1e59] text-sm">${opcao.nome}</p>
            <p class="text-gray-600 text-sm mt-1 leading-relaxed">${opcao.descricao}</p>
          \`;
          opt.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.place-option').forEach((c) => c.classList.remove('selected'));
            opt.classList.add('selected');
            selectPlace(dia, label, opcao.nome);
          });
          secretBody.appendChild(opt);
        });

        secretHeader.addEventListener('click', () => {
          const wasOpen = secretTopic.classList.contains('open');
          document.querySelectorAll('.topic-card').forEach((t) => t.classList.remove('open'));
          if (!wasOpen) secretTopic.classList.add('open');
        });

        secretTopic.appendChild(secretHeader);
        secretTopic.appendChild(secretBody);
        calendarDays.appendChild(secretTopic);
      }

      function buildCalendar() {
        buildDatesView();
      }

      noButton.addEventListener('click', (e) => {
        spawnThumbsDown(e.clientX, e.clientY);

        if (noClickCount >= MAX_NO_CLICKS) {
          moveNoButtonAway(e.clientX, e.clientY);
          return;
        }

        noClickCount++;
        setImage(noClickCount);
        subtexto.textContent = SUBTEXTOS[noClickCount] || SUBTEXTOS[SUBTEXTOS.length - 1];
        noButton.textContent = NO_BUTTON_MESSAGES[noClickCount];
        growYesButton();

        if (noClickCount >= MAX_NO_CLICKS) {
          enableRunawayMode();
        }
      });

      yesButton.addEventListener('click', () => {
        document.removeEventListener('mousemove', onMouseMoveRunaway);
        setImage(6);
        encontroQuestion.textContent = 'Ebaa!! Vamos marcar então! 🎊';
        subtexto.textContent = 'Escolhe o dia e o rolê aí embaixo 👇';
        buttonArea.style.display = 'none';

        launchRockets();

        setTimeout(() => {
          buildCalendar();
          calendarModal.classList.remove('hidden');
        }, 600);
      });

      // Removido: fechar ao clicar fora travaria o modal sem jeito de reabrir
      // calendarModal.addEventListener('click', (e) => {
      //   if (e.target === calendarModal) {
      //     calendarModal.classList.add('hidden');
      //   }
      // });
    })();
  