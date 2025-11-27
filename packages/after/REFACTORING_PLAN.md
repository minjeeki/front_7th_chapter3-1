# 리팩토링 최종 계획서

## 🎯 최종 목표

비즈니스 로직과 UI 로직을 명확히 분리하고, shadcn/ui를 활용한 현대적인 컴포넌트 구조로 개편합니다.

## 📁 최종 폴더 구조

```
src/
├── components/
│   ├── ui/                    # shadcn/ui 기반 순수 UI 컴포넌트
│   │   ├── button.tsx         # shadcn button
│   │   ├── table.tsx          # shadcn table
│   │   ├── dialog.tsx         # shadcn dialog (Modal 대체)
│   │   ├── form.tsx           # shadcn form
│   │   ├── input.tsx          # shadcn input
│   │   ├── select.tsx         # shadcn select
│   │   ├── textarea.tsx       # shadcn textarea
│   │   ├── card.tsx           # shadcn card
│   │   ├── badge.tsx          # shadcn badge
│   │   ├── alert.tsx          # shadcn alert
│   │   └── label.tsx          # shadcn label
│   │
│   └── shared/                # 공통 컴포넌트 (도메인 독립적)
│       ├── DataTable/         # 범용 데이터 테이블 (선택사항)
│       └── StatsCard/         # 통계 카드 (선택사항)
│
├── features/                  # 도메인별 기능 컴포넌트 (Feature-based)
│   ├── users/
│   │   ├── components/
│   │   │   ├── UserTable.tsx      # User 전용 테이블
│   │   │   ├── UserForm.tsx       # User 전용 폼
│   │   │   ├── UserStats.tsx      # User 통계
│   │   │   └── UserActions.tsx    # User 액션 버튼들
│   │   └── index.ts
│   │
│   └── posts/
│       ├── components/
│       │   ├── PostTable.tsx      # Post 전용 테이블
│       │   ├── PostForm.tsx       # Post 전용 폼
│       │   ├── PostStats.tsx      # Post 통계
│       │   └── PostActions.tsx    # Post 액션 버튼들
│       └── index.ts
│
├── hooks/                     # 비즈니스 로직 hooks
│   ├── useUserManagement.ts   # User 관리 hook
│   ├── usePostManagement.ts   # Post 관리 hook
│   ├── useNotification.ts     # 알림 관리 hook
│   └── index.ts
│
├── domains/                   # 도메인 모델 및 로직
│   ├── user/
│   │   ├── types.ts           # User 타입 정의
│   │   ├── validations.ts     # User 검증 로직 (Zod 스키마)
│   │   ├── constants.ts       # User 상수 (role, status 등)
│   │   ├── mappers.ts         # User 데이터 변환 로직
│   │   └── index.ts
│   │
│   └── post/
│       ├── types.ts           # Post 타입 정의
│       ├── validations.ts     # Post 검증 로직 (Zod 스키마)
│       ├── constants.ts       # Post 상수 (category, status 등)
│       ├── mappers.ts         # Post 데이터 변환 로직
│       └── index.ts
│
├── services/                  # API 서비스 (기존 유지, 타입만 변경)
│   ├── userService.ts         # domains/user 타입 사용
│   └── postService.ts         # domains/post 타입 사용
│
└── pages/
    └── ManagementPage.tsx     # 얇은 컨테이너 (라우팅만 담당)
```

## 🔄 Before vs After 비교

### Before (현재 문제점)

1. **ManagementPage.tsx (648줄)**
   - 모든 비즈니스 로직이 페이지에 집중
   - 상태 관리, API 호출, UI 렌더링이 모두 섞여있음

2. **Table 컴포넌트**
   - `entityType` prop으로 도메인을 알고 있음
   - 도메인별 렌더링 로직이 컴포넌트 내부에 있음

3. **Button 컴포넌트**
   - 비즈니스 규칙을 판단함 (관리자 삭제 불가 등)
   - 도메인 타입을 알고 있음

4. **FormInput 컴포넌트**
   - 도메인 검증 로직이 컴포넌트 내부에 있음
   - 비즈니스 규칙을 알고 있음

### After (개선 목표)

1. **ManagementPage.tsx (약 100줄)**
   - 얇은 컨테이너 역할만
   - features 컴포넌트 조합만 담당

2. **shadcn/ui Table**
   - 순수 UI만 담당
   - 도메인을 전혀 모름

3. **UserTable, PostTable (features)**
   - 각 도메인별 렌더링 로직 담당
   - shadcn/ui Table을 사용하여 구현

4. **shadcn/ui Button**
   - 순수 UI만 담당
   - 비즈니스 규칙을 모름

5. **UserActions, PostActions (features)**
   - 비즈니스 규칙 담당
   - shadcn/ui Button을 사용하여 구현

6. **UserForm, PostForm (features)**
   - react-hook-form + zod로 검증
   - shadcn/ui Form 컴포넌트 사용

## 📋 단계별 마이그레이션 계획

### Step 1: 도메인 모델 분리 (커밋 1)
**목표**: 타입과 상수를 domains 폴더로 분리

- [ ] `domains/user/types.ts` 생성 (User 타입 정의)
- [ ] `domains/user/constants.ts` 생성 (USER_ROLES, USER_STATUSES 등)
- [ ] `domains/post/types.ts` 생성 (Post 타입 정의)
- [ ] `domains/post/constants.ts` 생성 (POST_CATEGORIES, POST_STATUSES 등)
- [ ] `services/userService.ts`에서 domains/user 타입 import
- [ ] `services/postService.ts`에서 domains/post 타입 import

**검증**: 기존 코드가 정상 동작하는지 확인

---

### Step 2: 도메인 검증 로직 분리 (커밋 2)
**목표**: Zod 스키마로 검증 로직 분리

- [ ] `domains/user/validations.ts` 생성 (createUserSchema, updateUserSchema)
- [ ] `domains/post/validations.ts` 생성 (createPostSchema, updatePostSchema)
- [ ] 기존 FormInput의 검증 로직은 유지 (나중에 교체 예정)

**검증**: 스키마가 올바르게 정의되었는지 확인

---

### Step 3: 도메인 유틸리티 함수 분리 (커밋 3)
**목표**: 통계 계산, 테이블 컬럼 정의 등을 mappers로 분리

- [ ] `domains/user/mappers.ts` 생성
  - `calculateUserStats()` 함수
  - `getUserTableColumns()` 함수
- [ ] `domains/post/mappers.ts` 생성
  - `calculatePostStats()` 함수
  - `getPostTableColumns()` 함수
- [ ] ManagementPage에서 이 함수들 사용하도록 변경

**검증**: 통계와 테이블이 정상 동작하는지 확인

---

### Step 4: 비즈니스 로직 hooks 생성 (커밋 4)
**목표**: 상태 관리와 API 호출을 hooks로 분리

- [ ] `hooks/useUserManagement.ts` 생성
  - users 상태, loading, error
  - loadUsers, createUser, updateUser, deleteUser 함수
- [ ] `hooks/usePostManagement.ts` 생성
  - posts 상태, loading, error
  - loadPosts, createPost, updatePost, deletePost, publishPost, archivePost, restorePost 함수
- [ ] `hooks/useNotification.ts` 생성
  - 알림 상태 관리
- [ ] ManagementPage에서 이 hooks 사용하도록 변경

**검증**: 기존 기능이 정상 동작하는지 확인

---

### Step 5: shadcn/ui 컴포넌트 설치 (커밋 5)
**목표**: shadcn/ui 기본 컴포넌트 설치

- [ ] 필요한 패키지 설치 (zod, react-hook-form, @hookform/resolvers)
- [ ] shadcn/ui 컴포넌트 설치
  - button, table, dialog, form, input, select, textarea, card, badge, alert, label

**검증**: 컴포넌트가 정상적으로 생성되었는지 확인

---

### Step 6: User 도메인 features 생성 (커밋 6)
**목표**: User 관련 컴포넌트를 features/users로 분리

- [ ] `features/users/components/UserStats.tsx` 생성
  - calculateUserStats 사용
  - 기존 스타일 유지 (나중에 shadcn card로 교체)
- [ ] `features/users/components/UserActions.tsx` 생성
  - 비즈니스 규칙 담당 (관리자 삭제 불가 등)
  - 기존 Button 사용 (나중에 shadcn button으로 교체)
- [ ] `features/users/components/UserTable.tsx` 생성
  - getUserTableColumns 사용
  - 기존 Table 컴포넌트 사용 (나중에 shadcn table로 교체)
  - UserActions 사용
- [ ] `features/users/components/UserForm.tsx` 생성
  - react-hook-form + zod 사용
  - 기존 FormInput 사용 (나중에 shadcn form으로 교체)
- [ ] ManagementPage에서 UserTable, UserForm, UserStats 사용

**검증**: User 관리 기능이 정상 동작하는지 확인

---

### Step 7: Post 도메인 features 생성 (커밋 7)
**목표**: Post 관련 컴포넌트를 features/posts로 분리

- [ ] `features/posts/components/PostStats.tsx` 생성
- [ ] `features/posts/components/PostActions.tsx` 생성
- [ ] `features/posts/components/PostTable.tsx` 생성
- [ ] `features/posts/components/PostForm.tsx` 생성
- [ ] ManagementPage에서 PostTable, PostForm, PostStats 사용

**검증**: Post 관리 기능이 정상 동작하는지 확인

---

### Step 8: ManagementPage 리팩토링 (커밋 8)
**목표**: ManagementPage를 얇은 컨테이너로 변경

- [ ] 기존 로직을 features와 hooks로 위임
- [ ] 상태 관리는 hooks에서 처리
- [ ] UI는 features 컴포넌트로 구성
- [ ] 코드 라인 수 대폭 감소 (648줄 → 약 100줄)

**검증**: 모든 기능이 정상 동작하는지 확인

---

### Step 9: shadcn/ui로 UI 컴포넌트 교체 (커밋 9-12)
**목표**: 기존 컴포넌트를 shadcn/ui로 교체

#### 9-1. Button 교체 (커밋 9)
- [ ] UserActions, PostActions에서 shadcn button 사용
- [ ] ManagementPage에서 shadcn button 사용

#### 9-2. Form 교체 (커밋 10)
- [ ] UserForm에서 shadcn form, input, select 사용
- [ ] PostForm에서 shadcn form, input, select, textarea 사용

#### 9-3. Table 교체 (커밋 11)
- [ ] UserTable에서 shadcn table 사용
- [ ] PostTable에서 shadcn table 사용

#### 9-4. Dialog, Alert 교체 (커밋 12)
- [ ] ManagementPage에서 shadcn dialog 사용 (Modal 대체)
- [ ] ManagementPage에서 shadcn alert 사용 (Alert 대체)

**검증**: 각 단계마다 UI가 정상 동작하는지 확인

---

### Step 10: 정리 및 최적화 (커밋 13)
**목표**: 불필요한 파일 제거 및 최종 정리

- [ ] 기존 atoms, molecules, organisms 컴포넌트 제거 (또는 deprecated 표시)
- [ ] 사용하지 않는 import 정리
- [ ] 타입 에러 수정
- [ ] 최종 테스트

---

## 🎨 각 계층의 역할

### 1. `domains/` - 도메인 모델 및 로직
- **역할**: 순수한 도메인 로직
- **특징**: UI와 완전히 분리, 재사용 가능
- **포함**: 타입, 검증, 상수, 유틸리티 함수

### 2. `services/` - API 서비스
- **역할**: 외부 API와의 통신
- **특징**: domains 타입 사용, 비즈니스 로직 최소화

### 3. `hooks/` - 비즈니스 로직 hooks
- **역할**: 상태 관리와 API 호출 조합
- **특징**: 재사용 가능한 비즈니스 로직

### 4. `components/ui/` - 순수 UI 컴포넌트
- **역할**: shadcn/ui 기반 재사용 가능한 UI
- **특징**: 도메인을 전혀 모름, props로 받은 데이터만 렌더링

### 5. `features/` - 도메인별 기능 컴포넌트
- **역할**: 특정 도메인의 비즈니스 로직과 UI 결합
- **특징**: 도메인별 특수한 렌더링 로직 포함

### 6. `pages/` - 페이지 컴포넌트
- **역할**: 라우팅 및 레이아웃만 담당
- **특징**: 얇은 컨테이너, features 조합만

## ✅ 검증 기준

각 단계마다 다음을 확인:

1. **기능 동작**: 기존 기능이 정상 동작하는가?
2. **타입 안전성**: TypeScript 에러가 없는가?
3. **코드 품질**: 린터 에러가 없는가?
4. **테스트**: 기존 테스트가 통과하는가?

## 📝 참고사항

- 각 단계는 독립적으로 커밋 가능해야 함
- 한 단계에서 문제가 생기면 이전 단계로 롤백 가능해야 함
- 기존 코드는 최대한 유지하면서 점진적으로 변경
- shadcn/ui 교체는 마지막 단계에서 진행

