import '../../styles/layout/footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>CDVO</strong> de zain (yukio).
          contactanos por whatsapp
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://api.whatsapp.com/send/?phone=925543023&text=hola &type=phone_number"
          >
            whatsapp
          </a>
          . o por
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/61562600173989/"
          >
            Facebook
          </a>
          .
        </p>
      </div>
    </footer>
  )
}

export default Footer

