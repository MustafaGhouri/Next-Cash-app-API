import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import UserBitcoin from '../bitcoin-fron';

const breadcrumbItems = [
  { title: 'MyPage', link: '/mypage' },
  { title: 'redeem', link: '/mypage/redeem' },
  { title : 'Bitcoin', link: '/mypage/redeem/bitcoin'},
];

type TEmployeeListingPage = {};

export default async function UserBitcoinPage({}: TEmployeeListingPage) {
  // Showcasing the use of search params cache in nested RSCs

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading
            title={`Bitcoin`}
            description=""
          />
        </div>
        <Separator />
        <UserBitcoin/>
      </div>
    </PageContainer>
  );
}
