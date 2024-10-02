import {useContext} from 'react'
import {LoadingContext} from '@/context/loadingContext'

const Spinner = () => {
  const {loading, setLoading} = useContext(LoadingContext)
  return (
     <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
  )
}
export {loading , setLoading}
export default Spinner
