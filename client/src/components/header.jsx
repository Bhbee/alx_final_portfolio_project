import logo from './assets/pic.jpg'

function header() {
  return (
   <nav className= 'navbar bg-light mb-4 p-0'>
    <div className= 'container'>
        <a className= 'navbar-brand' href='/'> 
            <div className= 'd-flex'>
                <img src= {logo} alt= 'logo' className= 'mr-2'/>
                <div>Order & Delivery Mgmt</div>
            </div>
        </a>
    </div>
   </nav>
  )
}

export default header