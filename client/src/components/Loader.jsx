const Loader = () => {
  return (
    <div className="loader flex items-center justify-center bg-black bg-opacity-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 h-full w-full">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent relative"></div>
    </div>
  )
}

export default Loader
