import { useState, useEffect, useRef } from 'react'
import { Search, Menu, X, ChevronRight, Phone, Mail, MessageCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'

export function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [activeSubmenu, setActiveSubmenu] = useState<string>('oferta-puebla')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleMenuEnter = (menu: string, defaultSubmenu: string) => {
    setActiveMenu(menu)
    setActiveSubmenu(defaultSubmenu)
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#330154] text-white text-sm py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="hidden md:flex items-center gap-6">
            <a href="tel:2222669489" className="flex items-center gap-2 hover:text-[#FCD100] transition-colors">
              <Phone className="w-4 h-4" />
              <span>22 22 66 94 88</span>
            </a>
            <a href="mailto:info@uvp.mx" className="flex items-center gap-2 hover:text-[#FCD100] transition-colors">
              <Mail className="w-4 h-4" />
              <span>info@uvp.mx</span>
            </a>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <a href="https://api.whatsapp.com/send?phone=522211113248" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#FCD100] transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <span className="text-white/30">|</span>
            <a href="https://apps.ol.uvp.mx/authn/login" target="_blank" rel="noopener noreferrer" className="hover:text-[#FCD100] transition-colors font-medium">
              Acceso UVP Online
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav 
        ref={menuRef}
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${isScrolled ? 'shadow-lg' : ''}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 flex-shrink-0">
              <div className="w-12 h-12 bg-[#91268f] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">UVP</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-[#330154] font-bold text-lg leading-tight block">Universidad del</span>
                <span className="text-[#91268f] font-bold text-lg leading-tight block">Valle de Puebla</span>
              </div>
            </a>

            {/* Desktop Navigation - Centered */}
            <div className="hidden xl:flex items-center justify-center flex-1">
              <ul className="nav-items flex items-center gap-1">
                
                {/* OFERTA ACADÉMICA */}
                <li 
                  className="nav-item relative"
                  onMouseEnter={() => handleMenuEnter('oferta', 'oferta-puebla')}
                >
                  <button className={`nav-btn px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeMenu === 'oferta' ? 'bg-[#FCD100] text-[#330154]' : 'text-[#330154] hover:bg-[#FCD100]'
                  }`}>
                    Oferta Académica
                  </button>
                  {activeMenu === 'oferta' && (
                    <div className="mega-wrap absolute top-full left-1/2 -translate-x-1/2 pt-2">
                      <div className="mega-inner bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex" style={{ width: '900px' }}>
                        <div className="mega-sidebar w-48 bg-gray-50 border-r border-gray-100 p-4">
                          <div 
                            className={`sidebar-item px-4 py-3 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${activeSubmenu === 'oferta-puebla' ? 'bg-[#91268f] text-white' : 'text-[#330154] hover:bg-[#FCD100]'}`}
                            onClick={() => setActiveSubmenu('oferta-puebla')}
                          >
                            Puebla <ChevronRight className="w-4 h-4" />
                          </div>
                          <div 
                            className={`sidebar-item px-4 py-3 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${activeSubmenu === 'oferta-tehuacan' ? 'bg-[#91268f] text-white' : 'text-[#330154] hover:bg-[#FCD100]'}`}
                            onClick={() => setActiveSubmenu('oferta-tehuacan')}
                          >
                            Tehuacán <ChevronRight className="w-4 h-4" />
                          </div>
                          <div 
                            className={`sidebar-item px-4 py-3 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${activeSubmenu === 'oferta-tlaxcala' ? 'bg-[#91268f] text-white' : 'text-[#330154] hover:bg-[#FCD100]'}`}
                            onClick={() => setActiveSubmenu('oferta-tlaxcala')}
                          >
                            Tlaxcala <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                        <div className="mega-content flex-1 p-6">
                          <div className={`content-panel ${activeSubmenu === 'oferta-puebla' ? 'block' : 'hidden'}`}>
                            <div className="content-grid grid grid-cols-3 gap-4">
                              {['Preparatoria', 'Técnico Superior', 'Licenciaturas e Ingenierías', 'Sistema Abierto', 'Posgrados', 'Especialidades', 'Becas', 'UVP Online', 'Educación Continua'].map((item) => (
                                <a key={item} href="#" className="content-item group p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                  <div className="content-item-header flex items-center gap-2 mb-2">
                                    <div className="content-dot w-2 h-2 bg-[#91268f] rounded-full"></div>
                                    <span className="content-title font-semibold text-[#330154] group-hover:text-[#91268f]">{item}</span>
                                  </div>
                                  <p className="content-desc text-sm text-gray-500 mb-2">Breve descripción sobre la modalidad</p>
                                  <span className="content-link text-sm text-[#91268f]">Saber más ›</span>
                                </a>
                              ))}
                            </div>
                          </div>
                          <div className={`content-panel ${activeSubmenu === 'oferta-tehuacan' ? 'block' : 'hidden'}`}>
                            <div className="content-grid grid grid-cols-2 gap-4">
                              {['Preparatoria', 'Licenciaturas e Ingenierías', 'Posgrados', 'Becas'].map((item) => (
                                <a key={item} href="#" className="content-item group p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                  <div className="content-item-header flex items-center gap-2 mb-2">
                                    <div className="content-dot w-2 h-2 bg-[#91268f] rounded-full"></div>
                                    <span className="content-title font-semibold text-[#330154] group-hover:text-[#91268f]">{item}</span>
                                  </div>
                                  <p className="content-desc text-sm text-gray-500 mb-2">Breve descripción</p>
                                  <span className="content-link text-sm text-[#91268f]">Saber más ›</span>
                                </a>
                              ))}
                            </div>
                          </div>
                          <div className={`content-panel ${activeSubmenu === 'oferta-tlaxcala' ? 'block' : 'hidden'}`}>
                            <div className="content-grid grid grid-cols-2 gap-4">
                              {['Preparatoria', 'Licenciaturas e Ingenierías', 'Posgrados'].map((item) => (
                                <a key={item} href="#" className="content-item group p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                  <div className="content-item-header flex items-center gap-2 mb-2">
                                    <div className="content-dot w-2 h-2 bg-[#91268f] rounded-full"></div>
                                    <span className="content-title font-semibold text-[#330154] group-hover:text-[#91268f]">{item}</span>
                                  </div>
                                  <p className="content-desc text-sm text-gray-500 mb-2">Breve descripción</p>
                                  <span className="content-link text-sm text-[#91268f]">Saber más ›</span>
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="mega-right w-56 bg-gray-50 p-6 border-l border-gray-100">
                          <div className="mb-6">
                            <div className="right-section-title text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Inicio de clases</div>
                            <div className="highlight-card bg-white p-4 rounded-xl shadow-sm">
                              <div className="highlight-title font-bold text-[#330154]">20 de Agosto 2026</div>
                              <div className="highlight-desc text-sm text-gray-500">Registro abierto hasta julio</div>
                            </div>
                          </div>
                          <div>
                            <div className="right-section-title text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Accesos Rápidos</div>
                            <div className="space-y-2">
                              {['Cuotas', 'Requisitos de inscripción', 'Club de Beneficios', 'Preguntas Frecuentes'].map((item) => (
                                <a key={item} href="#" className="quick-link flex items-center gap-2 text-sm text-[#330154] hover:text-[#91268f] transition-colors">
                                  <div className="content-dot w-1.5 h-1.5 bg-[#91268f] rounded-full"></div>
                                  {item}
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>

                {/* VIDA UVP */}
                <li 
                  className="nav-item relative"
                  onMouseEnter={() => handleMenuEnter('vida', 'vida-eventos')}
                >
                  <button className={`nav-btn px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeMenu === 'vida' ? 'bg-[#FCD100] text-[#330154]' : 'text-[#330154] hover:bg-[#FCD100]'
                  }`}>
                    Vida UVP
                  </button>
                  {activeMenu === 'vida' && (
                    <div className="mega-wrap absolute top-full left-1/2 -translate-x-1/2 pt-2">
                      <div className="mega-inner bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex" style={{ width: '900px' }}>
                        <div className="mega-sidebar w-56 bg-gray-50 border-r border-gray-100 p-4">
                          {[
                            { id: 'vida-miyana', label: 'Miyana' },
                            { id: 'vida-eventos', label: 'Eventos UVP' },
                            { id: 'vida-movilidad', label: 'Movilidad Universitaria' },
                            { id: 'vida-bibliotecas', label: 'Bibliotecas' },
                            { id: 'vida-talleres', label: 'Talleres culturales' },
                            { id: 'vida-deportes', label: 'Deportes' },
                            { id: 'vida-orientacion', label: 'Orientación Educativa' },
                            { id: 'vida-villas', label: 'Villas UVP' },
                            { id: 'vida-murales', label: 'Murales' },
                          ].map((item) => (
                            <div 
                              key={item.id}
                              className={`sidebar-item px-4 py-3 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${activeSubmenu === item.id ? 'bg-[#91268f] text-white' : 'text-[#330154] hover:bg-[#FCD100]'}`}
                              onClick={() => setActiveSubmenu(item.id)}
                            >
                              {item.label} {['vida-miyana', 'vida-eventos', 'vida-movilidad', 'vida-villas'].includes(item.id) && <ChevronRight className="w-4 h-4" />}
                            </div>
                          ))}
                        </div>
                        <div className="mega-content flex-1 p-6">
                          <div className={`content-panel ${activeSubmenu === 'vida-miyana' ? 'block' : 'hidden'}`}>
                            <div className="content-grid grid grid-cols-2 gap-4">
                              {['Fisioterapia', 'Dentista', 'Servicio Médico', 'Estancia Infantil', 'Gimnasio Chicáhuac', 'CAPS', 'Studio Panteras', 'Nutrición'].map((item) => (
                                <a key={item} href="#" className="content-item group p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                  <div className="content-item-header flex items-center gap-2 mb-2">
                                    <div className="content-dot w-2 h-2 bg-[#91268f] rounded-full"></div>
                                    <span className="content-title font-semibold text-[#330154] group-hover:text-[#91268f]">{item}</span>
                                  </div>
                                  <p className="content-desc text-sm text-gray-500 mb-2">de pw miyana</p>
                                  <span className="content-link text-sm text-[#91268f]">Saber más ›</span>
                                </a>
                              ))}
                            </div>
                          </div>
                          <div className={`content-panel ${activeSubmenu === 'vida-eventos' ? 'block' : 'hidden'}`}>
                            <div className="content-grid grid grid-cols-2 gap-4">
                              {['Metrópoli', 'Intégrate', 'Feria Virtual Témari', 'Feria Virtual Egresados', 'Especialízate', 'Congresos', 'Foro de Investigación'].map((item) => (
                                <a key={item} href="#" className="content-item group p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                  <div className="content-item-header flex items-center gap-2 mb-2">
                                    <div className="content-dot w-2 h-2 bg-[#91268f] rounded-full"></div>
                                    <span className="content-title font-semibold text-[#330154] group-hover:text-[#91268f]">{item}</span>
                                  </div>
                                  <p className="content-desc text-sm text-gray-500 mb-2">Breve descripción sobre la modalidad</p>
                                  <span className="content-link text-sm text-[#91268f]">Saber más ›</span>
                                </a>
                              ))}
                            </div>
                          </div>
                          <div className={`content-panel ${activeSubmenu === 'vida-movilidad' || activeSubmenu === 'vida-villas' ? 'block' : 'hidden'}`}>
                            <div className="simple-list space-y-3">
                              {activeSubmenu === 'vida-movilidad' && ['Sable Bus', 'Sable Bici'].map((item) => (
                                <a key={item} href="#" className="simple-item flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-[#330154]">
                                  <div className="content-dot w-2 h-2 bg-[#91268f] rounded-full"></div>
                                  {item}
                                </a>
                              ))}
                              {activeSubmenu === 'vida-villas' && (
                                <a href="#" className="simple-item flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-[#330154]">
                                  <div className="content-dot w-2 h-2 bg-[#91268f] rounded-full"></div>
                                  Recorridos Villas
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mega-right w-56 bg-gray-50 p-6 border-l border-gray-100">
                          <div className="mb-6">
                            <div className="right-section-title text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Destacados</div>
                            <div className="highlight-card bg-white p-4 rounded-xl shadow-sm">
                              <div className="highlight-date text-sm text-[#91268f] font-medium">15–20 de julio 2026</div>
                              <div className="highlight-title font-bold text-[#330154]">Verano Emprendedor</div>
                              <div className="highlight-desc text-sm text-gray-500">Breve descripción sobre el evento</div>
                              <span className="highlight-link text-sm text-[#91268f]">Saber más ›</span>
                            </div>
                          </div>
                          <a href="#" className="quick-link flex items-center gap-2 text-sm text-[#330154] hover:text-[#91268f] transition-colors">
                            <div className="content-dot w-1.5 h-1.5 bg-[#91268f] rounded-full"></div>
                            Calendario de eventos
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </li>

                {/* COMUNIDAD UVP */}
                <li 
                  className="nav-item relative"
                  onMouseEnter={() => handleMenuEnter('comunidad', 'com-sintonia')}
                >
                  <button className={`nav-btn px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeMenu === 'comunidad' ? 'bg-[#FCD100] text-[#330154]' : 'text-[#330154] hover:bg-[#FCD100]'
                  }`}>
                    Comunidad UVP
                  </button>
                  {activeMenu === 'comunidad' && (
                    <div className="mega-wrap absolute top-full left-1/2 -translate-x-1/2 pt-2">
                      <div className="mega-inner bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex" style={{ width: '800px' }}>
                        <div className="mega-sidebar w-48 bg-gray-50 border-r border-gray-100 p-4">
                          {[
                            { id: 'com-sintonia', label: 'Sintonía UVP' },
                            { id: 'com-revistas', label: 'Revistas' },
                            { id: 'com-accesos', label: 'Accesos' },
                            { id: 'com-servicios', label: 'Servicios Externos' },
                          ].map((item) => (
                            <div 
                              key={item.id}
                              className={`sidebar-item px-4 py-3 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${activeSubmenu === item.id ? 'bg-[#91268f] text-white' : 'text-[#330154] hover:bg-[#FCD100]'}`}
                              onClick={() => setActiveSubmenu(item.id)}
                            >
                              {item.label} {['revistas', 'accesos', 'servicios'].some(s => item.id.includes(s)) && <ChevronRight className="w-4 h-4" />}
                            </div>
                          ))}
                        </div>
                        <div className="mega-content flex-1 p-6">
                          <div className={`content-panel ${activeSubmenu === 'com-sintonia' ? 'block' : 'hidden'}`}>
                            <div className="simple-list space-y-3">
                              <a href="#" className="simple-item flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-[#330154]">
                                <div className="content-dot w-2 h-2 bg-[#91268f] rounded-full"></div>
                                Explorar todas (Pw general)
                              </a>
                            </div>
                          </div>
                          <div className={`content-panel ${activeSubmenu === 'com-revistas' ? 'block' : 'hidden'}`}>
                            <div className="subsection-title text-sm font-bold text-gray-400 uppercase tracking-wide mb-4">Revistas</div>
                            <div className="revistas-grid grid grid-cols-3 gap-3">
                              {['Nitemoa', 'Ixmati', 'Kanan', 'Nextia', 'Calmécac', 'Xombätsi'].map((item) => (
                                <a key={item} href="#" className="revista-card p-4 bg-gray-50 rounded-xl text-center font-medium text-[#330154] hover:bg-[#91268f] hover:text-white transition-colors">
                                  {item}
                                </a>
                              ))}
                            </div>
                          </div>
                          <div className={`content-panel ${activeSubmenu === 'com-accesos' ? 'block' : 'hidden'}`}>
                            <div className="subsection-title text-sm font-bold text-gray-400 uppercase tracking-wide mb-4">Alumnos</div>
                            <div className="accesos-grid grid grid-cols-3 gap-3 mb-6">
                              {['SAIA', 'UVP Online', 'Correo institucional'].map((item) => (
                                <a key={item} href="#" className="acceso-card p-3 bg-gray-50 rounded-lg flex items-center gap-2 text-sm text-[#330154] hover:bg-[#FCD100] transition-colors">
                                  <div className="content-dot w-1.5 h-1.5 bg-[#91268f] rounded-full"></div>
                                  {item}
                                </a>
                              ))}
                            </div>
                            <div className="subsection-title text-sm font-bold text-gray-400 uppercase tracking-wide mb-4">Colaboradores</div>
                            <div className="accesos-grid grid grid-cols-3 gap-3">
                              {['SIIE', 'Correo institucional', 'Finanzas'].map((item) => (
                                <a key={item} href="#" className="acceso-card p-3 bg-gray-50 rounded-lg flex items-center gap-2 text-sm text-[#330154] hover:bg-[#FCD100] transition-colors">
                                  <div className="content-dot w-1.5 h-1.5 bg-[#91268f] rounded-full"></div>
                                  {item}
                                </a>
                              ))}
                            </div>
                          </div>
                          <div className={`content-panel ${activeSubmenu === 'com-servicios' ? 'block' : 'hidden'}`}>
                            <div className="content-grid grid grid-cols-2 gap-4">
                              {['Univatour', 'Bufete Contable', 'Bufete Jurídico', 'Mitokali (Banquetes)', 'Tienda UVP', 'Winky'].map((item) => (
                                <a key={item} href="#" className="content-item group p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                  <div className="content-item-header flex items-center gap-2 mb-2">
                                    <div className="content-dot w-2 h-2 bg-[#91268f] rounded-full"></div>
                                    <span className="content-title font-semibold text-[#330154] group-hover:text-[#91268f]">{item}</span>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="mega-right w-56 bg-gray-50 p-6 border-l border-gray-100">
                          <div>
                            <div className="right-section-title text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Acceso rápido</div>
                            <div className="quick-link flex items-center gap-2 text-sm text-[#330154] hover:text-[#91268f] transition-colors mb-2">
                              <div className="content-dot w-1.5 h-1.5 bg-[#91268f] rounded-full"></div>
                              Portal de alumnos
                            </div>
                            <div className="quick-link flex items-center gap-2 text-sm text-[#330154] hover:text-[#91268f] transition-colors">
                              <div className="content-dot w-1.5 h-1.5 bg-[#91268f] rounded-full"></div>
                              Portal de colaboradores
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>

                {/* VINCULACIÓN */}
                <li 
                  className="nav-item relative"
                  onMouseEnter={() => setActiveMenu('vinculacion')}
                >
                  <button className={`nav-btn px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeMenu === 'vinculacion' ? 'bg-[#FCD100] text-[#330154]' : 'text-[#330154] hover:bg-[#FCD100]'
                  }`}>
                    Vinculación Académica
                  </button>
                  {activeMenu === 'vinculacion' && (
                    <div className="mega-wrap absolute top-full left-1/2 -translate-x-1/2 pt-2">
                      <div className="mega-inner bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex" style={{ width: '700px' }}>
                        <div className="mega-sidebar w-80 bg-gray-50 p-4">
                          <div className="simple-list space-y-2">
                            {['Egresados', 'Intercambios', 'Fondo de becas', 'Emprendedores', 'Convenios'].map((item) => (
                              <a key={item} href="#" className="simple-item flex items-center gap-3 p-3 rounded-lg hover:bg-[#FCD100] transition-colors text-[#330154]">
                                <div className="content-dot w-2 h-2 bg-[#91268f] rounded-full"></div>
                                {item}
                              </a>
                            ))}
                          </div>
                        </div>
                        <div className="mega-content flex-1"></div>
                        <div className="mega-right w-56 bg-gray-50 p-6 border-l border-gray-100">
                          <div>
                            <div className="right-section-title text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Relaciones Públicas</div>
                            <div className="highlight-card bg-white p-4 rounded-xl shadow-sm">
                              <div className="highlight-desc text-sm text-gray-500">Conectamos a nuestra comunidad con el mundo académico y empresarial.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>

                {/* IDENTIDAD */}
                <li 
                  className="nav-item relative"
                  onMouseEnter={() => setActiveMenu('identidad')}
                >
                  <button className={`nav-btn px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeMenu === 'identidad' ? 'bg-[#FCD100] text-[#330154]' : 'text-[#330154] hover:bg-[#FCD100]'
                  }`}>
                    Identidad UVP
                  </button>
                  {activeMenu === 'identidad' && (
                    <div className="mega-wrap absolute top-full left-1/2 -translate-x-1/2 pt-2">
                      <div className="mega-inner bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex" style={{ width: '700px' }}>
                        <div className="mega-sidebar w-80 bg-gray-50 p-4">
                          <div className="simple-list space-y-2">
                            {['Aniversario 45', 'Conoce UVP', 'Campus', 'Ranking', 'Ideario', 'Historia', 'Temari', 'Fundación UVP'].map((item) => (
                              <a key={item} href="#" className="simple-item flex items-center gap-3 p-3 rounded-lg hover:bg-[#FCD100] transition-colors text-[#330154]">
                                <div className="content-dot w-2 h-2 bg-[#91268f] rounded-full"></div>
                                {item}
                              </a>
                            ))}
                          </div>
                        </div>
                        <div className="mega-content flex-1"></div>
                        <div className="mega-right w-56 bg-gray-50 p-6 border-l border-gray-100">
                          <div>
                            <div className="right-section-title text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Sobre nosotros</div>
                            <div className="highlight-card bg-white p-4 rounded-xl shadow-sm">
                              <div className="highlight-title font-bold text-[#330154]">Plan de Desarrollo</div>
                              <div className="highlight-desc text-sm text-gray-500">Conoce la visión estratégica y el rumbo de la UVP.</div>
                              <span className="highlight-link text-sm text-[#91268f]">Ver plan ›</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>

                {/* BLOG */}
                <li className="nav-item">
                  <a href="#" className="nav-btn px-4 py-2 rounded-lg font-medium text-[#330154] hover:bg-[#FCD100] transition-colors inline-block">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            {/* Right Actions */}
            <div className="hidden xl:flex items-center gap-3 flex-shrink-0">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-lg text-[#330154] hover:bg-[#FCD100] transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Inscríbete Button */}
              <a
                href="https://uvp.mx/registro/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#e80032] hover:bg-[#c8002a] text-white font-bold px-6 py-3 rounded-xl transition-colors"
              >
                ¡Inscríbete Ahora!
              </a>
            </div>

            {/* Search Dropdown */}
            {searchOpen && (
              <div className="absolute top-full right-4 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 z-50">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 w-full border-gray-200 focus:border-[#91268f] focus:ring-[#91268f]"
                    autoFocus
                  />
                </div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-[#330154] hover:bg-[#FCD100] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-gray-100">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {['Oferta Académica', 'Vida UVP', 'Comunidad UVP', 'Vinculación Académica', 'Identidad UVP', 'Blog'].map((item) => (
                <button key={item} className="w-full text-left px-4 py-3 rounded-lg hover:bg-[#FCD100] text-[#330154] font-medium transition-colors">
                  {item}
                </button>
              ))}
              <a
                href="https://uvp.mx/registro/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-[#e80032] text-white font-bold px-6 py-3 rounded-xl mt-4"
              >
                ¡Inscríbete Ahora!
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
