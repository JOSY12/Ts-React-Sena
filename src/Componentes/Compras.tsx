const Compras = () => {
  return (
    <>
      <div className=' h-screen m-5 border border-black'>
        <div className='w-full flex justify-between items-center mb-3 mt-12 pl-3'>
          <div className='mx-3'>
            <div className='w-full max-w-sm min-w-[200px] relative'></div>
          </div>
        </div>

        <div className='  flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border'>
          <table className='w-full text-left table-auto min-w-max'>
            <thead>
              <tr className='border-b border-slate-300 bg-slate-50'>
                <th className='p-4 text-sm font-normal leading-none text-slate-500'>
                  Product
                </th>
                <th className='p-4 text-sm font-normal leading-none text-slate-500'>
                  Name
                </th>
                <th className='p-4 text-sm font-normal leading-none text-slate-500'>
                  Quantity
                </th>
                <th className='p-4 text-sm font-normal leading-none text-slate-500'>
                  Price per Item
                </th>
                <th className='p-4 text-sm font-normal leading-none text-slate-500'>
                  Total Price
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='hover:bg-slate-50'>
                <td className='p-4 border-b border-slate-200 py-5'>
                  <img
                    src='https://demos.creative-tim.com/corporate-ui-dashboard-pro/assets/img/kam-idris-_HqHX3LBN18-unsplash.jpg'
                    alt='Product 1'
                    className='w-16 h-16 object-cover rounded'
                  />
                </td>
                <td className='p-4 border-b border-slate-200 py-5'>
                  <p className='block font-semibold text-sm text-slate-800'>
                    Beautiful Chair
                  </p>
                </td>
                <td className='p-4 border-b border-slate-200 py-5'>
                  <p className='text-sm text-slate-500'>2</p>
                </td>
                <td className='p-4 border-b border-slate-200 py-5'>
                  <p className='text-sm text-slate-500'>$500</p>
                </td>
                <td className='p-4 border-b border-slate-200 py-5'>
                  <p className='text-sm text-slate-500'>$1,000</p>
                </td>
              </tr>
              <tr className='hover:bg-slate-50'>
                <td className='p-4 border-b border-slate-200 py-5'>
                  <img
                    src='https://demos.creative-tim.com/corporate-ui-dashboard-pro/assets/img/spacejoy-NpF_OYE301E-unsplash.jpg'
                    alt='Product 2'
                    className='w-16 h-16 object-cover rounded'
                  />
                </td>
                <td className='p-4 border-b border-slate-200 py-5'>
                  <p className='block font-semibold text-sm text-slate-800'>
                    Little Sofa
                  </p>
                </td>
                <td className='p-4 border-b border-slate-200 py-5'>
                  <p className='text-sm text-slate-500'>1</p>
                </td>
                <td className='p-4 border-b border-slate-200 py-5'>
                  <p className='text-sm text-slate-500'>$750</p>
                </td>
                <td className='p-4 border-b border-slate-200 py-5'>
                  <p className='text-sm text-slate-500'>$750</p>
                </td>
              </tr>
              <tr className='hover:bg-slate-50'>
                <td className='p-4 border-b border-slate-200 py-5'>
                  <img
                    src='https://demos.creative-tim.com/corporate-ui-dashboard-pro/assets/img/michael-oxendine-GHCVUtBECuY-unsplash.jpg'
                    alt='Product 3'
                    className='w-16 h-16 object-cover rounded'
                  />
                </td>
                <td className='p-4 border-b border-slate-200 py-5'>
                  <p className='block font-semibold text-sm text-slate-800'>
                    Brown Coach
                  </p>
                </td>
                <td className='p-4 border-b border-slate-200 py-5'>
                  <p className='text-sm text-slate-500'>3</p>
                </td>
                <td className='p-4 border-b border-slate-200 py-5'>
                  <p className='text-sm text-slate-500'>$3,000</p>
                </td>
                <td className='p-4 border-b border-slate-200 py-5'>
                  <p className='text-sm text-slate-500'>$9,000</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Compras
