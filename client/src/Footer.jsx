const Footer = () => {
    return (
      <footer>
        <div className="p-4 lg:px-28 lg:py-8 bg-primary">
        <p className="text-white"> &copy;{new Date().getFullYear()} Dinas Tenaga Kerja Kota Surakarta</p>
        </div>
      </footer>
      // <div className="container bayangan footer">
      //   <div className="row justify-content-between">
      //     <div className="col-sm-12 col-md-6">
      //       <h6 className="p-3 text-light"> &copy;{new Date().getFullYear()} Dinas Tenaga Kerja Kota Surakarta</h6>
      //     </div>
      //     <div className="col-sm-12 col-md-6 p-3 text-end">
      //       <h4 className="text-light mx-2 d-inline"><i className="fa-brands fa-square-github"></i></h4>
      //       <h4 className="text-light mx-2 d-inline"><i className="fa-brands fa-square-twitter"></i></h4>
      //       <h4 className="text-light mx-2 d-inline"><i className="fa-brands fa-square-facebook"></i></h4>
      //       <h4 className="text-light mx-2 d-inline"><i className="fa-brands fa-square-instagram"></i></h4>
      //     </div>
      //   </div>
      // </div>
    );
  };
  
  export default Footer;
  