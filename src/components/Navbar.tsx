interface NavbarProps{
    cartItemNumbers: number;
}

const Navbar = ({cartItemNumbers}: NavbarProps) => {
  return (
    <div>Navbar: {cartItemNumbers}</div>
  )
}

export default Navbar