// 캐릭터 데이터
const charactersData = [
    {
        id: 'tuoi',
        name: 'Nguyen Thi Tuoi',
        age: '28세',
        nationality: '베트남',
        occupation: '이주 노동자',
        description: '한국에 온 지 6개월 된 베트남 출신 이주 노동자',
        profile_image: '👩🏻',
        background_color: '#FFE4E1'
    },
    {
        id: 'antonio',
        name: 'Antonio Martinez',
        age: '42세',
        nationality: '멕시코',
        occupation: '식당 사장',
        description: '멕시코 타코 전문점을 운영하는 사장님',
        profile_image: '👨🏽',
        background_color: '#FFF8DC'
    },
    {
        id: 'jihoon',
        name: '김지훈',
        age: '29세',
        nationality: '한국',
        occupation: 'IT 개발자',
        description: '혼자 사는 1인 가구 청년',
        profile_image: '👨🏻',
        background_color: '#E6F3FF'
    },
    {
        id: 'sujeong',
        name: '박수정',
        age: '35세',
        nationality: '한국',
        occupation: '프리랜서 디자이너',
        description: '반려견 초코와 함께 사는 디자이너',
        profile_image: '👩🏻',
        background_color: '#FFF0F5'
    },
    {
        id: 'kyungsoo',
        name: '최경수',
        age: '67세',
        nationality: '한국',
        occupation: '은퇴',
        description: '전통적인 가치관을 가진 어르신',
        profile_image: '👴🏻',
        background_color: '#F0F0F0'
    }
];

// 메시지 데이터
const messagesData = [
    // Tuoi (베트남 이주 노동자) - 6 stages
    {
        id: 'tuoi_1',
        character_id: 'tuoi',
        sequence: 1,
        sender: 'character',
        text: '{name} 님, 안녕하세요... 저는 베트남에서 온 지 6개월 됐어요. 한국 생활이 처음이라 많이 힘들어요. 특히 시어머니랑 사는 게 제일 힘들어요.',
        trigger_keywords: ['안녕', '생활', '힘든', '가족', '어떠세요', '혹시']
    },
    {
        id: 'tuoi_2',
        character_id: 'tuoi',
        sequence: 2,
        sender: 'character',
        text: '네... 제가 낮잠을 잤는데, 시어머니가 "한국 사람은 낮잠 안 잔다"면서 화를 내셨어요. 베트남에서는 점심 먹고 낮잠 자는 게 당연한데...',
        trigger_keywords: ['낮잠', '왜', '무슨']
    },
    {
        id: 'tuoi_3',
        character_id: 'tuoi',
        sequence: 3,
        sender: 'character',
        text: '"게을러 보인다", "며느리가 낮에 누워 있으면 안 된다"고 하셨어요. 저는 일하고 와서 피곤해서 잠깐 쉬는 건데... 정말 속상했어요.',
        trigger_keywords: ['혼내', '왜 혼내', '속상', '무슨 말']
    },
    {
        id: 'tuoi_4',
        character_id: 'tuoi',
        sequence: 4,
        sender: 'character',
        text: '네! 베트남은 날씨가 더워서 점심 먹고 낮잠 자는 게 문화예요. 시에스타(siesta)처럼요. 모두가 그렇게 해요. 그런데 한국에서는 이상하게 보시나 봐요...',
        trigger_keywords: ['베트남', '당연', '문화', '원래']
    },
    {
        id: 'tuoi_5',
        character_id: 'tuoi',
        sequence: 5,
        sender: 'character',
        text: '맞아요... 제가 시어머니께 설명했지만 "여기는 한국이니까 한국 방식대로 살아야 한다"고 하셨어요. 문화가 다르다는 걸 이해해 주셨으면 좋겠어요.',
        trigger_keywords: ['차이', '힘들', '어려', '문제']
    },
    {
        id: 'tuoi_6',
        character_id: 'tuoi',
        sequence: 6,
        sender: 'character',
        text: '{name} 님, 고마워요. 그렇게 말씀해 주시니 마음이 좀 편해져요. 서로 다른 문화를 존중하면서 살아가는 게 정말 중요한 것 같아요.',
        trigger_keywords: ['이해', '존중', '중요', '맞아']
    },

    // Antonio (멕시코 식당 사장) - 5 stages
    {
        id: 'antonio_1',
        character_id: 'antonio',
        sequence: 1,
        sender: 'character',
        text: '아, {name} 님! 어서 오세요! 네, 요즘 장사가 정말 잘돼요. 다양한 문화가 섞이면서 새로운 메뉴를 만들 수 있어서 좋아요!',
        trigger_keywords: ['안녕', '사장님', '손님', '다양한', '좋은', '가게']
    },
    {
        id: 'antonio_2',
        character_id: 'antonio',
        sequence: 2,
        sender: 'character',
        text: '네! 불고기 타코예요! 멕시코 타코에 한국 불고기를 넣은 퓨전 메뉴인데, 대박이에요! 한국 사람들도 외국 사람들도 다 좋아해요!',
        trigger_keywords: ['타코', '신기', '뭐', '어떤', '불고기']
    },
    {
        id: 'antonio_3',
        character_id: 'antonio',
        sequence: 3,
        sender: 'character',
        text: '처음에는 손님이 "멕시코 음식만 해달라"고 했는데, 한국 불고기가 맛있어서 타코에 넣어봤어요. 그랬더니 손님들이 "이거 완전 맛있다!"고 해서 계속 팔고 있어요!',
        trigger_keywords: ['어떻게', '만들', '왜', '생각']
    },
    {
        id: 'antonio_4',
        character_id: 'antonio',
        sequence: 4,
        sender: 'character',
        text: '감사합니다! 하하! 이제는 김치도 넣고, 고추장 소스도 만들어요. 다양한 문화가 만나면 정말 신기하고 좋은 게 나와요!',
        trigger_keywords: ['대박', '좋은', '아이디어', '최고']
    },
    {
        id: 'antonio_5',
        character_id: 'antonio',
        sequence: 5,
        sender: 'character',
        text: '{name} 님, 정말 고마워요! 앞으로도 한국과 멕시코 문화를 섞어서 더 맛있는 요리 만들게요! 다음에 꼭 오세요!',
        trigger_keywords: ['멋지', '최고', '감사', '응원']
    },

    // 김지훈 (1인 가구) - 5 stages
    {
        id: 'jihoon_1',
        character_id: 'jihoon',
        sequence: 1,
        sender: 'character',
        text: '아, {name} 님! 맞아요, 저 혼자 살아요. 요즘은 혼자 사는 사람들이 정말 많아졌잖아요. 예전보다 훨씬 편리해진 점이 많아요!',
        trigger_keywords: ['안녕', '1인', '혼자', '생활', '편리', '좋은']
    },
    {
        id: 'jihoon_2',
        character_id: 'jihoon',
        sequence: 2,
        sender: 'character',
        text: '네! 예전에는 큰 포장만 있었는데, 요즘은 1인 가구용 소포장 제품이 정말 많아요. 1인분 반찬, 1인분 밥, 작은 과일 팩... 다 있어요!',
        trigger_keywords: ['마트', '1인', '제품', '있나']
    },
    {
        id: 'jihoon_3',
        character_id: 'jihoon',
        sequence: 3,
        sender: 'character',
        text: '예를 들면 1인용 김치, 계란 6개들이, 200ml 우유, 작은 수박 같은 거요. 예전에는 다 크게만 팔아서 혼자 먹기 힘들었는데, 이제는 딱 맞게 살 수 있어요!',
        trigger_keywords: ['어떤', '제품', '예를 들면', '뭐가']
    },
    {
        id: 'jihoon_4',
        character_id: 'jihoon',
        sequence: 4,
        sender: 'character',
        text: '취미도 혼자 즐기기 좋아졌어요! 혼자 영화관 가고, 혼밥하고, 온라인 모임도 많이 생겼어요. 누가 뭐라 안 하고, 자유롭게 제가 하고 싶은 걸 해요!',
        trigger_keywords: ['취미', '여가', '활동', '어때', '어떤지', '좋아진', '또 어떤']
    },
    {
        id: 'jihoon_5',
        character_id: 'jihoon',
        sequence: 5,
        sender: 'character',
        text: '{name} 님, 맞아요! 정말 자유롭고 좋아요! 예전에는 "왜 혼자 사냐"고 물어봤는데, 이제는 다들 이해해 줘서 편해요!',
        trigger_keywords: ['자유', '좋네', '멋지', '최고']
    },

    // 박수정 (반려동물) - 4 stages
    {
        id: 'sujeong_1',
        character_id: 'sujeong',
        sequence: 1,
        sender: 'character',
        text: '아, {name} 님! 초코는 잘 있어요. 근데 요즘 좀 속상한 일이 있었어요. 아파트 옆집 할머니가 초코 때문에 불평하셨거든요...',
        trigger_keywords: ['안녕', '초코', '반려', '속상', '힘든']
    },
    {
        id: 'sujeong_2',
        character_id: 'sujeong',
        sequence: 2,
        sender: 'character',
        text: '초코가 가끔 짖는데, 할머니가 "개 키우지 말라"고 하셨어요. 그리고 엘리베이터에서 만나면 피하세요. 초코는 정말 착한 강아지인데...',
        trigger_keywords: ['어떤', '힘든', '왜', '뭐가']
    },
    {
        id: 'sujeong_3',
        character_id: 'sujeong',
        sequence: 3,
        sender: 'character',
        text: '할머니는 "개는 집에서 키우는 게 아니다", "더럽다"고 하시더라고요. 저는 초코를 매일 목욕시키고 산책도 시키는데... 반려동물에 대한 인식이 아직 안 좋으신 것 같아요.',
        trigger_keywords: ['무슨', '일', '왜 그러', '어떻게']
    },
    {
        id: 'sujeong_4',
        character_id: 'sujeong',
        sequence: 4,
        sender: 'character',
        text: '{name} 님, 고마워요. 반려동물도 가족인데, 서로 이해하면서 살아가면 좋겠어요. 할머니께도 잘 설명드려볼게요.',
        trigger_keywords: ['속상', '이해', '존중', '괜찮']
    },

    // 최경수 (전통적 어르신) - 4 stages
    {
        id: 'kyungsoo_1',
        character_id: 'kyungsoo',
        sequence: 1,
        sender: 'character',
        text: '요즘 젊은 사람들은 뭐가 그리 바쁜지 결혼도 안 하고 혼자 살더라고. 우리 때는 안 그랬는데... 젊은이, 자네도 그런가?',
        trigger_keywords: ['어르신', '안녕', '요즘', '비혼', '결혼', '혼자']
    },
    {
        id: 'kyungsoo_2',
        character_id: 'kyungsoo',
        sequence: 2,
        sender: 'character',
        text: '그렇지? 요즘은 다들 혼자 살고, 결혼도 안 하고... 나는 이해가 안 되네. 결혼해서 애 낳고 사는 게 정상 아닌가?',
        trigger_keywords: ['네', '그런', '맞아', '많아']
    },
    {
        id: 'kyungsoo_3',
        character_id: 'kyungsoo',
        sequence: 3,
        sender: 'character',
        text: '글쎄... 결혼 안 하면 늙어서 외롭지 않나? 애도 없고. 우리 때는 당연히 결혼하고 가정 꾸렸는데... 요즘은 다들 자기 멋대로네.',
        trigger_keywords: ['문제', '왜', '이상', '안 좋']
    },
    {
        id: 'kyungsoo_4',
        character_id: 'kyungsoo',
        sequence: 4,
        sender: 'character',
        text: '음... 자네 말도 일리가 있네. 시대가 변했으니... 나도 좀 더 이해하려고 노력해 봐야겠어. 각자 살고 싶은 대로 사는 게 맞는지도 모르지.',
        trigger_keywords: ['다양한', '존중', '선택', '중요', '생각']
    }
];
