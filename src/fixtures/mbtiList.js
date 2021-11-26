const mbtiList = [
  {
    id: 1,
    name: 'INTJ',
    description: '용의주도한 전략가',
    overview: '상상력이 풍부하며 철두철미한 계획을 세우는 전략가형',
    recommend: ['미스터리', '스릴러', '범죄', 'SF', '음악', '드라마'],
    character: ['Architect'],
    type: ['analysts']
  },
  {
    id: 2,
    name: 'INTP',
    description: '아이디어 뱅크',
    overview: '끊임없이 새로운 지식의 발견을 원하는 혁신가형',
    recommend: ['SF', '미스터리', '액션', '범죄'],
    character: ['Logician'],
    type: ['analysts'] 
  },
  {
    id: 3,
    name: 'ENTJ',
    description: '대담한 지도자',
    overview: '대담하고 상상력이 풍부하며 다양한 방안을 창출하는 리더형',
    recommend: ['스릴러' , '공포', '액션', '범죄', 'SF'],
    character: ['Commander'],
    type: ['analysts'] 
  },
  {
    id: 4,
    name: 'ENTP',
    description: '발명가',
    overview: '지적인 도전을 두려워하지 않는 똑똑한 호기심형',
    recommend: ['코미디', '드라마', '전쟁', '범죄', '로맨스'],
    character: ['Debater'],
    type: ['analysts'] 
  },
  {
    id: 5,
    name: 'INFJ',
    description: '예언자',
    overview: '조용하고 신비로우며 샘솟는 영감으로 지칠 줄 모르는 이상주의자',
    recommend: ['드라마', '스릴러', '공포', '미스터리', '로맨스', '판타지'],
    character: ['Advocate'],
    type: ['diplomats'] 
  },
  {
    id: 6,
    name: 'INFP',
    description: '잔다르크',
    overview: '상냥한 성격의 이타주의자로 밝은 사회 건설에 앞장서는 낭만형',
    recommend: ['판타지', '범죄', '음악', '애니메이션', '모험', '로맨스'],
    character: ['Mediator'],
    type: ['diplomats']  
  },
  {
    id: 7,
    name: 'ENFJ',
    description: '정의로운 사회운동가',
    overview: '넘치는 카리스마와 영향력으로 청중을 압도하는 리더형',
    recommend: ['로맨스', '코미디', '판타지', '애니메이션', '모험'],
    character: ['Protagonist'],
    type: ['diplomats'] 
  },
  {
    id: 8,
    name: 'ENFP',
    description: '재기발랄한 활동가',
    overview: ' 창의적이며 항상 활발한 성격으로 남과 어울리기를 좋아하는 열정형',
    recommend: ['모험', '판타지', '로맨스', '미스터리', '스릴러'],
    character: ['Campaigner'],
    type: ['diplomats']  
  },
  {
    id: 9,
    name: 'ISTJ',
    description: '논리주의자',
    overview: '사실에 근거하여 사고하며 행동이나 결정이 믿음 가는 현실주의자형',
    recommend: ['역사', '드라마', '범죄', '액션', '스릴러'],
    character: ['Logistician'],
    type: ['sentinels'] 
  },
  {
    id: 10,
    name: 'ISFJ',
    description: '용감한 수호자',
    overview: '성실하고 온화하며 헌신적으로 소중한 사람들을 지키는 방어자형',
    recommend: ['가족', '로맨스', '코미디', '판타지', '액션'],
    character: ['Defender'],
    type: ['sentinels']        
  },
  {
    id: 11,
    name: 'ESTJ',
    description: '엄격한 관리자',
    overview: '사물이나 사람을 관리하는데 뛰어난 실력을 갖춘 관리자형',
    recommend: ['드라마', '전쟁', '스릴러', 'SF', '로맨스', '역사'],
    character: ['Executive'],
    type: ['sentinels']
  },
  {
    id: 12,
    name: 'ESFJ',
    description: '사교적인 외교관',
    overview: '친절과 현실감을 바탕으로 타인을 돕는데 열성적인 세심형',
    recommend: ['로맨스', '범죄', '스릴러', 'SF', '드라마', '미스터리'],
    character: ['Consul'],
    type: ['sentinels'],
  },
  {
    id: 13,
    name: 'ISTP',
    description: '만능 재주꾼',
    overview: '대담하고 현실적인 성향으로 다양한 도구 사용에 능숙한 탐험형',
    recommend: ['범죄', '미스터리', '판타지', '코미디', '전쟁', '드라마'],
    character: ['Virtuoso'],
    type: ['explorers']   
  },
  {
    id: 14,
    name: 'ISFP',
    description: '호기심 많은 예술가',
    overview: '항상 새로운 것을 찾아 시도하는 매력 넘치는 예술가형',
    recommend: ['로맨스', '코미디', '스릴러', 'SF', '판타지', '애니메이션'],
    character: ['Adventurer'],
    type: ['explorers']  
  },
  {
    id: 15,
    name: 'ESTP',
    description: '수완좋은 활동가',
    overview: '명석한 두뇌와 에너지 그리고 뛰어난 직관력을 가지고 있는 사업가형',
    recommend: ['액션', '공포', '스릴러', '범죄', '미스터리'],
    character: ['Entrepreneur'],
    type: ['explorers']
  },
  {
    id: 16,
    name: 'ESFP',
    description: '자유로운 영혼의 연예인',
    overview: '주위에 있으면 지루할 틈이 없는 열정과 에너지가 넘치는 연예인형',
    recommend: ['음악', '드라마', '로맨스', '코미디', '애니메이션'],
    character: ['Entertainer'],
    type: ['explorers']   
  },
]

export default mbtiList
