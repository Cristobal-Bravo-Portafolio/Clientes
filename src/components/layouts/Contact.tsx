import Image from 'next/image';
import Link from 'next/link';
import Container from '../ui/Container';

const Contact = () => {
  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61555757432658',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
        </svg>
      ),
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/mitsuhanikkei',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
        </svg>
      ),
      color: 'bg-pink-600 hover:bg-pink-700'
    },
    {
      name: 'WhatsApp',
      url: 'https://api.whatsapp.com/send?phone=56979472619',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
      color: 'bg-green-600 hover:bg-green-700'
    }
  ];

  return (
    <section id="contact" className="bg-black text-white py-20">
      <Container>
        <h2 className="text-3xl md:text-4xl font-bold text-center text-yellow-500 mb-12">
          Contacto
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Información de Contacto */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-yellow-500">Ubicación</h3>
              <p className="text-lg">Padre Alfredo Arteaga Barros N°1929 Lo Barnechea</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-yellow-500">Horario de Atención</h3>
              <p className="text-lg">Lunes a Domingo</p>
              <p className="text-lg">12:30 - 23:00 hrs</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-yellow-500">Síguenos en</h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${social.color} p-3 rounded-full transition-transform hover:scale-110`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-yellow-500">Contacto Directo</h3>
              <Link 
                href="tel:+56979472619"
                className="text-lg hover:text-yellow-500 transition-colors"
              >
                +56 9 7947 2619
              </Link>
            </div>
          </div>

          {/* Mapa */}
          <div className="h-[400px] relative rounded-lg overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1661.9612024562817!2d-70.51593684740795!3d-33.35170099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cbf478748ec3%3A0xb871cc8120e9!2sPadre%20Alfredo%20Arteaga%20Barros%201929%2C%20Lo%20Barnechea%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1701745431699!5m2!1ses-419!2scl"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-lg mb-4">¡Ven a disfrutar de la mejor fusión peruano-japonesa!</p>
          <Link 
            href="https://api.whatsapp.com/send?phone=56979472619"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-full text-white font-medium transition-colors"
          >
            {/* WhatsApp icon inline para el botón */}
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Reserva ahora
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default Contact;