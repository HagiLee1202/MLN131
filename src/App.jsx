import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { Star, Users, Globe, Heart, BookOpen, Award, ArrowRight, ChevronDown, Sun, Moon, Zap, Shield, Users2, Home, Globe2, Brain, AlertTriangle, Briefcase, CheckCircle, Scale } from 'lucide-react'

function App() {
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackTop, setShowBackTop] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  
  // Các state và ref cũ của bạn
  const videoRef = useRef(null)
  const [videoCanPlay, setVideoCanPlay] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const timelineVideoRef = useRef(null)
  const [timelineVideoCanPlay, setTimelineVideoCanPlay] = useState(false)
  const [timelineVideoFailed, setTimelineVideoFailed] = useState(false)
  const [showIntro, setShowIntro] = useState(false)
  const [showAnswerModal, setShowAnswerModal] = useState(false)
  const introHeadingRef = useRef(null)
  const lastFocusedRef = useRef(null)

  // Navigation items: Đã thêm mục "Tình huống"
  const navItems = [
    { id: 'hero', label: 'Trang chủ' },
    { id: 'mac-lenin', label: 'Mác-Lênin' },
    { id: 'ton-giao-vietnam', label: 'Tôn giáo VN' },
    { id: 'quan-he-dan-toc', label: 'Dân tộc & Tôn giáo' },
    { id: 'khai-niem-gia-dinh', label: 'Khái niệm Gia đình' },
    { id: 'gia-dinh', label: 'Gia đình' },
    { id: 'tinh-huong', label: 'Tình huống' }, // Mới thêm
    { id: 'quiz', label: 'Quiz' },
    { id: 'prove', label: 'AI Transparency' }
  ]

  const scrollToNextSection = (currentSectionId) => {
    const currentIndex = navItems.findIndex(item => item.id === currentSectionId)
    if (currentIndex !== -1 && currentIndex < navItems.length - 1) {
      const nextSection = navItems[currentIndex + 1]
      const element = document.getElementById(nextSection.id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Quiz cũ của bạn
  const quizQuestions = [
    {
      question: 'Theo chủ nghĩa Mác-Lênin, tôn giáo có nguồn gốc từ những yếu tố nào?',
      options: [
        'Chỉ từ sự bất lực con người trước thiên nhiên',
        'Từ sự bất lực trước thiên nhiên, áp bức kinh tế-xã hội, và nhu cầu tâm lý của con người',
        'Chỉ từ những nhu cầu tinh thần của con người',
        'Từ các lực lượng siêu nhiên'
      ],
      correct: 1,
      explanation: 'Chủ nghĩa Mác-Lênin cho rằng tôn giáo có ba yếu tố tạo nên: (1) Tự nhiên & kinh tế-xã hội: sự bất lực trước thiên nhiên hùng vĩ và áp bức trong xã hội cũ; (2) Nhận thức: khoảng cách giữa "biết" và "chưa biết"; (3) Tâm lý: sự sợ hãi, lo âu hoặc nhu cầu an ủi.'
    },
    {
      question: 'Tính chất nào của tôn giáo cho thấy nó thay đổi theo sự phát triển của xã hội?',
      options: [
        'Tính quần chúng',
        'Tính chính trị',
        'Tính lịch sử',
        'Tính tâm linh'
      ],
      correct: 2,
      explanation: 'Tính lịch sử của tôn giáo thể hiện rằng tôn giáo thay đổi theo sự biến đổi của kinh tế-xã hội. Nó không cố định mà phát triển cùng với các giai đoạn lịch sử khác nhau.'
    },
    {
      question: 'Chính sách tôn giáo cốt lõi của Đảng, Nhà nước ta hiện nay là gì?',
      options: [
        'Cấm tôn giáo trong toàn bộ đất nước',
        'Chỉ công nhân được tự do tôn giáo, nông dân không được',
        'Đại đoàn kết toàn dân tộc (đoàn kết lương-giáo) và tôn trọng quyền tự do tín ngưỡng theo pháp luật',
        'Ưu tiên tôn giáo nước ngoài hơn tôn giáo trong nước'
      ],
      correct: 2,
      explanation: 'Chính sách tôn giáo của Đảng, Nhà nước ta là: (1) Đại đoàn kết toàn dân tộc (đoàn kết lương-giáo); (2) Tôn trọng quyền tự do tín ngưỡng theo pháp luật; (3) Nghiêm cấm phân biệt đối xử; (4) Nghiêm cấm lợi dụng tôn giáo để hoạt động mê tín, trái pháp luật.'
    },
    {
      question: 'Trong giai đoạn quá độ lên chủ nghĩa xã hội, vì sao tôn giáo vẫn tồn tại?',
      options: [
        'Vì cơ sở kinh tế chưa hoàn toàn được xóa bỏ',
        'Vì mâu thuẫn xã hội vẫn còn, nên những yếu tố tạo nên tôn giáo chưa mất đi',
        'Vì nhân dân không được giáo dục',
        'Vì đó là yêu cầu của tôn giáo'
      ],
      correct: 1,
      explanation: 'Trong thời kỳ quá độ, các mâu thuẫn xã hội vẫn còn tồn tại, và những yếu tố tạo nên tôn giáo (sự bất bình đẳng, áp lực đời sống, khoảng cách nhận thức, nhu cầu an ủi) chưa thể mất đi ngay, nên tôn giáo vẫn ảnh hưởng sâu đến ý thức và hành vi con người.'
    },
    {
      question: 'Cơ sở nào giúp hình thành kiểu gia đình mới dựa trên lao động và hợp tác?',
      options: [
        'Chỉ sự phát triển của giáo dục',
        'Sự phát triển lực lượng sản xuất và xóa bỏ chế độ tư hữu, làm thay đổi nền tảng kinh tế gia đình',
        'Chỉ pháp luật bảo đảm quyền bình đẳng',
        'Chỉ sự phát triển của khoa học'
      ],
      correct: 1,
      explanation: 'Cơ sở kinh tế-xã hội tạo nên kiểu gia đình mới: Sự phát triển của lực lượng sản xuất và việc xóa bỏ chế độ tư hữu về tư liệu sản xuất làm thay đổi nền tảng kinh tế của gia đình. Phụ nữ được giải phóng khỏi phụ thuộc kinh tế, tham gia lao động xã hội, từ đó thúc đẩy bình đẳng giới.'
    },
    {
      question: 'Gia đình mới theo cơ sở chính trị-xã hội được xây dựng trên nguyên tắc nào?',
      options: [
        'Nam giới là trung tâm của gia đình',
        'Nhà nước xã hội chủ nghĩa bảo đảm quyền bình đẳng giữa nam và nữ, xóa bỏ đặc quyền của nam giới',
        'Phụ nữ tuyệt đối không được quyền sở hữu',
        'Trẻ em không có quyền được bảo vệ'
      ],
      correct: 1,
      explanation: 'Cơ sở chính trị-xã hội: Nhà nước xã hội chủ nghĩa và hệ thống pháp luật bảo đảm quyền bình đẳng giữa nam và nữ, xóa bỏ đặc quyền của nam giới trong gia đình, bảo vệ quyền lợi của tất cả các thành viên, đặc biệt là phụ nữ và trẻ em.'
    },
    {
      question: 'Khái niệm gia đình theo chủ nghĩa Mác-Lênin được xác định như thế nào?',
      options: [
        'Là kết quả của bản chất con người, tồn tại mãi mãi',
        'Là sản phẩm của kinh tế-xã hội, thay đổi theo giai đoạn lịch sử và nền tảng kinh tế',
        'Là thể chế độc lập hoàn toàn với xã hội',
        'Là kết quả của các định luật tự nhiên không thay đổi'
      ],
      correct: 1,
      explanation: 'Theo chủ nghĩa Mác-Lênin, gia đình là sản phẩm của sự phát triển kinh tế-xã hội, không phải hằng số tự nhiên. Nó thay đổi theo giai đoạn lịch sử, nền tảng kinh tế, và mối quan hệ sản xuất. Hình thức gia đình ở xã hội cũ khác biệt hoàn toàn với gia đình ở xã hội xã hội chủ nghĩa.'
    },
    {
      question: 'Tôn giáo đóng vai trò gì trong xã hội theo quan điểm Mác-Lênin?',
      options: [
        'Là lực lượng tiến bộ chính của xã hội',
        'Là tôi để để tâm trí con người trong xã hội, phản ánh và hợp pháp hóa những nỗi đau đớn của xã hội cũ',
        'Là lực lượng không ảnh hưởng đến chính trị',
        'Là nền tảng của kinh tế-xã hội'
      ],
      correct: 1,
      explanation: 'Mác-Lênin xem tôn giáo là "khí cụ tâm trí" trong xã hội, phản ánh những nỗi đau đớn, sự bất bình đẳng và áp bức của xã hội cũ. Nó có vai trò duy trì trật tự xã hội cũ nhưng không phải là lực lượng tiến bộ.'
    },
    {
      question: 'Chức năng giáo dục và nuôi dạy trong gia đình mới được hiểu như thế nào?',
      options: [
        'Chỉ truyền dạy kiến thức học vấn',
        'Chỉ dạy dạy kỹ năng lao động sản xuất',
        'Là truyền dạy toàn diện: kiến thức, kỹ năng, đạo đức, ý thức xã hội, giúp phát triển con người mới có ý thức cộng sản',
        'Là vai trò phụ của gia đình, do nhà nước đảm nhận hoàn toàn'
      ],
      correct: 2,
      explanation: 'Chức năng giáo dục nuôi dạy trong gia đình mới không chỉ giới hạn ở kiến thức hay kỹ năng, mà là sự phát triển toàn diện về tinh thần, đạo đức, ý thức xã hội. Gia đình là nơi tiên phong giúp trẻ em phát triển thành những công dân xã hội chủ nghĩa có ý thức cộng sản.'
    },
    {
      question: 'Trong xã hội xã hội chủ nghĩa, tôn giáo sẽ biến mất khi nào?',
      options: [
        'Ngay sau khi chiếm quyền lực',
        'Khi các nhu cầu vật chất cơ bản của con người được thỏa mãn, mâu thuẫn xã hội được xóa bỏ, kiến thức khoa học phát triển, tôn giáo sẽ tự biến mất',
        'Tôn giáo không bao giờ biến mất',
        'Tôn giáo chỉ biến mất khi có lệnh từ Nhà nước'
      ],
      correct: 1,
      explanation: 'Theo Mác-Lênin, tôn giáo sẽ biến mất một cách tự nhiên khi không còn những yếu tố tạo nên nó: khi nhu cầu vật chất được đáp ứng, mâu thuẫn xã hội được xóa bỏ, khoa học phát triển, và ý thức con người được nâng cao. Việc cấm đoán sẽ không hiệu quả; tôn giáo phải biến mất do sự phát triển khách quan của xã hội.'
    }
  ]

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const handleQuizAnswer = (idx) => {
    setSelectedAnswer(idx)
    setShowAnswer(true)
    if (idx === quizQuestions[currentQuiz].correct) {
      setCorrectAnswers(correctAnswers + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuiz < quizQuestions.length - 1) {
      setCurrentQuiz(currentQuiz + 1)
      setSelectedAnswer(null)
      setShowAnswer(false)
    }
  }

  const resetQuiz = () => {
    setCurrentQuiz(0)
    setSelectedAnswer(null)
    setShowAnswer(false)
    setCorrectAnswers(0)
  }

  useEffect(() => {
    const stored = localStorage.getItem('theme-dark')
    if (stored === 'true') setDarkMode(true)
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const applyRM = () => setReducedMotion(mq.matches)
    applyRM()
    mq.addEventListener('change', applyRM)
    return () => mq.removeEventListener('change', applyRM)
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(d => {
      const v = !d
      localStorage.setItem('theme-dark', String(v))
      return v
    })
  }

  useEffect(() => {
    document.documentElement.classList.add('js')
    const els = document.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    let ticking = false
    const sectionIds = navItems.map(n => n.id)
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY || window.pageYOffset
          const docHeight = document.documentElement.scrollHeight - window.innerHeight
          const prog = docHeight > 0 ? y / docHeight : 0
          setScrollProgress(prog)
          setShowBackTop(y > 600)
          let current = 'hero'
          for (const id of sectionIds) {
            const sec = document.getElementById(id)
            if (!sec) continue
            const top = sec.getBoundingClientRect().top + window.scrollY - 140
            if (y >= top) current = id
          }
          setActiveSection(current)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [reducedMotion, navItems])

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="bg-white dark:bg-gray-950 text-black dark:text-white transition-colors duration-500">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 border-b border-red-200/10 dark:border-red-800/10 bg-white/80 dark:bg-[#0f1016]/80 backdrop-blur-xl shadow-sm transition-all duration-300">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-lg">
                  <Home className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-black text-red-700 dark:text-yellow-400 tracking-tighter">
                  MLN131
                </h1>
              </div>
              
              {/* Desktop Nav - Hiển thị items */}
              <div className="hidden xl:flex items-center gap-1">
                {navItems.map((item) => (
                   <button
                   key={item.id}
                   onClick={() => scrollToSection(item.id)}
                   className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                     activeSection === item.id
                       ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-yellow-400'
                       : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                   }`}
                 >
                   {item.label}
                 </button>
                ))}
              </div>

              <button
                onClick={toggleDarkMode}
                className="p-2.5 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 shadow-md hover:shadow-lg"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-900 flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-yellow-400 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-orange-400 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>

          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover opacity-25"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/5.1.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/30 z-5"></div>

          <div className="relative z-20 container mx-auto px-6 text-center max-w-4xl">
            <div className="mb-8 animate-fade-in">
              <Badge className="px-6 py-3 bg-yellow-400/90 text-red-900 text-base font-bold shadow-lg hover:shadow-xl transition-shadow">
                CHƯƠNG 6 & 7 - THỰC HÀNH LÝ LUẬN CHÍNH TRỊ
              </Badge>
            </div>

            <h1 className="text-6xl md:text-7xl font-black mb-6 text-white drop-shadow-lg leading-tight">
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                VẤN ĐỀ DÂN TỘC, TÔN GIÁO & GIA ĐÌNH
              </span>
            </h1>

            <p className="text-2xl md:text-3xl text-yellow-200 mb-6 font-semibold drop-shadow-md">
              Trong Thời kỳ Quá độ Lên Chủ nghĩa Xã hội
            </p>

            <div className="flex justify-center gap-2 mb-12">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-1.5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full" style={{width: (i === 1 ? 40 : 24) + 'px'}}></div>
              ))}
            </div>

            <p className="text-lg text-yellow-100 max-w-2xl mx-auto leading-relaxed mb-12 font-medium">
              Khám phá những vấn đề cốt lõi về tôn giáo, dân tộc và gia đình trong quá trình xây dựng chủ nghĩa xã hội ở Việt Nam
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-red-900 hover:from-yellow-500 hover:to-yellow-600 px-8 py-6 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                onClick={() => scrollToSection('mac-lenin')}
              >
                <BookOpen className="h-5 w-5 mr-2" /> BẮT ĐẦU HỌC
              </Button>
              <Button 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white/20 px-8 py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => scrollToSection('quiz')}
              >
                <Zap className="h-5 w-5 mr-2" /> KIỂM TRA
              </Button>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-30">
            <ChevronDown className="w-8 h-8 text-yellow-300 drop-shadow-lg" />
          </div>
        </section>

        {/* Section 1: Mác-Lênin */}
        <section id="mac-lenin" className="relative py-24 bg-[#111219]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                QUAN ĐIỂM MÁC-LÊNIN
              </h2>
              <p className="text-gray-400">Nguồn gốc, Bản chất & Tính chất của Tôn giáo</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Cột Trái: Bản chất & Nguồn gốc */}
              <div className="space-y-8">
                {/* Card Bản chất */}
                <div className="bg-[#1a1c29] rounded-3xl p-8 border border-white/5 shadow-xl" data-reveal>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                      <BookOpen size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Bản chất</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed bg-[#151722] p-6 rounded-2xl border border-white/5">
                    "Tôn giáo là hình thái ý thức xã hội phản ánh hư ảo hiện thực khách quan. Tôn giáo do con người sáng tạo ra, không phải thần thánh tạo ra con người."
                  </p>
                </div>

                {/* Card Nguồn gốc */}
                <div className="bg-[#1a1c29] rounded-3xl p-8 border border-white/5 shadow-xl" data-reveal>
                    <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                      <Zap size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">3 Nguồn gốc</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { t: 'Tự nhiên & KT-XH', d: 'Sự bất lực trước thiên nhiên & áp bức xã hội', c: 'text-red-400' },
                      { t: 'Nhận thức', d: 'Khoảng cách giữa "biết" và "chưa biết"', c: 'text-blue-400' },
                      { t: 'Tâm lý', d: 'Sự sợ hãi, lo âu, nhu cầu được an ủi', c: 'text-purple-400' }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col p-4 rounded-2xl bg-[#232536] hover:bg-[#2a2d40] transition-colors border border-white/5">
                        <span className={`font-bold ${item.c} mb-1`}>{item.t}</span>
                        <span className="text-sm text-gray-400">{item.d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cột Phải: Tính chất */}
              <div className="bg-[#1a1c29] rounded-3xl p-8 border border-white/5 shadow-xl h-full flex flex-col" data-reveal>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                    <Shield size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Tính chất</h3>
                </div>
                <div className="space-y-3 flex-grow">
                  {[
                    { t: 'Tính Lịch sử', d: 'Thay đổi theo sự biến đổi của kinh tế-xã hội', c: 'text-blue-400' },
                    { t: 'Tính Quần chúng', d: 'Nơi sinh hoạt văn hóa của đông đảo nhân dân', c: 'text-purple-400' },
                    { t: 'Tính Chính trị', d: 'Thường bị lợi dụng cho mục đích chính trị', c: 'text-yellow-400' }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col p-4 rounded-2xl bg-[#232536] hover:bg-[#2a2d40] transition-colors border border-white/5">
                      <span className={`font-bold ${item.c} mb-1`}>{item.t}</span>
                      <span className="text-sm text-gray-400">{item.d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tính chất - Grid Icon */}
              <div className="col-span-1 md:col-span-2 group relative bg-gradient-to-br from-red-700 to-red-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden text-white w-full" data-reveal>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 group-hover:scale-110 transition-transform duration-300"></div>
                <div className="relative w-full">
                  <div className="flex items-start gap-4 mb-8 w-full">
                    <div className="p-3 bg-white/20 rounded-lg flex-shrink-0">
                      <Shield className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-bold break-words">Tính chất của Tôn giáo</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                    {[
                      {icon: '📜', title: 'Tính Lịch sử', desc: 'Thay đổi theo sự biến đổi của kinh tế-xã hội'},
                      {icon: '👥', title: 'Tính Quần chúng', desc: 'Nơi sinh hoạt văn hóa của đông đảo nhân dân'},
                      {icon: '⚖️', title: 'Tính Chính trị', desc: 'Thường bị lợi dụng cho mục đích chính trị'}
                    ].map((item, i) => (
                      <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 w-full break-words whitespace-normal">
                        <p className="text-3xl mb-2 break-words">{item.icon}</p>
                        <h4 className="text-lg font-bold mb-2 break-words">{item.title}</h4>
                        <p className="text-white/80 text-sm leading-relaxed break-words whitespace-normal">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 4 Nguyên tắc */}
              <div className="col-span-1 md:col-span-2 group relative bg-gradient-to-br from-red-700 to-red-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden text-white w-full" data-reveal>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 group-hover:scale-110 transition-transform duration-300"></div>
                <div className="relative w-full">
                  <h3 className="text-3xl font-bold mb-8 break-words">4 Nguyên tắc Giải quyết Tôn giáo</h3>
                  <div className="space-y-5 w-full">
                    {[
                      { num: 1, text: 'Tôn trọng tự do tín ngưỡng và không tín ngưỡng' },
                      { num: 2, text: 'Khắc phục mặt tiêu cực gắn liền với cải tạo xã hội' },
                      { num: 3, text: 'Phân biệt chính trị (lợi dụng) và tư tưởng (nhu cầu tinh thần)' },
                      { num: 4, text: 'Quan điểm lịch sử cụ thể' }
                    ].map((item) => (
                      <div key={item.num} className="flex items-start gap-6 pb-5 border-b border-white/20 last:border-b-0 last:pb-0 w-full hover:bg-white/10 p-4 rounded-lg transition-all duration-300">
                        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg flex-shrink-0">
                          {item.num}
                        </div>
                        <div className="min-w-0 flex-1 pt-2">
                          <p className="text-white/95 break-words whitespace-normal">{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Tôn giáo ở Việt Nam */}
        <section id="ton-giao-vietnam" className="relative py-24 bg-[#111219]">
          <div className="absolute top-1/3 right-0 w-80 h-80 bg-orange-600/10 rounded-full blur-[100px]"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                TÔN GIÁO Ở VIỆT NAM
              </h2>
              <p className="text-gray-400">Và Chính sách Tôn giáo của Đảng, Nhà nước</p>
            </div>

            <div className="space-y-6">
              {/* Card 1: Tôn giáo ở Việt Nam */}
              <div className="group p-8 bg-[#1a1c29] hover:bg-[#202232] rounded-3xl border border-white/5 transition-all duration-300 shadow-lg overflow-hidden" data-reveal>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-cyan-500/20 rounded-2xl">
                    <Globe size={32} className="text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Tôn giáo ở Việt Nam</h3>
                </div>
                <div className="space-y-4 pl-16">
                  {[
                    {
                      icon: Star,
                      title: 'Đa dạng & Hòa bình',
                      desc: 'Có 17 tôn giáo, ~28 triệu tín đồ sống đan xen, hòa hợp, không có xung đột hay chiến tranh tôn giáo',
                      color: 'text-yellow-400',
                      bg: 'bg-yellow-500/10'
                    },
                    {
                      icon: Heart,
                      title: 'Đồng hành cùng dân tộc',
                      desc: 'Tín đồ phần lớn là người lao động, có lòng yêu nước và gắn bó với vận mệnh quốc gia',
                      color: 'text-red-400',
                      bg: 'bg-red-500/10'
                    },
                    {
                      icon: Globe,
                      title: 'Quan hệ quốc tế',
                      desc: 'Các tôn giáo đều có quan hệ rộng mở với thế giới',
                      color: 'text-blue-400',
                      bg: 'bg-blue-500/10'
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className={`p-2.5 ${item.bg} ${item.color} rounded-lg w-fit flex-shrink-0 mt-1`}>
                        <item.icon size={20} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className={`text-lg font-bold ${item.color}`}>{item.title}</h4>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
               {/* Card 2: Chính sách tôn giáo - Quan điểm */}
              <div className="group p-8 bg-[#1a1c29] hover:bg-[#202232] rounded-3xl border border-white/5 transition-all duration-300 shadow-lg overflow-hidden" data-reveal>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-purple-500/20 rounded-2xl">
                    <Shield size={32} className="text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Quan điểm</h3>
                </div>
                <p className="text-gray-300 leading-relaxed pl-16">
                  Tín ngưỡng, tôn giáo là nhu cầu tinh thần của một bộ phận nhân dân, sẽ tồn tại lâu dài.
                </p>
              </div>

              {/* Card 3: Chính sách cốt lõi */}
              <div className="group p-8 bg-gradient-to-br from-orange-700 to-red-800 hover:from-orange-600 hover:to-red-700 rounded-3xl shadow-lg overflow-hidden transition-all duration-300" data-reveal>
                <div className="flex items-start gap-6 mb-6">
                  <div className="p-4 bg-white/10 rounded-2xl flex-shrink-0">
                    <Zap size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Chính sách Cốt lõi</h3>
                </div>
                <div className="space-y-4 pl-16 text-white/90">
                  {[
                    'Đại đoàn kết toàn dân tộc (đoàn kết lương-giáo)',
                    'Tôn trọng quyền tự do tín ngưỡng theo pháp luật; nghiêm cấm phân biệt đối xử',
                    'Nghiêm cấm lợi dụng tôn giáo để hoạt động mê tín dị đoan, trái pháp luật'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 font-bold text-yellow-300 mt-0.5">{i + 1}.</span>
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Quan hệ Dân tộc & Tôn giáo */}
        <section id="quan-he-dan-toc" className="relative py-24 bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-500 bg-clip-text text-transparent">
                QUAN HỆ DÂN TỘC & TÔN GIÁO
              </h2>
            </div>

            <div className="space-y-8">
              {/* Sự gắn kết */}
              <div className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100 dark:border-purple-800/30 overflow-hidden" data-reveal>
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-100 to-transparent dark:from-purple-900/20 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-300"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg text-white shadow-lg">
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-300">Sự Gắn kết Chặt chẽ</h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed font-medium mb-4">
                    Quan hệ này được thiết lập trên cơ sở <span className="font-bold text-purple-700 dark:text-purple-300">cộng đồng quốc gia – dân tộc thống nhất</span>
                  </p>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 p-6 rounded-xl">
                    <p className="text-purple-700 dark:text-purple-300 font-bold mb-2">👑 Vai trò Tín ngưỡng truyền thống</p>
                    <p className="text-gray-700 dark:text-gray-400">Tín ngưỡng thờ cúng tổ tiên, Vua Hùng chi phối mạnh mẽ, làm các tôn giáo ngoại nhập phải hòa nhập văn hóa Việt Nam</p>
                  </div>
                </div>
              </div>

              {/* Thách thức */}
              <div className="group relative bg-gradient-to-br from-red-600 to-pink-600 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden text-white" data-reveal>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 group-hover:scale-110 transition-transform duration-300"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-white/20 rounded-lg">
                      <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-bold">Thách thức Mới - Hiện tượng Tôn giáo Mới</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                      <p className="text-2xl mb-3">⚠️</p>
                      <p className="font-semibold mb-2">Các Hiện tượng</p>
                      <p className="text-white/80 text-sm">"Tin Lành Đề Ga", "Hà Mòn"... có tính mê tín, bị lợi dụng tà đạo</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                      <p className="text-2xl mb-3">🎯</p>
                      <p className="font-semibold mb-2">Tầm nhìn</p>
                      <p className="text-white/80 text-sm">Tăng cường đoàn kết là vấn đề chiến lược, cơ bản, lâu dài và cấp bách</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nguyên tắc */}
              <div className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100 dark:border-purple-800/30 overflow-hidden" data-reveal>
                <div className="relative">
                  <h3 className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-8">Nguyên tắc "Bất di bất dịch"</h3>
                  <div className="space-y-4">
                    {[
                      {icon: '⚔️', title: 'Nguyên tắc 1', desc: 'Giải quyết vấn đề tôn giáo phải đặt trong lợi ích quốc gia - dân tộc'},
                      {icon: '🚫', title: 'Nguyên tắc 2', desc: 'Tuyệt đối không được lợi dụng tôn giáo để đòi ly khai dân tộc'},
                      {icon: '💪', title: 'Hành động', desc: 'Kiên quyết đấu tranh với âm mưu "tôn giáo hóa dân tộc"'}
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-xl hover:shadow-md transition-shadow">
                        <span className="text-3xl flex-shrink-0">{item.icon}</span>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-gray-800 dark:text-gray-200 mb-1 break-words">{item.title}</p>
                          <p className="text-gray-700 dark:text-gray-400 text-sm break-words whitespace-normal">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3.5: Khái niệm, Vị trí & Chức năng của Gia đình */}
        <section id="khai-niem-gia-dinh" className="relative py-24 bg-[#111219]">
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-green-600/10 rounded-full blur-[100px]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                GIA ĐÌNH: KHÁI NIỆM, VỊ TRÍ & CHỨC NĂNG
              </h2>
              <p className="text-gray-400 text-lg">Nền tảng của xã hội và tế bào cơ bản của sự phát triển con người</p>
            </div>

            <div className="space-y-8">
              {/* Khái niệm - All in one card */}
              <div className="bg-[#1a1c29] rounded-2xl p-8 border border-white/5 hover:border-green-500/30 hover:bg-[#202232] transition-all" data-reveal>
                <h3 className="text-3xl font-bold text-green-400 mb-8">Khái niệm Gia đình</h3>
                
                {/* Two foundations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-[#1a1c29] rounded-xl p-4 border border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <Heart className="w-4 h-4 text-green-400" />
                      </div>
                      <h4 className="text-base font-bold text-green-400">Quan hệ Hôn nhân (Vợ - Chồng)</h4>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">Đây là nền tảng pháp lý, cơ sở đầu tiên để hình thành gia đình và các mối quan hệ khác.</p>
                  </div>

                  <div className="bg-[#1a1c29] rounded-xl p-4 border border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <Users2 className="w-4 h-4 text-emerald-400" />
                      </div>
                      <h4 className="text-base font-bold text-emerald-400">Quan hệ Huyết thống (Cha mẹ - Con cái)</h4>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">Là quan hệ tự nhiên, mạnh mẽ nhất, gắn kết các thành viên trong gia đình.</p>
                  </div>
                </div>

                {/* Definition */}
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg p-6 border border-green-500/20">
                  <p className="text-gray-300 text-center leading-relaxed text-sm">
                    <span className="text-green-400 font-semibold">Gia đình là một hình thức cộng đồng xã hội đặc biệt</span>, được hình thành, duy trì và cùng cố chủ yếu dựa trên cơ sở hôn nhân, quan hệ huyết thống và quan hệ nuôi dưỡng, cùng với những quy định về quyền và nghĩa vụ của các thành viên trong gia đình.
                  </p>
                </div>
              </div>

              {/* Vị trí - All in one card */}
              <div className="bg-[#1a1c29] rounded-2xl p-8 border border-white/5 hover:border-teal-500/30 hover:bg-[#202232] transition-all" data-reveal>
                <h3 className="text-3xl font-bold text-teal-400 mb-8">Vị trí của Gia đình</h3>
                
                <div className="space-y-6">
                  {/* Cell of society */}
                  <div>
                    <h4 className="text-xl font-bold text-green-400 mb-3">Gia đình là Tế bào của Xã hội</h4>
                    <div className="space-y-3 text-gray-300">
                      <p className="leading-relaxed text-sm">Gia đình có vai trò quyết định với sự tồn tại, vận động và phát triển của xã hội. Với việc sản xuất ra tư liệu tiêu dùng, tư liệu sản xuất, tái sản xuất ra con người, gia đình như một tế bào tự nhiên, là một đơn vị cơ sở để tạo nên cơ thể - xã hội.</p>
                      <p className="text-xs text-gray-400 font-semibold mt-2">Mức độ tác động phụ thuộc vào:</p>
                      <ul className="text-xs space-y-1 ml-4">
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 flex-shrink-0">•</span>
                          <span>Bản chất của từng chế độ xã hội</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 flex-shrink-0">•</span>
                          <span>Đường lối, chính sách của giai cấp cầm quyền</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 flex-shrink-0">•</span>
                          <span>Mô hình, kết cấu và đặc điểm của mỗi hình thức gia đình trong lịch sử</span>
                        </li>
                      </ul>
                      <p className="text-emerald-400 italic mt-3 text-xs">⇒ Việc xây dựng quan hệ xã hội và quan hệ gia đình bình đẳng, hạnh phúc là một vấn đề cực kỳ quan trọng trong cách mạng xã hội chủ nghĩa.</p>
                    </div>
                  </div>

                  <div className="h-px bg-white/10"></div>

                  {/* Warm nest */}
                  <div>
                    <h4 className="text-xl font-bold text-emerald-400 mb-3">🏠 Gia đình là Tổ Ấm</h4>
                    <div className="space-y-3 text-gray-300">
                      <p className="leading-relaxed text-sm">Gia đình là môi trường tốt nhất để mỗi cá nhân được yêu thương, nuôi dưỡng, chăm sóc, trưởng thành, phát triển. Sự yên ổn, hạnh phúc của mỗi gia đình là tiền đề, điều kiện quan trọng cho sự hình thành, phát triển nhân cách, thể lực, trí lực để trở thành công dân tốt cho xã hội.</p>
                      <p className="text-emerald-400 italic mt-3 text-xs">⇒ Trong môi trường yên ấm của gia đình, cá nhân mới cảm thấy bình yên, hạnh phúc, có động lực để phấn đấu trở thành con người xã hội tốt.</p>
                    </div>
                  </div>

                  <div className="h-px bg-white/10"></div>

                  {/* Bridge */}
                  <div>
                    <h4 className="text-xl font-bold text-teal-400 mb-3">🌉 Gia đình là Cầu Nối</h4>
                    <div className="space-y-3 text-gray-300">
                      <div>
                        <p className="font-semibold text-teal-300 mb-2 text-sm">Cầu nối cá nhân - Xã hội:</p>
                        <p className="leading-relaxed text-sm">Gia đình là cộng đồng xã hội đầu tiên mà mỗi cá nhân sinh sống, có ảnh hưởng rất lớn đến sự hình thành và phát triển nhân cách của từng người. Chỉ trong gia đình, mới thể hiện được quan hệ tình cảm thiêng liêng, sâu đậm giữa vợ và chồng, cha mẹ và con cái, anh chị em với nhau mà không cộng đồng nào có được và có thể thay thế.</p>
                      </div>
                      <div>
                        <p className="font-semibold text-teal-300 mb-2 text-sm">Nơi học hỏi và thực hành:</p>
                        <p className="leading-relaxed text-sm">Gia đình là cộng đồng xã hội đầu tiên và môi trường đầu tiên giúp cá nhân học hỏi, thực hành quan hệ xã hội. Là kênh quan trọng để xã hội tác động đến cá nhân (tư tưởng, đạo đức, lối sống, nhân cách). Xã hội hiểu rõ cá nhân hơn khi xem xét trong quan hệ gia đình và xã hội.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chức năng - All in one card */}
              <div className="bg-[#1a1c29] rounded-2xl p-8 border border-white/5 hover:border-emerald-500/30 hover:bg-[#202232] transition-all" data-reveal>
                <h3 className="text-3xl font-bold text-emerald-400 mb-8">Chức năng Cơ bản của Gia đình</h3>
                
                <div className="space-y-6">
                  {/* Function 1 */}
                  <div>
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-cyan-400 font-bold text-lg">①</span>
                      <h4 className="text-lg font-bold text-cyan-400">Chức năng Tái sản xuất ra Con người</h4>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed ml-6">Đây là chức năng đặc thù của gia đình, không một cộng đồng nào có thể thay thế. Chức năng này không chỉ đáp ứng nhu cầu tâm, sinh lý tự nhiên của con người, đáp ứng nhu cầu duy trì nòi giống của gia đình, dòng họ mà còn đáp ứng nhu cầu về sức lao động và duy trì sự trường tồn của xã hội.</p>
                  </div>

                  <div className="h-px bg-white/10"></div>

                  {/* Function 2 */}
                  <div>
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-blue-400 font-bold text-lg">②</span>
                      <h4 className="text-lg font-bold text-blue-400">Chức năng Nuôi dưỡng, Giáo dục</h4>
                    </div>
                    <div className="text-gray-400 space-y-2 ml-6 text-sm">
                      <p className="leading-relaxed">Bên cạnh chức năng tái sản xuất ra con người, gia đình còn có trách nhiệm nuôi dưỡng, dạy dỗ con cái trở thành người có ích cho gia đình, cộng đồng và xã hội. Thực hiện chức năng này, gia đình có ý nghĩa rất quan trọng đối với sự hình thành nhân cách, đạo đức, lối sống của mỗi người.</p>
                      <p>Giáo dục của gia đình gắn liền với giáo dục của xã hội. Nếu giáo dục của gia đình không gắn với giáo dục của xã hội, mỗi cá nhân sẽ khó khăn khi hòa nhập với xã hội. Ngược lại, giáo dục của xã hội sẽ không đạt được hiệu quả cao khi không kết hợp với giáo dục của gia đình, không lấy giáo dục của gia đình là nền tảng.</p>
                    </div>
                  </div>

                  <div className="h-px bg-white/10"></div>

                  {/* Function 3 */}
                  <div>
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-purple-400 font-bold text-lg">③</span>
                      <h4 className="text-lg font-bold text-purple-400">Chức năng Kinh tế & Tổ chức Tiêu dùng</h4>
                    </div>
                    <div className="text-gray-400 space-y-2 ml-6 text-sm">
                      <div>
                        <p className="font-semibold text-purple-300 mb-1">Vai trò sản xuất và tái sản xuất:</p>
                        <p className="leading-relaxed">Gia đình tham gia sản xuất tư liệu sản xuất, tiêu dùng, đặc biệt tái sản xuất sức lao động (duy nhất so với các đơn vị kinh tế khác).</p>
                      </div>
                      <div>
                        <p className="font-semibold text-purple-300 mb-1">Chức năng tiêu dùng:</p>
                        <p className="leading-relaxed">Tổ chức sử dụng thu nhập, thời gian nhàn rỗi để đảm bảo đời sống vật chất, tinh thần; tạo môi trường văn hóa lành mạnh, nâng cao sức khỏe và sở thích cá nhân.</p>
                      </div>
                      <div>
                        <p className="font-semibold text-purple-300 mb-1">Sự biến đổi theo xã hội:</p>
                        <p className="leading-relaxed">Chức năng thay đổi theo giai đoạn, hình thức gia đình (quy mô sản xuất, sở hữu, tổ chức, phân phối); vị trí kinh tế gia đình khác nhau so với các đơn vị khác.</p>
                      </div>
                      <div>
                        <p className="font-semibold text-purple-300 mb-1">Lợi ích:</p>
                        <ul className="space-y-1 ml-4">
                          <li>• Đảm bảo nguồn sống cho thành viên</li>
                          <li>• Quyết định hiệu quả đời sống gia đình</li>
                          <li>• Đóng góp của cải, sức lao động cho xã hội</li>
                          <li>• Phát huy tiềm năng (vốn, tay nghề) để phát triển gia đình và xã hội</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-white/10"></div>

                  {/* Function 4 */}
                  <div>
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-pink-400 font-bold text-lg">④</span>
                      <h4 className="text-lg font-bold text-pink-400">Chức năng Thỏa mãn Nhu cầu Tâm sinh lý</h4>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed ml-6">Đây là chức năng thường xuyên của gia đình, bao gồm việc thỏa mãn nhu cầu tình cảm, văn hóa, tinh thần cho các thành viên. Sự quan tâm, chăm sóc lẫn nhau giữa các thành viên trong gia đình vừa là nhu cầu tình cảm vừa là trách nhiệm của mỗi người.</p>
                  </div>

                  <div className="h-px bg-white/10"></div>

                  {/* Function 5 */}
                  <div>
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-amber-400 font-bold text-lg">⑤</span>
                      <h4 className="text-lg font-bold text-amber-400">Chức năng Văn hóa & Chính trị</h4>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed ml-6">Gia đình là nơi lưu giữ truyền thống văn hóa của dân tộc, những phong tục, tập quán, sinh hoạt văn hóa của cộng đồng được thực hiện trong gia đình. Gia đình là cầu nối của mối quan hệ giữa nhà nước với công dân.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Gia đình Mới */}
        <section id="gia-dinh" className="relative py-24 bg-[#111219]">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-4 text-white">
                GIA ĐÌNH MỚI
              </h2>
              <p className="text-gray-400 text-lg">Cơ sở xây dựng gia đình trong thời kỳ quá độ lên CNXH</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: Users2, 
                  title: 'Kinh tế - Xã hội', 
                  desc: 'Xóa bỏ chế độ tư hữu, phụ nữ tham gia lao động xã hội, tạo cơ sở kinh tế cho sự bình đẳng.',
                  color: 'text-blue-400',
                  bg: 'bg-blue-500/10'
                },
                {
                  icon: Shield, 
                  title: 'Chính trị - Xã hội', 
                  desc: 'Nhà nước XHCN ban hành luật Hôn nhân & Gia đình, bảo đảm quyền lợi pháp lý cho mọi thành viên.',
                  color: 'text-cyan-400',
                  bg: 'bg-cyan-500/10'
                },
                {
                  icon: BookOpen, 
                  title: 'Văn hóa', 
                  desc: 'Phát triển giáo dục, khoa học kỹ thuật, nâng cao nhận thức, loại bỏ hủ tục lạc hậu.',
                  color: 'text-indigo-400',
                  bg: 'bg-indigo-500/10'
                },
                {
                  icon: Heart, 
                  title: 'Hôn nhân Tiến bộ', 
                  desc: 'Hôn nhân dựa trên tình yêu chân chính, tự nguyện, một vợ một chồng, vợ chồng bình đẳng.',
                  color: 'text-pink-400',
                  bg: 'bg-pink-500/10'
                }
              ].map((item, i) => (
                <div key={i} className="group flex items-start gap-6 p-8 bg-[#1a1c29] hover:bg-[#202232] rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all duration-300 shadow-lg" data-reveal>
                  <div className={`p-4 rounded-2xl ${item.bg} ${item.color} shadow-inner flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <item.icon size={28} />
                  </div>
                  <div className="min-w-0">
                    <h3 className={`text-xl font-bold ${item.color} mb-3`}>{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed font-medium text-sm md:text-base">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section: Tình huống Thực tiễn (New) */}
        <section id="tinh-huong" className="relative py-24 bg-[#0f1016]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
            <div className="text-center mb-16">
              <Badge className="px-4 py-2 bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 mb-4">CASE STUDY</Badge>
              <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                TÌNH HUỐNG THỰC TIỄN
              </h2>
              <p className="text-gray-400 text-lg">Quản trị Tôn giáo trong Doanh nghiệp thời kỳ Quá độ</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Bên trái: Tình huống */}
              <div className="space-y-6" data-reveal>
                 <Card className="bg-[#1a1c29] border-red-500/30 overflow-hidden">
                    <div className="bg-red-900/20 p-4 border-b border-red-500/20 flex items-center gap-3">
                        <AlertTriangle className="text-red-400" />
                        <h3 className="text-xl font-bold text-red-100">Xung đột: Đức tin & Hiệu suất</h3>
                    </div>
                    <CardContent className="p-6 space-y-4">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                <Briefcase className="text-blue-400" size={20}/>
                            </div>
                            <div>
                                <h4 className="font-bold text-white mb-1">Nhân vật: Hoàng (HR Manager)</h4>
                                <p className="text-gray-400 text-sm">Quản lý nhân sự tại tập đoàn dược phẩm đa quốc gia ở vùng giàu truyền thống tôn giáo.</p>
                            </div>
                        </div>

                        <div className="bg-[#111219] p-4 rounded-xl border border-white/5 space-y-3">
                            <p className="text-gray-300 text-sm italic">"Tôn giáo là chuyện cá nhân, không được phép ảnh hưởng đến năng suất. Chúng ta cần một môi trường 'vô thần' hoàn toàn để vận hành chuyên nghiệp."</p>
                            <p className="text-right text-xs text-red-400 font-bold">- CEO (Giám đốc điều hành)</p>
                        </div>

                        <div className="space-y-2">
                             <div className="flex items-center gap-2 text-sm text-gray-300">
                                <span className="text-red-400 font-bold">• Sự kiện:</span>
                                <span>Nhóm nhân viên nòng cốt xin nghỉ lễ tôn giáo đúng đợt kiểm tra chất lượng.</span>
                             </div>
                             <div className="flex items-center gap-2 text-sm text-gray-300">
                                <span className="text-red-400 font-bold">• Nguy cơ:</span>
                                <span>Thế lực bên ngoài kích động, vu khống công ty "đàn áp tôn giáo".</span>
                             </div>
                        </div>
                    </CardContent>
                 </Card>
                 
                 <div className="bg-[#1a1c29] rounded-2xl p-6 border border-white/5">
                     <h3 className="text-lg font-bold text-white mb-3">Góc nhìn Mác-Lênin về Nguồn gốc</h3>
                     <ul className="space-y-2">
                        <li className="flex gap-2 text-sm text-gray-400">
                            <span className="text-indigo-400 font-bold">1.</span>
                            <span>Kinh tế – xã hội: Bất bình đẳng, áp lực đời sống.</span>
                        </li>
                        <li className="flex gap-2 text-sm text-gray-400">
                            <span className="text-indigo-400 font-bold">2.</span>
                            <span>Nhận thức: Khoa học chưa giải thích hết mọi hiện tượng.</span>
                        </li>
                        <li className="flex gap-2 text-sm text-gray-400">
                            <span className="text-indigo-400 font-bold">3.</span>
                            <span>Tâm lý: Nhu cầu an ủi, niềm tin, hy vọng.</span>
                        </li>
                     </ul>
                 </div>
              </div>

              {/* Bên phải: Giải pháp */}
              <div className="space-y-6" data-reveal>
                <Card className="bg-[#1a1c29] border-green-500/30 h-full">
                    <div className="bg-green-900/20 p-4 border-b border-green-500/20 flex items-center gap-3">
                        <CheckCircle className="text-green-400" />
                        <h3 className="text-xl font-bold text-green-100">Phương án Quản trị & Giải quyết</h3>
                    </div>
                    <CardContent className="p-6 space-y-6">
                        {/* Giải pháp quản trị */}
                        <div>
                            <h4 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
                                <Scale className="text-yellow-400" size={20}/>
                                1. Đảm bảo Tự do & Kỷ luật
                            </h4>
                            <ul className="space-y-3 pl-2">
                                {[
                                    'Tôn trọng quyền tự do tín ngưỡng của nhân viên (không phân biệt, không cấm đoán).',
                                    'Phân biệt rõ "tín ngưỡng" và "kỷ luật lao động": nghỉ lễ phải theo quy định chung.',
                                    'Đối thoại với đại diện nhóm nhân viên, linh hoạt sắp ca nếu không ảnh hưởng sản xuất.',
                                    'Truyền thông: Tôn trọng tôn giáo nhưng ưu tiên tiến độ chung.'
                                ].map((txt, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-gray-300">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>{txt}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="h-px bg-white/10"></div>

                        {/* Giải pháp an ninh */}
                        <div>
                            <h4 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
                                <Shield className="text-blue-400" size={20}/>
                                2. Ngăn chặn Lợi dụng & Kích động
                            </h4>
                            <ul className="space-y-3 pl-2">
                                {[
                                    'Tăng truyền thông nội bộ, minh bạch chính sách, tránh để tin đồn lan rộng.',
                                    'Phối hợp công đoàn, tổ chức Đảng để nắm tình hình tư tưởng.',
                                    'Không để cá nhân bên ngoài tuyên truyền, kích động trong doanh nghiệp.',
                                    'Giải quyết mâu thuẫn bằng đối thoại, không đối đầu, không đàn áp.'
                                ].map((txt, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-gray-300">
                                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <span>{txt}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/20 mt-4">
                            <p className="text-green-400 font-bold text-sm">Kết luận:</p>
                            <p className="text-gray-300 text-sm mt-1">
                                Tôn giáo còn tồn tại là tất yếu trong thời kỳ quá độ; quản trị đúng là tôn trọng niềm tin nhưng kiên quyết giữ kỷ luật và ổn định tổ chức.
                            </p>
                        </div>
                    </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section id="quiz" className="relative py-24 bg-gradient-to-br from-red-700 via-red-800 to-red-900 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-300 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          </div>

          <video
            className="absolute inset-0 w-full h-full object-cover opacity-20"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/quiz.mp4" type="video/mp4" />
          </video>

          <div className="relative z-10 container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="px-6 py-3 bg-yellow-400/90 text-red-900 text-base font-bold shadow-lg mb-6">KIỂM TRA KIẾN THỨC</Badge>
              <h2 className="text-4xl md:text-6xl font-black text-yellow-300 mb-4 drop-shadow-lg">
                KIỂM TRA KIẾN THỨC
              </h2>
              <p className="text-lg text-yellow-100 font-medium">Tôn giáo, Gia đình & Dân tộc trong Thời kỳ Quá độ</p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Card className="bg-yellow-50 dark:bg-gray-800 border-2 border-yellow-400 shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-red-800 via-red-700 to-red-800 text-yellow-300 py-6">
                  <CardTitle className="text-2xl font-bold text-center">
                    Câu {currentQuiz + 1} / {quizQuestions.length}
                    <div className="w-full bg-red-900 rounded-full h-2 mt-3">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full transition-all duration-500 shadow-lg" 
                        style={{width: `${((currentQuiz + 1) / quizQuestions.length) * 100}%`}}
                      ></div>
                    </div>
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-8">
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-8 leading-relaxed">{quizQuestions[currentQuiz].question}</h3>
                  <div className="space-y-4 mb-8">
                    {quizQuestions[currentQuiz].options.map((option, index) => (
                      <Button
                        key={index}
                        onClick={() => handleQuizAnswer(index)}
                        disabled={showAnswer}
                        className={`w-full text-left justify-start p-5 h-auto text-base transition-all duration-300 font-medium rounded-xl border-2 ${
                          selectedAnswer === index
                            ? index === quizQuestions[currentQuiz].correct
                              ? 'bg-green-600 hover:bg-green-700 text-white border-green-700 shadow-lg'
                              : 'bg-red-600 hover:bg-red-700 text-white border-red-700 shadow-lg'
                            : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md'
                        } ${showAnswer && index === quizQuestions[currentQuiz].correct ? 'bg-green-600 text-white border-green-700 shadow-lg' : ''}`}
                      >
                        <span className="mr-4 font-bold bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="flex-1">{option}</span>
                      </Button>
                    ))}
                  </div>
                  
                  {showAnswer && (
                    <div className="mb-8">
                      {selectedAnswer === quizQuestions[currentQuiz].correct ? (
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border-l-4 border-green-600 shadow-lg">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">✓</div>
                            <div>
                              <p className="text-green-800 dark:text-green-300 font-bold mb-2 text-lg">Chính xác! 🎉</p>
                              <p className="text-green-700 dark:text-green-400 text-base leading-relaxed">{quizQuestions[currentQuiz].explanation}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 p-6 rounded-xl border-l-4 border-red-600 shadow-lg">
                            <div className="flex items-center gap-4">
                              <div className="flex-shrink-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">✗</div>
                              <p className="text-red-800 dark:text-red-300 font-bold">Đáp án đúng là: {String.fromCharCode(65 + quizQuestions[currentQuiz].correct)}</p>
                            </div>
                          </div>
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border-l-4 border-blue-600 shadow-lg">
                            <div className="flex gap-4">
                              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">i</div>
                              <p className="text-blue-800 dark:text-blue-300 text-base leading-relaxed">{quizQuestions[currentQuiz].explanation}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {showAnswer && (
                    <div className="text-center">
                      {currentQuiz < quizQuestions.length - 1 ? (
                        <Button onClick={nextQuestion} className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-red-900 hover:from-yellow-500 hover:to-yellow-600 px-8 py-3 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                          Câu tiếp theo <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      ) : (
                        <div className="space-y-6">
                          <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 p-8 rounded-xl border-2 border-green-300 dark:border-green-700 shadow-lg">
                            <h4 className="text-3xl font-bold text-green-800 dark:text-green-300 mb-3">🎉 Hoàn thành!</h4>
                            <p className="text-5xl font-black text-green-900 dark:text-green-200 mb-2">{correctAnswers}/{quizQuestions.length} câu đúng</p>
                            <p className="text-green-700 dark:text-green-400 text-lg">Bạn đã hoàn thành bộ kiểm tra kiến thức</p>
                          </div>
                          <Button onClick={resetQuiz} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 px-8 py-3 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                            Làm lại bài
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* AI Transparency Section */}
        <section id="prove" className="relative bg-gradient-to-br from-red-800 via-red-900 to-black py-24">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-300 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          </div>

          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-4 mb-8 px-8 py-4 bg-yellow-400/20 backdrop-blur-sm rounded-2xl border-2 border-yellow-400/50 shadow-lg">
                <span className="text-4xl">🤖</span>
                <span className="text-yellow-300 text-lg font-black tracking-wide">TÍNH MINH BẠCH AI</span>
                <span className="text-4xl">📋</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-black text-yellow-400 mb-6 drop-shadow-lg">
                Công cụ AI trong Học thuật
              </h2>
              <p className="text-xl text-white/90 max-w-3xl mx-auto font-medium">
                Cam kết minh bạch về sử dụng AI trong tạo hình ảnh minh họa cho bài thuyết trình
              </p>
            </div>

            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="text-4xl mb-4">🎨</div>
                  <h3 className="text-2xl font-bold text-yellow-300 mb-4">Công cụ AI Đã Sử Dụng</h3>
                  <ul className="text-white/90 space-y-3 text-lg">
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 font-bold">•</span>
                      <span><span className="font-bold">DALL-E & Midjourney:</span> Tạo minh họa, icon, texture</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 font-bold">•</span>
                      <span><span className="font-bold">Claude & ChatGPT:</span> Hỗ trợ cấu trúc nội dung</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="text-4xl mb-4">✨</div>
                  <h3 className="text-2xl font-bold text-yellow-300 mb-4">Mục đích Sử dụng</h3>
                  <ul className="text-white/90 space-y-3 text-lg">
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 font-bold">•</span>
                      <span>Minh họa nội dung phức tạp</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 font-bold">•</span>
                      <span>Nâng cao trải nghiệm người dùng</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 font-bold">•</span>
                      <span>Hỗ trợ cấu trúc thông tin</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-2xl p-8 border border-green-500/30 shadow-xl">
                <h3 className="text-2xl font-bold text-green-300 mb-6 flex items-center gap-3">
                  <span className="text-3xl">✅</span> Cam kết Đạo đức & Học thuật
                </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    'Nội dung học thuật do sinh viên biên soạn',
                    'Tất cả trích dẫn từ tài liệu gốc',
                    'Tuân thủ nguyên tắc học thuật'
                  ].map((item, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <p className="text-green-200 font-semibold">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-red-950 border-t-2 border-yellow-400/30 py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-4">
              <p className="text-yellow-100 text-lg font-semibold mb-2">© 2025 - Tôn giáo, Gia đình, Dân tộc trong Thời kỳ Quá độ</p>
              <p className="text-yellow-300 font-medium">Chương 6 & 7 - Thực hành Lý luận Chính trị - MLN131_SE1841_SP26</p>
            </div>
          </div>
        </footer>

        {/* Back to top button */}
        {showBackTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-gradient-to-br from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-red-900 rounded-full p-5 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-125 z-50 font-bold border-2 border-yellow-600 animate-bounce"
            aria-label="Lên đầu trang"
            title="Lên đầu trang"
          >
            <ArrowRight className="w-7 h-7 transform -rotate-90" />
          </button>
        )}
      </div>
    </div>
  )
}

export default App