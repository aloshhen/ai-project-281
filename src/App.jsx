import { SafeIcon } from './components/SafeIcon';
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { Menu, X, ShoppingBag, User, ChevronRight, ArrowRight } from 'lucide-react'

// Product data
const products = [
  {
    id: 1,
    name: "TECHNICAL PARKA",
    category: "OUTERWEAR",
    image: "https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-1.jpg?",
    hoverImage: "https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-2.jpg?",
    sizes: ["XS", "S", "M", "L", "XL"],
    price: "€1,250"
  },
  {
    id: 2,
    name: "STRUCTURED BLAZER",
    category: "TAILORING",
    image: "https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-2.jpg?",
    hoverImage: "https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-3.jpg?",
    sizes: ["44", "46", "48", "50", "52"],
    price: "€890"
  },
  {
    id: 3,
    name: "CARGO TROUSERS",
    category: "BOTTOMS",
    image: "https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-3.jpg?",
    hoverImage: "https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-4.jpg?",
    sizes: ["28", "30", "32", "34", "36"],
    price: "€450"
  },
  {
    id: 4,
    name: "HIKING BOOTS",
    category: "FOOTWEAR",
    image: "https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-4.jpg?",
    hoverImage: "https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-5.jpg?",
    sizes: ["40", "41", "42", "43", "44", "45"],
    price: "€680",
    badge: "++PRE-ORDER"
  },
  {
    id: 5,
    name: "LEATHER BAG",
    category: "ACCESSORIES",
    image: "https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-5.jpg?",
    hoverImage: "https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-1.jpg?",
    sizes: ["ONE SIZE"],
    price: "€920"
  }
]

// Mega menu data
const menuData = {
  men: {
    highlights: ["NEW ARRIVALS", "BESTSELLERS", "SS26 PRE 'EQUINE'", "HIKING BOOTS"],
    readyToWear: ["VIEW ALL", "OUTERWEAR", "TAILORING", "HOODIES & SWEATSHIRTS", "TOPS & T-SHIRTS", "SHIRTS", "KNITWEAR", "BOTTOMS"],
    accessories: ["EYEWEAR", "BAGS", "HEADWEAR", "SMALL ACCESSORIES"],
    footwear: ["VIEW ALL"]
  },
  women: {
    highlights: ["NEW ARRIVALS", "BESTSELLERS", "SS26 PRE 'EQUINE'", "DRESSES"],
    readyToWear: ["VIEW ALL", "OUTERWEAR", "DRESSES", "SKIRTS & BOTTOMS", "TOPS & T-SHIRTS", "KNITWEAR"],
    accessories: ["EYEWEAR", "BAGS", "HEADWEAR", "SMALL ACCESSORIES"],
    footwear: ["VIEW ALL"]
  }
}

// Animated counter component
const AnimatedCounter = () => {
  const count1 = useMotionValue(0)
  const count2 = useMotionValue(0)
  const count3 = useMotionValue(0)
  const count4 = useMotionValue(0)

  const spring1 = useSpring(count1, { duration: 2000 })
  const spring2 = useSpring(count2, { duration: 2500 })
  const spring3 = useSpring(count3, { duration: 2200 })
  const spring4 = useSpring(count4, { duration: 2800 })

  useEffect(() => {
    count1.set(7)
    count2.set(25)
    count3.set(13)
    count4.set(34)
  }, [])

  const display1 = useTransform(spring1, (latest) => Math.floor(latest).toString().padStart(2, '0'))
  const display2 = useTransform(spring2, (latest) => Math.floor(latest))
  const display3 = useTransform(spring3, (latest) => Math.floor(latest).toString().padStart(2, '0'))
  const display4 = useTransform(spring4, (latest) => Math.floor(latest))

  return (
    <div className="flex items-center gap-4 md:gap-8 text-white font-black text-4xl md:text-7xl lg:text-8xl tracking-tighter">
      <motion.span>{display1}</motion.span>
      <span className="text-white/50 font-light">HELIOT</span>
      <motion.span>{display2}</motion.span>
      <span className="text-white/50 font-light">EMIL</span>
      <motion.span>{display3}</motion.span>
      <motion.span>{display4}</motion.span>
    </div>
  )
}

// Notification Banner
const NotificationBanner = ({ onClose }) => (
  <motion.div
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    exit={{ y: -100 }}
    className="bg-black text-white py-3 px-4 relative z-50"
  >
    <div className="container mx-auto flex items-center justify-center text-center">
      <p className="text-xs md:text-sm tracking-widest font-medium">
        END OF SEASON SALE: FURTHER MARKDOWNS. UP TO 50% OFF
      </p>
      <button
        onClick={onClose}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
      >
        <SafeIcon name="x" size={18} />
      </button>
    </div>
  </motion.div>
)

// Mega Menu Component
const MegaMenu = ({ category, onClose }) => {
  const data = menuData[category]
  if (!data) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-xl z-40"
      onMouseLeave={onClose}
    >
      <div className="container mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xs font-bold tracking-widest mb-4 text-gray-900">HIGHLIGHTS</h3>
          <ul className="space-y-2">
            {data.highlights.map((item) => (
              <li key={item}>
                <a href="#" className="text-xs text-gray-600 hover:text-black transition-colors tracking-wide block py-1">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-bold tracking-widest mb-4 text-gray-900">READY-TO-WEAR</h3>
          <ul className="space-y-2">
            {data.readyToWear.map((item) => (
              <li key={item}>
                <a href="#" className="text-xs text-gray-600 hover:text-black transition-colors tracking-wide block py-1">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-bold tracking-widest mb-4 text-gray-900">ACCESSORIES AND BAGS</h3>
          <ul className="space-y-2">
            {data.accessories.map((item) => (
              <li key={item}>
                <a href="#" className="text-xs text-gray-600 hover:text-black transition-colors tracking-wide block py-1">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-bold tracking-widest mb-4 text-gray-900">FOOTWEAR</h3>
          <ul className="space-y-2">
            {data.footwear.map((item) => (
              <li key={item}>
                <a href="#" className="text-xs text-gray-600 hover:text-black transition-colors tracking-wide block py-1">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

// Product Card Component
const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="flex-shrink-0 w-[45vw] md:w-[22vw] lg:w-[18vw] cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-square bg-gray-100 overflow-hidden mb-3">
        <img
          src={product.image}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        />
        <img
          src={product.hoverImage}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />
        {product.badge && (
          <div className="absolute top-2 left-2 bg-black text-white text-[10px] tracking-widest px-2 py-1 font-bold">
            {product.badge}
          </div>
        )}
      </div>
      <h3 className="text-xs font-bold tracking-widest text-gray-900 mb-1">{product.name}</h3>
      <p className="text-[10px] tracking-widest text-gray-500">{product.category}</p>
    </motion.div>
  )
}

// Product Row Component
const ProductRow = ({ title, items }) => (
  <section className="py-12 md:py-20 border-t border-gray-200">
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg md:text-xl font-black tracking-tight">{title}</h2>
        <a href="#" className="text-xs tracking-widest border-b border-black pb-0.5 hover:opacity-60 transition-opacity">
          VIEW ALL
        </a>
      </div>
      <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  </section>
)

// Promo Banner Component
const PromoBanner = ({ image, title, subtitle, align = "center" }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

  return (
    <section ref={ref} className="relative h-[70vh] md:h-screen overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>
      <div className={`absolute inset-0 flex flex-col items-${align} justify-center text-white p-6 md:p-12`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={`text-${align}`}
        >
          <p className="text-xs tracking-[0.3em] mb-4 opacity-80">{subtitle}</p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8">{title}</h2>
          <button className="bg-white text-black px-8 py-3 text-xs tracking-widest font-bold hover:bg-black hover:text-white transition-colors duration-300">
            EXPLORE
          </button>
        </motion.div>
      </div>
    </section>
  )
}

// Main App Component
function App() {
  const [showNotification, setShowNotification] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeMegaMenu, setActiveMegaMenu] = useState(null)
  const [cartCount] = useState(2)
  const [scrolled, setScrolled] = useState(false)

  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      {/* Notification Banner */}
      <AnimatePresence>
        {showNotification && (
          <NotificationBanner onClose={() => setShowNotification(false)} />
        )}
      </AnimatePresence>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-200' : 'bg-transparent'
        } ${showNotification ? (scrolled ? 'top-0' : 'top-[42px]') : 'top-0'}`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <SafeIcon name={mobileMenuOpen ? "x" : "menu"} size={24} />
            </button>

            {/* Logo */}
            <a href="#" className="flex flex-col leading-none">
              <span className={`text-lg md:text-xl font-black tracking-tighter ${scrolled ? 'text-black' : 'text-white'}`}>
                HELIOT
              </span>
              <span className={`text-lg md:text-xl font-black tracking-tighter ${scrolled ? 'text-black' : 'text-white'}`}>
                EMIL
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {['MEN', 'WOMEN', 'FOOTWEAR & ACCESSORIES', 'UNIVERSE'].map((item) => (
                <div
                  key={item}
                  className="relative"
                  onMouseEnter={() => {
                    if (item === 'MEN') setActiveMegaMenu('men')
                    else if (item === 'WOMEN') setActiveMegaMenu('women')
                    else setActiveMegaMenu(null)
                  }}
                >
                  <a
                    href="#"
                    className={`text-xs tracking-widest font-medium hover:opacity-60 transition-opacity ${scrolled ? 'text-black' : 'text-white'}`}
                  >
                    {item}
                  </a>
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <a href="#" className={`hidden md:block text-xs tracking-widest font-medium hover:opacity-60 transition-opacity ${scrolled ? 'text-black' : 'text-white'}`}>
                ACCOUNT
              </a>
              <a href="#" className={`flex items-center gap-1 text-xs tracking-widest font-medium hover:opacity-60 transition-opacity ${scrolled ? 'text-black' : 'text-white'}`}>
                <span className="hidden md:inline">CART</span>
                <SafeIcon name="shopping-bag" size={20} className="md:hidden" />
                <span>({cartCount})</span>
              </a>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        <AnimatePresence>
          {activeMegaMenu && (
            <MegaMenu
              category={activeMegaMenu}
              onClose={() => setActiveMegaMenu(null)}
            />
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 bg-white z-50 pt-20 px-6 md:hidden"
          >
            <button
              className="absolute top-4 right-4 p-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <SafeIcon name="x" size={24} />
            </button>
            <nav className="flex flex-col gap-6">
              {['MEN', 'WOMEN', 'FOOTWEAR & ACCESSORIES', 'UNIVERSE', 'ACCOUNT', 'CART'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-2xl font-black tracking-tight border-b border-gray-200 pb-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden bg-black">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <img
            src="https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-1.jpg?"
            alt="HELIOT EMIL Campaign"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </motion.div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <AnimatedCounter />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <a
              href="#products"
              className="text-white text-xs tracking-[0.3em] border-b border-white pb-1 hover:opacity-60 transition-opacity"
            >
              SEE MORE
            </a>
          </motion.div>
        </div>
      </section>

      {/* Product Sections */}
      <div id="products">
        <ProductRow title="BESTSELLERS" items={products.slice(0, 4)} />

        {/* Promo Banner 1 */}
        <PromoBanner
          image="https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-2.jpg?"
          title="SS26 PRE 'EQUINE'"
          subtitle="NEW COLLECTION"
        />

        <ProductRow title="NEW ARRIVALS" items={[...products].reverse()} />

        {/* Promo Banner 2 */}
        <PromoBanner
          image="https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_7672189176/user-jpeg-3.jpg?"
          title="WOMEN"
          subtitle="NEW ARRIVALS"
          align="left"
        />

        <ProductRow title="BAGS" items={products.slice(2, 5)} />

        {/* Hiking Boots Special Section */}
        <section className="py-12 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-lg md:text-xl font-black tracking-tight mb-2">HIKING BOOTS</h2>
                <span className="text-xs tracking-widest text-gray-500">++PRE-ORDER NOW AVAILABLE</span>
              </div>
              <a href="#" className="text-xs tracking-widest border-b border-black pb-0.5 hover:opacity-60 transition-opacity">
                VIEW ALL
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {products.filter(p => p.category === 'FOOTWEAR' || p.name.includes('BOOTS')).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {products.slice(0, 2).map((product) => (
                <ProductCard key={`dup-${product.id}`} product={product} />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white">
        {/* Newsletter */}
        <div className="border-b border-gray-800">
          <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">NEWSLETTER</h2>
              <p className="text-sm text-gray-400 mb-8 tracking-wide">
                SIGN UP TO STAY UPDATED ON NEW COLLECTIONS AND THE LATEST NEWS ON HELIOT EMIL
              </p>
              <form className="flex flex-col md:flex-row gap-4">
                <input
                  type="email"
                  placeholder="EMAIL"
                  className="flex-1 bg-transparent border-b border-gray-600 py-3 text-sm tracking-widest focus:outline-none focus:border-white transition-colors placeholder:text-gray-600"
                />
                <input
                  type="tel"
                  placeholder="PHONE"
                  className="flex-1 bg-transparent border-b border-gray-600 py-3 text-sm tracking-widest focus:outline-none focus:border-white transition-colors placeholder:text-gray-600"
                />
                <button
                  type="submit"
                  className="bg-white text-black px-8 py-3 text-xs tracking-widest font-bold hover:bg-gray-200 transition-colors"
                >
                  SIGN UP
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {/* Company */}
            <div>
              <h3 className="text-xs font-bold tracking-widest mb-6 text-gray-400">COMPANY</h3>
              <ul className="space-y-3">
                {['ABOUT', 'CONTACT US', 'STOCKIST', 'CAREERS'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-xs tracking-widest hover:text-gray-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Services */}
            <div>
              <h3 className="text-xs font-bold tracking-widest mb-6 text-gray-400">CUSTOMER SERVICES</h3>
              <ul className="space-y-3">
                {['FAQS', 'SHIPPING', 'RETURNS', 'TERMS AND CONDITIONS', 'PRIVACY POLICY', 'ACCOUNT'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-xs tracking-widest hover:text-gray-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Socials */}
            <div>
              <h3 className="text-xs font-bold tracking-widest mb-6 text-gray-400">SOCIALS</h3>
              <ul className="space-y-3">
                {['FACEBOOK', 'INSTAGRAM', 'TIKTOK'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-xs tracking-widest hover:text-gray-400 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Selectors */}
            <div>
              <h3 className="text-xs font-bold tracking-widest mb-6 text-gray-400">REGION</h3>
              <div className="space-y-4">
                <select className="w-full bg-transparent border border-gray-700 py-2 px-3 text-xs tracking-widest focus:outline-none focus:border-white transition-colors">
                  <option value="EUR">EUR (€)</option>
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
                <select className="w-full bg-transparent border border-gray-700 py-2 px-3 text-xs tracking-widest focus:outline-none focus:border-white transition-colors">
                  <option value="EU">EUROPE</option>
                  <option value="US">UNITED STATES</option>
                  <option value="UK">UNITED KINGDOM</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 md:px-6 py-6">
            <p className="text-[10px] tracking-widest text-gray-500 text-center">
              © 2026 HELIOT EMIL ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App