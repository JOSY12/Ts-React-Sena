const Cargando = () => {
  return (
    <>
      <div className='flex items-center justify-center min-h-screen'>
        <div
          style={{ borderTopColor: 'transparent' }}
          className='w-8 h-8 border-4 border-black rounded-full animate-spin'
        ></div>
        <p className='ml-2'>cargando...</p>
      </div>
    </>
  )
}

export default Cargando
