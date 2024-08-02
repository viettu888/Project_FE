import { map, sortBy } from 'lodash'
import { Link } from 'react-router-dom'
import { useGetUserQuery } from '../hooks/useGetUserQuery'
import { useQueryString } from '../utils/common'
import { useEffect, useState } from 'react'
import { IUser } from '../types/user'
const LIMIT = 10

export const StudentManager = () => {
  const queryString: {
    page?: string
  } = useQueryString()
  const page = Number(queryString?.page) || 1
  const totalStudent = 100
  const totalPage = Math.ceil(totalStudent / LIMIT)

  const [userList, setUserList] = useState<IUser[]>() 
  

  const { data, isLoading } = useGetUserQuery({
    page,
    results: 10
  })
  useEffect(() => {
    const sx = sortBy(data, "login.username" )
    setUserList(sx)}, [data])

  return (
    <div>
      <h1 className='text-lg'>List User</h1>

      {isLoading && (
        <div role='status' className='mt-6 animate-pulse'>
          <div className='mb-4 h-4  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10 rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='mb-2.5 h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <div className='h-10  rounded bg-gray-200 dark:bg-gray-700' />
          <span className='sr-only'>Loading...</span>
        </div>
      )}
      {!isLoading && (
        <>
          <div className='relative mt-6 overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
              <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='py-3 px-6'>
                    Fullname
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Username
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Thumbnail
                  </th>
                </tr>
              </thead>
              <tbody>
                {map(userList, (user, index) => (
                  <tr
                    key={index}
                    className='border-b cursor-pointer bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'
                  >
                    <td className='py-4 px-6'>{user.name.title + user.name.first + user.name.last}</td>
                    <td className='py-4 px-6'>{user.login.username}</td>
                    <td className='py-4 px-6'>
                      <img src={user.picture.thumbnail} alt='user' className='h-5 w-5' />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='mt-6 flex justify-center'>
            <nav aria-label='Page navigation example'>
              <ul className='inline-flex -space-x-px'>
                <li>
                  <Link
                    className={`${
                      page === 1 && 'cursor-not-allowed'
                    } rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                    to={`/user?page=${page > 1 ? page - 1 : page}`}
                  >
                    Previous
                  </Link>
                </li>
                {Array(totalPage)
                  .fill(0)
                  .map((_, index) => (
                    <li key={index + 1}>
                      <Link
                        className={`${
                          page === index + 1 ? '!bg-gray-700' : ''
                        } border border-gray-300 bg-white py-2 px-3 leading-tight  text-gray-500 hover:bg-gray-100 hover:text-gray-700`}
                        to={`/user?page=${index + 1}`}
                      >
                        {index + 1}
                      </Link>
                    </li>
                  ))}
                <li>
                  <Link
                    className='rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    to={`/user?page=${page < totalPage ? page + 1 : page}`}
                  >
                    Next
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  )
}
