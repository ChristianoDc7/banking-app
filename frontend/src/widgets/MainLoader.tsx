import { Spin } from 'antd'

export const MainLoader = () => {
  return (
    <div className='center-flex full-width full-height' >
      <Spin tip="Loading" size="large" />
    </div>
  )
}
