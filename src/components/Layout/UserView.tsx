import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
import Header from './Header'
import SystemBanner from './SystemBanner'
import ToastContainer from '@/components/ui/ToastContainer'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchOwnedGroups } from '@/redux/asyncThunks/billing'

const UserView: React.FC = () => {
  const dispatch = useAppDispatch()
  const ownedGroupsLoaded = useAppSelector(
    (state) => state.billing.ownedGroupsLoaded
  )

  useEffect(() => {
    if (!ownedGroupsLoaded) {
      dispatch(fetchOwnedGroups())
    }
  }, [dispatch, ownedGroupsLoaded])

  return (
    <div className='flex h-screen flex-col print:h-auto'>
      <Header />
      <SystemBanner />
      <div className='flex min-h-0 flex-1 overflow-hidden print:block print:overflow-visible'>
        <SideBar />
        <main className='min-h-0 min-w-0 flex-1 overflow-auto print:overflow-visible'>
          <Outlet />
        </main>
      </div>
      <ToastContainer />
    </div>
  )
}

export default UserView
