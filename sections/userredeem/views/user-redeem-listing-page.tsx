import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import UserredeemForm from '../user-redeem-tables/user-redeem-fron';
import UserredeemTable from '../user-redeem-tables';
import { GameLink } from '../user-redeem-tables/game-link';

const breadcrumbItems = [
  { title: 'Mypage', link: '/mypage' },
  { title: 'Redeem', link: '/mypage/redeem' }
];

type TEmployeeListingPage = {};

export default async function UserredeemListingPage({}: TEmployeeListingPage) {
  // Showcasing the use of search params cache in nested RSCs

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Redeem`}
            description=""
          />
        </div>
        <Separator />
        <UserredeemForm />
        <p className='py-5 text-medium font-bold text-center'>Redeem History</p>
        <UserredeemTable />
        <GameLink/>
      </div>
    </PageContainer>
  );
}
