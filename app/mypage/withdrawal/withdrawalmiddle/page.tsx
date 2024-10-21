import { searchParamsCache } from '@/lib/searchparams';
import { UserWithdrawalMiddlePage } from '@/sections/userwithdrawalmiddle/views';
import { SearchParams } from 'nuqs/parsers';
import React from 'react';

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: 'MyPage : Deposit : Middle'
};

export default async function Page({ searchParams }: pageProps) {
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  return <UserWithdrawalMiddlePage/>;
}
