import { useEffect } from 'react';
import { MyRoutes } from './router/MyRoutes'
import { useAdminStore } from './store/adminStore'

const App = () => {
  const { checkAdminSession } = useAdminStore();
  

  useEffect(() => {
    checkAdminSession();
  }, [checkAdminSession])

  return (
    <div className='absolute top-0 bottom-0 left-0 right-0'>
      <MyRoutes />
    </div>
  )
}

export default App
