import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';

const meta = {
  title: 'UI/Atoms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
shadcn/ui 기반의 Card 컴포넌트입니다. 콘텐츠를 카드 형태로 표시하는 데 사용됩니다.

## Atomic Design 구조
- **Level**: Atoms (UI)
- **Location**: \`components/ui/card.tsx\`
- **Used By**: Features 수준의 컴포넌트들 (UserStats, PostStats 등)

## 구성 요소
- \`Card\`: 메인 컨테이너
- \`CardHeader\`: 카드 헤더 영역 (제목, 설명, 액션 포함 가능)
- \`CardTitle\`: 카드 제목
- \`CardDescription\`: 카드 설명
- \`CardContent\`: 카드 본문 내용
- \`CardFooter\`: 카드 푸터 영역
- \`CardAction\`: 카드 헤더 내 액션 버튼 영역

## 특징
- TailwindCSS 기반 스타일링
- \`cn\` 유틸리티를 통한 클래스 병합 지원
- 완전히 커스터마이징 가능한 스타일
- 접근성을 고려한 구조

## 사용 예시
이 컴포넌트는 Organisms와 Molecules 수준의 컴포넌트에서 사용됩니다:
- \`Molecules/StatsCard\`: 통계 카드 (재사용 가능한 Molecules)
- \`Organisms/UserStats\`: 사용자 통계 카드
- \`Organisms/PostStats\`: 게시글 통계 카드
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 카드 컴포넌트입니다.
 * CardContent만 포함한 가장 간단한 형태입니다.
 * 
 * shadcn/ui Card는 기본적으로 `py-6` (상하 24px) padding을 가지고 있습니다.
 * CardContent는 `px-6` (좌우 24px) padding을 가지고 있습니다.
 */
export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent>
        <p className="text-sm text-muted-foreground">
          기본 카드입니다. CardContent만 포함합니다.
        </p>
      </CardContent>
    </Card>
  ),
};

/**
 * 헤더와 본문이 있는 카드입니다.
 * CardHeader, CardTitle, CardDescription, CardContent를 사용합니다.
 */
export const WithHeader: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>카드 제목</CardTitle>
        <CardDescription>카드에 대한 설명을 여기에 작성합니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>카드 본문 내용입니다. 여기에 주요 콘텐츠를 배치합니다.</p>
      </CardContent>
    </Card>
  ),
};

/**
 * 헤더, 본문, 푸터가 모두 있는 카드입니다.
 * CardFooter를 사용하여 액션 버튼 등을 배치할 수 있습니다.
 */
export const WithFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>프로젝트 설정</CardTitle>
        <CardDescription>프로젝트의 기본 설정을 관리합니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>설정 내용을 여기에 표시합니다.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          취소
        </Button>
        <Button variant="default" size="sm">
          저장
        </Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * 헤더에 액션 버튼이 있는 카드입니다.
 * CardAction을 사용하여 헤더 오른쪽에 액션을 배치할 수 있습니다.
 */
export const WithHeaderAction: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>알림</CardTitle>
        <CardDescription>시스템 알림을 확인하세요.</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            더보기
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>알림 내용이 여기에 표시됩니다.</p>
      </CardContent>
    </Card>
  ),
};

/**
 * 통계 정보를 표시하는 카드 패턴 예시입니다.
 * 
 * 실제 서비스에서는 Features 수준의 컴포넌트로 구현되어 있습니다:
 * - \`Features/Users/UserStats\`: 사용자 통계
 * - \`Features/Posts/PostStats\`: 게시글 통계
 */
export const StatsCard: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Card className="bg-blue-50 border-blue-300 py-3">
        <CardContent className="py-0">
          <div className="text-xs text-gray-600 mb-1">전체</div>
          <div className="text-2xl font-bold text-blue-700">1,234</div>
        </CardContent>
      </Card>
      <Card className="bg-green-50 border-green-300 py-3">
        <CardContent className="py-0">
          <div className="text-xs text-gray-600 mb-1">활성</div>
          <div className="text-2xl font-bold text-green-700">856</div>
        </CardContent>
      </Card>
      <Card className="bg-orange-50 border-orange-300 py-3">
        <CardContent className="py-0">
          <div className="text-xs text-gray-600 mb-1">대기</div>
          <div className="text-2xl font-bold text-orange-700">378</div>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

/**
 * 사용자 프로필 카드 예시입니다.
 * 다양한 정보를 카드 형태로 표시합니다.
 */
export const ProfileCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>사용자 프로필</CardTitle>
        <CardDescription>사용자 정보를 확인하고 관리합니다.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium">이름</p>
          <p className="text-sm text-muted-foreground">홍길동</p>
        </div>
        <div>
          <p className="text-sm font-medium">이메일</p>
          <p className="text-sm text-muted-foreground">hong@example.com</p>
        </div>
        <div>
          <p className="text-sm font-medium">역할</p>
          <p className="text-sm text-muted-foreground">관리자</p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full">
          <Button variant="default" size="sm">
            프로필 수정
          </Button>
        </div>
      </CardFooter>
    </Card>
  ),
};

/**
 * 커스텀 스타일을 적용한 카드입니다.
 * className을 통해 다양한 스타일을 적용할 수 있습니다.
 */
export const CustomStyled: Story = {
  render: () => (
    <Card className="w-[350px] bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
      <CardHeader>
        <CardTitle className="text-purple-900">커스텀 스타일 카드</CardTitle>
        <CardDescription className="text-purple-700">
          그라데이션 배경과 커스텀 색상을 적용했습니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-purple-800">
          TailwindCSS 클래스를 통해 자유롭게 스타일을 커스터마이징할 수 있습니다.
        </p>
      </CardContent>
    </Card>
  ),
};

/**
 * 여러 카드를 그리드로 배치한 예시입니다.
 * 반응형 레이아웃에 사용할 수 있습니다.
 */
export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Card key={item}>
          <CardHeader>
            <CardTitle>카드 {item}</CardTitle>
            <CardDescription>카드 그리드 예시입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>카드 {item}의 내용입니다.</p>
          </CardContent>
          <CardFooter>
            <div className="w-full">
              <Button variant="default" size="sm">
                자세히 보기
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};


