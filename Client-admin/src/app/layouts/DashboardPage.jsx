import React from 'react'
import DashboardContainer from '../../shared/components/layout/DashboardContainer'
import { Outlet } from 'react-router-dom'

const DashboardPage = () => {
  return (
    <DashboardContainer>
      <Outlet />
    </DashboardContainer>
  )
}

export default DashboardPage