// 전역 변수
let characters = [];
let messages = [];
let currentCharacter = null;
let conversationHistory = [];
let currentMessageIndex = 0;
let userName = '';

// DOM 요소
const nameInputScreen = document.getElementById('name-input-screen');
const characterSelectScreen = document.getElementById('character-select-screen');
const chatScreen = document.getElementById('chat-screen');
const characterList = document.getElementById('character-list');
const backBtn = document.getElementById('back-btn');
const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const suggestedQuestions = document.getElementById('suggested-questions');
const userNameInput = document.getElementById('user-name-input');
const nameSubmitBtn = document.getElementById('name-submit-btn');

// 초기화
async function init() {
    try {
        await loadCharacters();
        await loadMessages();
        setupEventListeners();
    } catch (error) {
        console.error('초기화 실패:', error);
    }
}

// 이벤트 리스너 설정
function setupEventListeners() {
    // 이름 입력
    nameSubmitBtn.addEventListener('click', submitUserName);
    userNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitUserName();
        }
    });

    // 채팅
    backBtn.addEventListener('click', goBack);
    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// 이름 제출
function submitUserName() {
    const name = userNameInput.value.trim();
    
    if (name === '') {
        alert('이름을 입력해주세요.');
        return;
    }
    
    userName = name;
    
    // 화면 전환
    nameInputScreen.classList.remove('active');
    characterSelectScreen.classList.add('active');
    
    // 캐릭터 목록 렌더링
    renderCharacterList();
    
    // 환영 메시지 표시
    showWelcomeMessage();
}

// 환영 메시지
function showWelcomeMessage() {
    const header = characterSelectScreen.querySelector('.header');
    const welcomeMsg = document.createElement('div');
    welcomeMsg.className = 'welcome-user-message';
    welcomeMsg.innerHTML = `<p>반갑습니다, <strong>${userName}</strong> 님! 이제 우리 동네 이웃 5명과의 채팅방이 열립니다. 누구와 먼저 대화하시겠어요?</p>`;
    welcomeMsg.style.cssText = `
        background: white;
        margin: 0 20px 20px;
        padding: 20px;
        border-radius: 16px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        animation: fadeIn 0.5s ease;
    `;
    
    header.insertAdjacentElement('afterend', welcomeMsg);
}

// 캐릭터 데이터 로드
async function loadCharacters() {
    try {
        const response = await fetch('tables/characters?limit=100');
        const result = await response.json();
        characters = result.data;
    } catch (error) {
        console.error('캐릭터 로드 실패:', error);
    }
}

// 메시지 데이터 로드
async function loadMessages() {
    try {
        const response = await fetch('tables/messages?limit=100');
        const result = await response.json();
        messages = result.data;
    } catch (error) {
        console.error('메시지 로드 실패:', error);
    }
}

// 캐릭터 목록 렌더링
function renderCharacterList() {
    characterList.innerHTML = '';
    
    characters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.onclick = () => selectCharacter(character);
        
        card.innerHTML = `
            <div class="character-profile" style="background-color: ${character.background_color}">
                ${character.profile_image}
            </div>
            <div class="character-info">
                <div class="character-name">${character.name}</div>
                <div class="character-meta">${character.age} · ${character.nationality} · ${character.occupation}</div>
                <div class="character-desc">${character.description}</div>
            </div>
        `;
        
        characterList.appendChild(card);
    });
}

// 캐릭터 선택
function selectCharacter(character) {
    currentCharacter = character;
    conversationHistory = [];
    currentMessageIndex = 0;
    
    // 화면 전환
    characterSelectScreen.classList.remove('active');
    chatScreen.classList.add('active');
    
    // 채팅 헤더 업데이트
    document.getElementById('chat-profile-img').innerHTML = character.profile_image;
    document.getElementById('chat-profile-img').style.backgroundColor = character.background_color;
    document.getElementById('chat-name').textContent = character.name;
    document.getElementById('chat-status').textContent = `${character.age} · ${character.occupation}`;
    
    // 채팅 초기화
    chatMessages.innerHTML = '';
    messageInput.value = '';
    
    // 추천 질문 표시
    renderSuggestedQuestions();
    
    // 가이드 메시지 표시
    showGuideMessage();
}

// 추천 질문 렌더링
function renderSuggestedQuestions() {
    const suggestions = getSuggestionsForCharacter(currentCharacter.id);
    suggestedQuestions.innerHTML = '';
    
    suggestions.forEach(suggestion => {
        const btn = document.createElement('button');
        btn.className = 'suggestion-btn';
        btn.textContent = suggestion;
        btn.onclick = () => {
            messageInput.value = suggestion;
            sendMessage();
            // 버튼 사라지게 하기
            btn.classList.add('used');
            setTimeout(() => {
                btn.remove();
            }, 300);
        };
        suggestedQuestions.appendChild(btn);
    });
}

// 캐릭터별 추천 질문
function getSuggestionsForCharacter(characterId) {
    const suggestionMap = {
        'tuoi': [
            `${currentCharacter.name} 님, 안녕하세요. 한국 생활은 좀 어떠세요? 혹시 가족분들과 지내면서 힘든 점은 없으세요?`,
            '아, 낮잠 때문에요?',
            '왜 혼내셨어요? 속상하셨겠어요.',
            '그런데 베트남에서는 낮잠이 당연한 건가요?',
            '그렇군요. 문화 차이 때문에 힘드셨겠어요.',
            '이해해요. 서로 존중하는 게 중요하네요.'
        ],
        'antonio': [
            '사장님! 안녕하세요. 가게에 손님이 많으시네요. 요즘 동네에 다양한 문화가 많아져서 좋은 점이 있으신가요?',
            '불고기 타코요? 신기하네요!',
            '어떻게 만들게 되셨어요?',
            '대박이네요! 정말 좋은 아이디어예요!',
            '멋지네요! 최고예요!'
        ],
        'jihoon': [
            `${currentCharacter.name} 님, 안녕하세요. 요즘 1인 가구가 정말 많아졌죠? 혼자 생활하시면서 예전보다 편리해진 점이 있으세요?`,
            '아, 마트에도 1인 가구를 위한 제품이 많나요?',
            '어떤 제품들이 있나요? 예를 들면?',
            '취미 활동이나 여가 생활은 어떠세요?',
            '정말 자유롭고 좋네요!'
        ],
        'sujeong': [
            `${currentCharacter.name} 님, 안녕하세요. 초코는 잘 지내죠? 반려동물과 함께 생활하시면서 혹시 속상한 일은 없으세요?`,
            '어떤 점이 힘드세요?',
            '무슨 일이에요? 왜 그러셨대요?',
            '속상하셨겠어요. 이해해주셨으면 좋겠네요.'
        ],
        'kyungsoo': [
            '어르신, 안녕하세요. 요즘은 예전과 달리 결혼을 선택하지 않고(비혼) 혼자 사는 청년들도 많아지는 것 같아요.',
            '아, 네. 요즘은 그런 경우가 많더라고요.',
            '결혼을 안 하면 문제가 있는 건가요?',
            '다양한 삶의 방식을 존중해야 하지 않을까요?',
            '각자의 선택이 중요하다고 생각해요.'
        ]
    };
    
    return suggestionMap[characterId] || ['안녕하세요'];
}



// 가이드 메시지 표시
function showGuideMessage() {
    const guideText = getGuideForCharacter(currentCharacter.id);
    
    const guideDiv = document.createElement('div');
    guideDiv.className = 'guide-message';
    guideDiv.innerHTML = `
        <div class="guide-content">
            <div class="guide-icon">💡</div>
            <div class="guide-text">${guideText}</div>
        </div>
    `;
    
    chatMessages.appendChild(guideDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 캐릭터별 가이드 메시지
function getGuideForCharacter(characterId) {
    const guideMap = {
        'tuoi': `${currentCharacter.name} 님은 한국에 온 지 얼마 안 됐어요.<br>한국 생활에서 겪는 어려움이나 문제점에 대해 질문해 보세요.`,
        'antonio': `${currentCharacter.name} 사장님은 퓨전 음식 전문가예요.<br>다양한 문화가 생기면서 생긴 좋은 점에 대해 질문해 보세요.`,
        'jihoon': `${currentCharacter.name} 님은 1인 가구예요.<br>혼자 생활하면서 예전보다 편리해진 점이나 좋아진 점을 질문해 보세요.`,
        'sujeong': `${currentCharacter.name} 님은 반려동물을 키우고 있어요.<br>반려동물과 함께 생활하면서 겪는 문제점이나 갈등 상황에 대해 질문해 보세요.`,
        'kyungsoo': `${currentCharacter.name} 어르신은 전통적인 생각을 갖고 계세요.<br>요즘 젊은 세대들의 다양한 삶의 방식에 대해 어떻게 생각하시는지 질문해 보세요.`
    };
    
    return guideMap[characterId] || '대화를 시작해보세요!';
}

// 메시지 추가 (화면에 표시)
function addMessage(type, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    messageDiv.innerHTML = `
        <div>
            <div class="message-bubble">${text}</div>
            <div class="message-time">${timeString}</div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 타이핑 인디케이터 표시
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message received';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 타이핑 인디케이터 제거
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// 메시지에 대한 응답
function respondToMessage(userMessage) {
    showTypingIndicator();
    
    // 메시지에서 키워드 추출 및 매칭
    const matchedMessage = findMatchingMessage(userMessage);
    
    setTimeout(() => {
        hideTypingIndicator();
        
        if (matchedMessage) {
            // 사용자 이름으로 치환
            let responseText = matchedMessage.text.replace(/{name}/g, userName);
            addMessage('received', responseText);
            currentMessageIndex = matchedMessage.sequence;
        } else {
            // 기본 응답
            const defaultResponse = getDefaultResponse();
            addMessage('received', defaultResponse);
        }
    }, 1000 + Math.random() * 500);
}

// 메시지 매칭
function findMatchingMessage(userMessage) {
    const characterMessages = messages.filter(msg => 
        msg.character_id === currentCharacter.id
    );
    
    // 다음 시퀀스 찾기
    let targetSequence = currentMessageIndex + 1;
    
    // 대상 시퀀스의 메시지들 가져오기
    const targetMessages = characterMessages.filter(msg => msg.sequence === targetSequence);
    
    // 키워드 매칭 확인
    for (let msg of targetMessages) {
        if (msg.trigger_keywords && Array.isArray(msg.trigger_keywords)) {
            for (let keyword of msg.trigger_keywords) {
                if (userMessage.includes(keyword)) {
                    console.log(`Matched keyword: "${keyword}" in sequence ${targetSequence}`);
                    return msg;
                }
            }
        }
    }
    
    // 키워드 매칭이 안 되면 모든 시퀀스에서 키워드 검색 (순서 무시)
    for (let msg of characterMessages) {
        if (msg.sequence > currentMessageIndex && msg.trigger_keywords && Array.isArray(msg.trigger_keywords)) {
            for (let keyword of msg.trigger_keywords) {
                if (userMessage.includes(keyword)) {
                    console.log(`Matched keyword in any sequence: "${keyword}" in sequence ${msg.sequence}`);
                    return msg;
                }
            }
        }
    }
    
    // 그래도 없으면 다음 시퀀스 첫 번째 메시지 반환
    if (targetMessages.length > 0) {
        return targetMessages[0];
    }
    
    return null;
}

// 기본 응답
function getDefaultResponse() {
    const responses = [
        '네, 그렇군요.',
        '음... 그렇게 생각하시는군요.',
        '더 궁금한 게 있으신가요?',
        '제 이야기를 들어주셔서 감사해요.',
        '그렇게 생각해 주셔서 고마워요.'
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

// 메시지 전송
function sendMessage() {
    const text = messageInput.value.trim();
    
    if (text === '') return;
    
    // 사용자 메시지 추가
    addMessage('sent', text);
    conversationHistory.push({ role: 'user', text });
    
    // 입력창 초기화
    messageInput.value = '';
    
    // 캐릭터 응답
    setTimeout(() => {
        respondToMessage(text);
    }, 500);
}

// 뒤로가기
function goBack() {
    chatScreen.classList.remove('active');
    characterSelectScreen.classList.add('active');
    currentCharacter = null;
    currentMessageIndex = 0;
}

// 앱 시작
init();
