import logo from "../assets/logo.png"

export function Header() {
    return (
      <>
        <div className="border-b w-full relative flex items-center justify-center" style={{ height: '100px' }}>
            <img src={logo} alt="Logo" className="h-24" style={{ marginBottom: '-95px' }} />
        </div>
      </>
    )
  }
  