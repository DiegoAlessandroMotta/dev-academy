import '../../styles/layout/footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>ZYNOVA </strong>
           contactanos por
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://api.whatsapp.com/send/?phone=925543023&text=hola &type=phone_number"
          >
            whatsapp
          </a>
          .
        </p>
      </div>
    </footer>
  )
}

export default Footer

