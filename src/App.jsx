import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Star, Users, Globe, Heart, BookOpen, ArrowRight, ChevronDown, Sun, Moon, Zap, Shield, AlertTriangle, Briefcase, CheckCircle, Scale, Home, Users2, GraduationCap, Gavel, Eye, Flame } from 'lucide-react'
import './index.css' 

function App() {
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackTop, setShowBackTop] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  
  const videoRef = useRef(null)

  // Navigation: Bỏ Gia đình
  const navItems = [
    { id: 'hero', label: 'Trang chủ' },
    { id: 'mac-lenin', label: 'Mác-Lênin' },
    { id: 'ton-giao-vietnam', label: 'Tôn giáo VN' },
    { id: 'quan-he-dan-toc', label: 'Dân tộc & Tôn giáo' },
    { id: 'tinh-huong', label: 'Tình huống' },
    { id: 'quiz', label: 'Trắc nghiệm' },
    { id: 'prove', label: 'Minh bạch AI' }
  ]

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // --- 10 CÂU HỎI KHÓ ---
  const quizQuestions = [
    {
      question: 'Luận điểm "Tôn giáo là thuốc phiện của nhân dân" của C.Mác cần được hiểu đúng như thế nào?',
      options: [
        'Tôn giáo là chất gây nghiện làm con người tê liệt hoàn toàn ý chí đấu tranh.',
        'Tôn giáo là sự phản ánh hư ảo, vừa là tiếng thở dài của chúng sinh bị áp bức, vừa là sự xoa dịu tạm thời nỗi đau thực tại.',
        'Tôn giáo độc hại như ma túy và cần phải bị cấm đoán ngay lập tức.',
        'Tôn giáo do giai cấp thống trị tạo ra chủ yếu để đầu độc nhân dân lao động.'
      ],
      correct: 1,
      explanation: 'Mác không chỉ phê phán tính chất "gây ảo giác" mà còn thừa nhận chức năng "giảm đau" (an ủi) của tôn giáo trong bối cảnh xã hội áp bức. Nó là "tiếng thở dài" của người bị áp bức trước hiện thực tàn khốc.'
    },
    {
      question: 'Nguồn gốc nhận thức (Gnoseological) của tôn giáo xuất phát từ đâu?',
      options: [
        'Sự bần cùng về kinh tế và áp bức giai cấp.',
        'Sự sợ hãi trước sức mạnh tự nhiên như sấm sét, động đất.',
        'Khoảng cách giữa "biết" và "chưa biết", sự tuyệt đối hóa một mặt của nhận thức làm cho cái chủ quan biến thành cái khách quan thần thánh.',
        'Nhu cầu được an ủi về mặt tình cảm trước cái chết.'
      ],
      correct: 2,
      explanation: 'Nguồn gốc nhận thức nằm ở sự giới hạn của tri thức con người tại mỗi giai đoạn lịch sử. Khi gặp những hiện tượng chưa giải thích được, con người gán cho nó sức mạnh siêu nhiên.'
    },
    {
      question: 'Trong các tính chất của tôn giáo, "Tính chính trị" chỉ xuất hiện khi nào?',
      options: [
        'Khi tôn giáo mới ra đời trong xã hội nguyên thủy.',
        'Khi xã hội đã phân chia giai cấp đối kháng và có sự lợi dụng tôn giáo phục vụ lợi ích giai cấp.',
        'Khi tôn giáo trở thành quốc giáo của một quốc gia.',
        'Khi số lượng tín đồ vượt quá 50% dân số.'
      ],
      correct: 1,
      explanation: 'Tôn giáo nguyên thủy không có tính chính trị. Tính chính trị chỉ nảy sinh khi xã hội có giai cấp, các lực lượng chính trị lợi dụng tôn giáo như một công cụ để tập hợp lực lượng hoặc cai trị.'
    },
    {
      question: 'Tại sao trong thời kỳ quá độ lên CNXH, tôn giáo vẫn tồn tại dai dẳng? (Chọn nguyên nhân Tâm lý)',
      options: [
        'Vì đời sống vật chất còn khó khăn, thiên tai dịch bệnh vẫn còn.',
        'Vì các thế lực thù địch vẫn còn lợi dụng tôn giáo.',
        'Vì tôn giáo đã ăn sâu vào tiềm thức, phong tục tập quán qua nhiều thế hệ nên rất khó thay đổi ngay lập tức.',
        'Vì khoa học chưa giải thích được nguồn gốc vũ trụ.'
      ],
      correct: 2,
      explanation: 'Nguyên nhân tâm lý: Tôn giáo in sâu vào đời sống tinh thần, trở thành nếp nghĩ, thói quen. Ngay cả khi cơ sở kinh tế thay đổi, ý thức xã hội (trong đó có tôn giáo) thường biến đổi chậm hơn.'
    },
    {
      question: 'Thực chất của việc giải quyết vấn đề tôn giáo trong quá trình xây dựng CNXH là gì?',
      options: [
        'Là cuộc đấu tranh tư tưởng để xây dựng thế giới quan duy vật khoa học và thế giới quan tôn giáo.',
        'Là dùng biện pháp hành chính để xóa bỏ cơ sở thờ tự.',
        'Là cải đạo cho tín đồ sang chủ nghĩa vô thần.',
        'Là phân biệt đối xử để hạn chế sự phát triển của tôn giáo.'
      ],
      correct: 0,
      explanation: 'Đây không phải là cuộc đấu tranh chính trị với tín đồ, mà là cuộc đấu tranh trên lĩnh vực tư tưởng nhằm khắc phục thế giới quan duy tâm, xây dựng thế giới quan khoa học, giúp con người làm chủ bản thân.'
    },
    {
      question: 'Đặc điểm nổi bật nhất trong quan hệ giữa các tôn giáo ở Việt Nam là gì?',
      options: [
        'Các tôn giáo luôn cạnh tranh gay gắt để giành tín đồ.',
        'Đã từng xảy ra nhiều cuộc chiến tranh tôn giáo đẫm máu trong lịch sử.',
        'Các tôn giáo chung sống hòa bình, đoàn kết, dung hợp và không có xung đột, chiến tranh tôn giáo.',
        'Tôn giáo ngoại nhập lấn át hoàn toàn tín ngưỡng bản địa.'
      ],
      correct: 2,
      explanation: 'Khác với nhiều nơi trên thế giới, lịch sử Việt Nam chưa từng ghi nhận chiến tranh tôn giáo. Các tôn giáo (Phật, Nho, Lão, Kitô...) dung hợp và chung sống hòa bình trong lòng dân tộc.'
    },
    {
      question: 'Âm mưu "Tôn giáo hóa dân tộc" của các thế lực thù địch nhằm mục đích gì?',
      options: [
        'Giúp đồng bào dân tộc thiểu số phát triển văn hóa.',
        'Biến niềm tin tôn giáo thành niềm tin dân tộc, kích động ly khai, phá vỡ khối đại đoàn kết (như "Tin lành Đề Ga", "Vương quốc Mông").',
        'Thống nhất các tôn giáo thành một tôn giáo duy nhất.',
        'Tăng cường sự quản lý của nhà nước đối với vùng biên giới.'
      ],
      correct: 1,
      explanation: 'Thủ đoạn này nhằm đánh tráo khái niệm, làm cho đồng bào lầm tưởng tôn giáo riêng là đại diện cho dân tộc mình, từ đó kích động đòi thành lập "nhà nước riêng", gây mất ổn định chính trị.'
    },
    {
      question: 'Điểm khác biệt căn bản giữa "Tự do tín ngưỡng" và "Mê tín dị đoan" là gì?',
      options: [
        'Tự do tín ngưỡng là tin vào Chúa, mê tín là tin vào Phật.',
        'Tự do tín ngưỡng hướng thiện, nhân văn; Mê tín dị đoan gây hậu quả xấu về sức khỏe, tài sản, an ninh trật tự và trái với thuần phong mỹ tục.',
        'Tự do tín ngưỡng được tổ chức ở chùa, mê tín tổ chức ở nhà.',
        'Không có sự khác biệt, tất cả đều là niềm tin hư ảo.'
      ],
      correct: 1,
      explanation: 'Ranh giới nằm ở hậu quả xã hội và giá trị nhân văn. Tín ngưỡng lành mạnh đáp ứng nhu cầu tinh thần, hướng thiện. Mê tín (bói toán, lên đồng trục lợi, chữa bệnh phản khoa học...) gây hại cho cá nhân và cộng đồng.'
    },
    {
      question: 'Khi giải quyết vấn đề tôn giáo, quan điểm "Lịch sử cụ thể" đòi hỏi điều gì?',
      options: [
        'Áp dụng một chính sách cứng nhắc cho mọi giai đoạn.',
        'Phải có quan điểm khác nhau đối với từng tôn giáo, từng thời điểm lịch sử và từng khu vực địa lý cụ thể.',
        'Chỉ quan tâm đến lịch sử hình thành của tôn giáo đó.',
        'Luôn ưu tiên tôn giáo có lịch sử lâu đời nhất.'
      ],
      correct: 1,
      explanation: 'Vai trò và tác động của tôn giáo thay đổi theo từng bối cảnh lịch sử. Do đó, không thể áp dụng máy móc, mà phải linh hoạt tùy theo tình hình thực tế của từng tôn giáo ở từng thời điểm.'
    },
    {
      question: 'Theo Lênin, con đường duy nhất để tôn giáo tự tiêu vong là gì?',
      options: [
        'Tuyên truyền chủ nghĩa vô thần thật mạnh mẽ.',
        'Cấm đoán mọi hoạt động tôn giáo.',
        'Nâng cao đời sống vật chất và tinh thần của nhân dân, phổ biến khoa học, xóa bỏ nguồn gốc áp bức bất công.',
        'Chờ đợi sự can thiệp của các lực lượng siêu nhiên.'
      ],
      correct: 2,
      explanation: 'Lênin nhấn mạnh không thể tuyên chiến với tôn giáo bằng mệnh lệnh hành chính. Tôn giáo chỉ mất đi khi nguồn gốc sinh ra nó (sự nghèo đói, dốt nát, áp bức) bị xóa bỏ thông qua sự phát triển của xã hội.'
    }
  ]

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

  // --- LOGIC GIAO DIỆN ---
  useEffect(() => {
    const stored = localStorage.getItem('theme-dark')
    if (stored === 'true') setDarkMode(true)
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
    if(darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
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
  }, [darkMode])

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
  }, [navItems])

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'dark' : ''}`}>
      <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500 font-sans">
        
        {/* Navigation - Đẹp hơn, gọn hơn */}
        <nav className="sticky top-0 z-50 nav-blur transition-all duration-300">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-rose-700 text-white rounded-lg flex items-center justify-center shadow-md">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h1 className="text-lg font-bold text-rose-800 dark:text-rose-400 tracking-tight">
                  LÝ LUẬN CHÍNH TRỊ <span className="text-slate-400 font-normal">| MLN131</span>
                </h1>
              </div>
              
              {/* Desktop Nav */}
              <div className="hidden xl:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-full border border-slate-200 dark:border-slate-700">
                {navItems.map((item) => (
                   <button
                   key={item.id}
                   onClick={() => scrollToSection(item.id)}
                   className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                     activeSection === item.id
                       ? 'bg-white dark:bg-slate-700 text-rose-700 dark:text-rose-400 shadow-sm'
                       : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                   }`}
                 >
                   {item.label}
                 </button>
                ))}
              </div>

              <button
                onClick={toggleDarkMode}
                className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
          {/* Progress bar tinh tế */}
          <div className="h-0.5 bg-slate-200 dark:bg-slate-800 w-full">
            <div className="h-full bg-rose-600 transition-all duration-100 ease-out" style={{width: `${scrollProgress * 100}%`}}></div>
          </div>
        </nav>

        {/* Hero Section - Rose & Slate Gradient */}
        <section id="hero" className="relative min-h-screen hero-gradient flex items-center justify-center overflow-hidden pt-20 text-white">
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-rose-500 rounded-full filter blur-[150px] animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-600 rounded-full filter blur-[150px]" style={{animationDelay: '2s'}}></div>
          </div>

          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/5.1.mp4" type="video/mp4" />
          </video>

          <div className="relative z-20 container mx-auto px-6 text-center max-w-5xl">
            <div className="mb-6 animate-fade-in inline-block">
              <Badge className="px-4 py-1.5 bg-white/10 text-rose-200 border border-white/20 text-xs font-medium backdrop-blur-md uppercase tracking-wider">
                Học phần MLN131
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-serif drop-shadow-xl">
              Vấn đề <span className="text-rose-400">Dân tộc</span> <br/>
              & <span className="text-amber-400">Tôn giáo</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-10 font-light max-w-3xl mx-auto">
              Nghiên cứu quan điểm Mác-Lênin và Chính sách của Đảng, Nhà nước Việt Nam trong thời kỳ quá độ lên Chủ nghĩa xã hội.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="btn-rose px-8 py-6 text-base font-semibold rounded-full"
                onClick={() => scrollToSection('mac-lenin')}
              >
                <BookOpen className="h-5 w-5 mr-2" /> Bắt đầu bài học
              </Button>
              <Button 
                size="lg" 
                className="bg-white/10 border border-white/20 text-white hover:bg-white/20 px-8 py-6 text-base font-semibold rounded-full backdrop-blur-sm transition-all"
                onClick={() => scrollToSection('quiz')}
              >
                <Zap className="h-5 w-5 mr-2" /> Trắc nghiệm nhanh
              </Button>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce opacity-50">
            <ChevronDown className="w-6 h-6" />
          </div>
        </section>

        {/* Section 1: Mác-Lênin */}
        <section id="mac-lenin" className="relative py-24 bg-slate-50 dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-rose-900 dark:text-rose-500 font-serif">
                Quan điểm Mác-Lênin
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">Bản chất, Nguồn gốc & Tính chất của Tôn giáo</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                {/* Card Bản chất */}
                <div className="card-modern p-8 border-l-4 border-rose-600" data-reveal>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-700 dark:text-rose-400">
                      <BookOpen size={20} />
                    </div>
                    <h3 className="text-xl font-bold">Bản chất Tôn giáo</h3>
                  </div>
                  <blockquote className="text-slate-700 dark:text-slate-300 italic border-l-2 border-slate-200 dark:border-slate-700 pl-4 py-2 bg-slate-50 dark:bg-slate-900/50 rounded-r-lg">
                    "Tôn giáo là hình thái ý thức xã hội phản ánh hư ảo hiện thực khách quan. Tôn giáo do con người sáng tạo ra, không phải thần thánh tạo ra con người."
                  </blockquote>
                </div>

                {/* Card Nguồn gốc */}
                <div className="card-modern p-8" data-reveal>
                    <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-700 dark:text-amber-400">
                      <Zap size={20} />
                    </div>
                    <h3 className="text-xl font-bold">3 Nguồn gốc Hình thành</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { t: 'Tự nhiên & KT-XH', d: 'Sự bất lực trước thiên nhiên & áp bức giai cấp', c: 'text-rose-600' },
                      { t: 'Nhận thức', d: 'Sự giới hạn của tri thức, gán sức mạnh cho siêu nhiên', c: 'text-indigo-600' },
                      { t: 'Tâm lý', d: 'Sự sợ hãi, lo âu, nhu cầu được an ủi, bù đắp hư ảo', c: 'text-teal-600' }
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col p-4 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                        <span className={`font-bold ${item.c} text-sm uppercase tracking-wide mb-1`}>{item.t}</span>
                        <span className="text-sm text-slate-600 dark:text-slate-400">{item.d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Tính chất & Nguyên tắc */}
              <div className="space-y-6">
                <div className="card-modern p-8 flex flex-col" data-reveal>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                      <Shield size={20} />
                    </div>
                    <h3 className="text-xl font-bold">Tính chất Tôn giáo</h3>
                  </div>
                  <div className="space-y-4 flex-grow">
                    {[
                      { t: 'Tính Lịch sử', d: 'Thay đổi theo sự biến đổi của kinh tế-xã hội', icon: '📜' },
                      { t: 'Tính Quần chúng', d: 'Là nơi sinh hoạt văn hóa của đông đảo nhân dân', icon: '👥' },
                      { t: 'Tính Chính trị', d: 'Chỉ xuất hiện khi xã hội có giai cấp đối kháng', icon: '⚖️' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                        <span className="text-2xl mt-1">{item.icon}</span>
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block">{item.t}</span>
                          <span className="text-sm text-slate-500 dark:text-slate-400">{item.d}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4 Nguyên tắc */}
                <div className="card-modern p-8 bg-slate-900 text-white border-none" data-reveal>
                  <h3 className="text-lg font-bold text-amber-400 mb-4 border-b border-white/10 pb-2">4 Nguyên tắc Giải quyết</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      'Tôn trọng tự do tín ngưỡng và không tín ngưỡng',
                      'Khắc phục mặt tiêu cực gắn liền với cải tạo xã hội',
                      'Phân biệt chính trị (lợi dụng) và tư tưởng (nhu cầu tinh thần)',
                      'Quan điểm lịch sử cụ thể'
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 text-sm items-start">
                        <span className="flex-shrink-0 w-5 h-5 bg-rose-600 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                        <span className="text-slate-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Tôn giáo ở Việt Nam */}
        <section id="ton-giao-vietnam" className="relative py-24 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-rose-800 dark:text-rose-500 font-serif">
                Tôn giáo tại Việt Nam
              </h2>
              <p className="text-slate-500 dark:text-slate-400">Đặc điểm & Chính sách của Đảng, Nhà nước</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 card-modern p-8" data-reveal>
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <Globe size={24} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold">Đặc điểm nổi bật</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    { title: 'Đa dạng', desc: '17 tôn giáo, ~28 triệu tín đồ sống đan xen', color: 'bg-amber-500' },
                    { title: 'Hòa bình', desc: 'Không có xung đột, chiến tranh tôn giáo', color: 'bg-rose-500' },
                    { title: 'Đồng hành', desc: 'Gắn bó với vận mệnh dân tộc', color: 'bg-emerald-500' },
                    { title: 'Quốc tế', desc: 'Quan hệ rộng mở với thế giới', color: 'bg-blue-500' }
                  ].map((item, i) => (
                    <div key={i} className="pl-4 border-l-2 border-slate-200 dark:border-slate-700">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{item.title}</span>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="card-modern p-8 bg-slate-900 text-white border-none" data-reveal>
                <div className="flex items-center gap-4 mb-6">
                  <Shield size={28} className="text-amber-400" />
                  <h3 className="text-xl font-bold text-white">Quan điểm Cốt lõi</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-8">
                  "Tín ngưỡng, tôn giáo là nhu cầu tinh thần của một bộ phận nhân dân, đang và sẽ tồn tại lâu dài cùng dân tộc."
                </p>
                <div className="space-y-4">
                  <h4 className="font-bold text-amber-400 text-sm uppercase tracking-wide border-b border-white/10 pb-2">Chính sách:</h4>
                  <ul className="space-y-3 text-sm text-slate-200">
                    <li className="flex gap-3"><CheckCircle size={16} className="text-emerald-400 mt-0.5 flex-shrink-0"/> Đại đoàn kết toàn dân tộc.</li>
                    <li className="flex gap-3"><CheckCircle size={16} className="text-emerald-400 mt-0.5 flex-shrink-0"/> Tôn trọng tự do tín ngưỡng.</li>
                    <li className="flex gap-3"><AlertTriangle size={16} className="text-rose-400 mt-0.5 flex-shrink-0"/> Nghiêm cấm lợi dụng tôn giáo.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Quan hệ Dân tộc & Tôn giáo (Đã khôi phục chi tiết) */}
        <section id="quan-he-dan-toc" className="relative py-24 bg-slate-50 dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white font-serif">
                Quan hệ <span className="text-rose-600">Dân tộc</span> & <span className="text-amber-600">Tôn giáo</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1: Sự gắn kết */}
              <div className="card-modern p-8 border-t-4 border-indigo-500" data-reveal>
                <div className="mb-4 w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center text-indigo-600">
                    <Users size={24} />
                </div>
                <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-3">Sự Gắn kết Chặt chẽ</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">
                  Được thiết lập trên nền tảng <span className="font-bold">quốc gia – dân tộc thống nhất</span>. Tín ngưỡng thờ cúng tổ tiên (Vua Hùng) là sợ dây kết nối, buộc các tôn giáo ngoại nhập phải hòa nhập văn hóa Việt Nam.
                </p>
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg border border-indigo-100 dark:border-indigo-900/50">
                  <span className="text-indigo-800 dark:text-indigo-200 text-xs font-semibold">Ví dụ: Phật giáo "Hộ quốc an dân".</span>
                </div>
              </div>

              {/* Card 2: Thách thức */}
              <div className="card-modern p-8 border-t-4 border-rose-500" data-reveal>
                <div className="mb-4 w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-lg flex items-center justify-center text-rose-600">
                    <Flame size={24} />
                </div>
                <h3 className="text-xl font-bold text-rose-700 dark:text-rose-400 mb-3">Thách thức Mới</h3>
                <div className="space-y-4">
                    <div>
                        <p className="font-semibold text-sm text-slate-800 dark:text-slate-200 mb-1">Hiện tượng:</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Xuất hiện "tôn giáo lạ" (Tin Lành Đề Ga, Hà Mòn...) mang màu sắc mê tín, dễ bị lợi dụng.</p>
                    </div>
                    <div>
                        <p className="font-semibold text-sm text-slate-800 dark:text-slate-200 mb-1">Âm mưu:</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">"Tôn giáo hóa dân tộc" nhằm chia rẽ khối đại đoàn kết, kích động ly khai.</p>
                    </div>
                </div>
              </div>

              {/* Card 3: Nguyên tắc (Khôi phục) */}
              <div className="card-modern p-8 border-t-4 border-emerald-500 md:col-span-2 lg:col-span-1" data-reveal>
                <div className="mb-4 w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center text-emerald-600">
                    <Gavel size={24} />
                </div>
                <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-4">Nguyên tắc Bất di bất dịch</h3>
                <ul className="space-y-3">
                    <li className="flex gap-3 items-start">
                        <span className="text-emerald-500 mt-0.5">•</span>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Giải quyết vấn đề tôn giáo phải đặt trong lợi ích <span className="font-bold">Quốc gia - Dân tộc</span>.</p>
                    </li>
                    <li className="flex gap-3 items-start">
                        <span className="text-emerald-500 mt-0.5">•</span>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Tuyệt đối không được lợi dụng tôn giáo để đòi ly khai dân tộc.</p>
                    </li>
                    <li className="flex gap-3 items-start">
                        <span className="text-emerald-500 mt-0.5">•</span>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Kiên quyết đấu tranh với các hành vi lợi dụng tín ngưỡng.</p>
                    </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Tình huống Thực tiễn (Đã khôi phục chi tiết) */}
        <section id="tinh-huong" className="relative py-24 bg-slate-900 text-white overflow-hidden">
          <div className="absolute inset-0 bg-slate-950 opacity-90"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
            <div className="text-center mb-16">
              <Badge className="px-4 py-1.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 mb-4 rounded-full">CASE STUDY</Badge>
              <h2 className="text-4xl font-bold mb-4 font-serif text-white">
                Tình huống Thực tiễn
              </h2>
              <p className="text-slate-400">Quản trị xung đột tôn giáo trong doanh nghiệp thời kỳ quá độ</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Cột Trái: Vấn đề */}
              <div className="space-y-6" data-reveal>
                  <div className="case-card case-conflict bg-slate-800 rounded-xl shadow-lg p-0">
                     <div className="bg-rose-900/20 p-6 border-b border-rose-500/10">
                        <div className="flex items-center gap-3 mb-2">
                            <AlertTriangle className="text-rose-500" />
                            <h3 className="text-lg font-bold text-rose-100">Xung đột: Đức tin & Hiệu suất</h3>
                        </div>
                     </div>
                     <div className="p-8 space-y-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                <Briefcase className="text-blue-400" size={20}/>
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Nhân vật: Hoàng (HR Manager)</h4>
                                <p className="text-slate-400 text-sm">Tập đoàn đa quốc gia tại vùng giáo.</p>
                            </div>
                        </div>

                        <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 italic text-slate-300">
                            "Tôn giáo là chuyện cá nhân. Trong giờ làm việc, tôi cần hiệu suất tối đa. Việc nghỉ lễ tôn giáo của nhóm nhân viên này đang làm chậm dây chuyền sản xuất."
                            <div className="mt-2 text-right text-rose-400 font-bold text-sm not-italic">- CEO Doanh nghiệp -</div>
                        </div>

                        <ul className="space-y-4">
                            <li className="flex gap-4">
                               <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-2"></div>
                               <div>
                                  <strong className="text-rose-300 block text-sm">Sự kiện:</strong>
                                  <span className="text-slate-400 text-sm">Nhóm nhân viên nòng cốt xin nghỉ lễ dài ngày đúng đợt kiểm tra chất lượng.</span>
                               </div>
                            </li>
                            <li className="flex gap-4">
                               <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-2"></div>
                               <div>
                                  <strong className="text-rose-300 block text-sm">Nguy cơ:</strong>
                                  <span className="text-slate-400 text-sm">Mâu thuẫn nội bộ, bị các thế lực bên ngoài kích động, vu khống "đàn áp tôn giáo".</span>
                               </div>
                            </li>
                        </ul>
                     </div>
                  </div>

                  {/* Box Góc nhìn Mác-Lênin (Khôi phục) */}
                  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                      <div className="flex items-center gap-2 mb-3 text-indigo-400">
                          <Eye size={18}/>
                          <h4 className="font-bold text-sm uppercase">Góc nhìn Mác-Lênin về Nguồn gốc</h4>
                      </div>
                      <div className="space-y-2 text-sm text-slate-400">
                          <p>• <b>Kinh tế:</b> Áp lực đời sống khiến người lao động tìm sự an ủi.</p>
                          <p>• <b>Tâm lý:</b> Nhu cầu tinh thần, niềm tin là có thật và cần được tôn trọng.</p>
                      </div>
                  </div>
              </div>

              {/* Cột Phải: Giải pháp */}
              <div className="space-y-6" data-reveal>
                  <div className="case-card case-solution bg-slate-800 rounded-xl shadow-lg p-0">
                    <div className="bg-emerald-900/20 p-6 border-b border-emerald-500/10">
                        <div className="flex items-center gap-3 mb-2">
                            <CheckCircle className="text-emerald-500" />
                            <h3 className="text-lg font-bold text-emerald-100">Phương án Giải quyết</h3>
                        </div>
                    </div>
                    <div className="p-8 space-y-8">
                        <div>
                            <h4 className="flex items-center gap-2 font-bold text-white mb-3">
                                <Scale className="text-amber-400 w-5 h-5"/>
                                1. Nguyên tắc: Tự do trong Kỷ luật
                            </h4>
                            <ul className="space-y-2 pl-7 text-sm text-slate-300">
                                <li>• Tôn trọng niềm tin nhưng không thỏa hiệp về kỷ luật lao động.</li>
                                <li>• Phân biệt rõ "nhu cầu tín ngưỡng chính đáng" và "lợi dụng để lười biếng".</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="flex items-center gap-2 font-bold text-white mb-3">
                                <Users2 className="text-blue-400 w-5 h-5"/>
                                2. Hành động Cụ thể
                            </h4>
                            <ul className="space-y-2 pl-7 text-sm text-slate-300">
                                <li>• <b>Đối thoại:</b> Gặp gỡ đại diện nhóm nhân viên để tìm giải pháp linh hoạt (làm bù, đổi ca).</li>
                                <li>• <b>Minh bạch:</b> Công khai chính sách nghỉ lễ, thưởng phạt công bằng.</li>
                                <li>• <b>An ninh:</b> Phối hợp công đoàn ngăn chặn các đối tượng bên ngoài kích động.</li>
                            </ul>
                        </div>
                    </div>
                  </div>

                  {/* Box Kết luận (Khôi phục) */}
                  <div className="bg-emerald-900/10 p-6 rounded-xl border border-emerald-500/20">
                      <p className="text-emerald-400 font-bold text-sm mb-1">KẾT LUẬN QUẢN TRỊ:</p>
                      <p className="text-slate-300 text-sm">
                          Tôn giáo còn tồn tại là tất yếu khách quan. Nhà quản trị giỏi không "cấm đoán" mà phải biết "hài hòa" lợi ích, biến sự đa dạng văn hóa thành động lực gắn kết tổ chức.
                      </p>
                  </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quiz Section - 10 Câu hỏi khó */}
        <section id="quiz" className="relative py-24 bg-slate-100 dark:bg-black">
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <Badge className="px-4 py-1 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 mb-4">TRẮC NGHIỆM</Badge>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-serif">
                Thử thách Kiến thức
              </h2>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
                    <h3 className="font-bold text-lg">Câu hỏi {currentQuiz + 1} / {quizQuestions.length}</h3>
                    <span className="bg-rose-600 text-xs font-bold px-3 py-1 rounded-full">Điểm: {correctAnswers}</span>
                </div>
                <div className="h-1 w-full bg-slate-800">
                    <div className="h-full bg-rose-500 transition-all duration-300" style={{width: `${((currentQuiz + 1) / quizQuestions.length) * 100}%`}}></div>
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-medium text-slate-800 dark:text-slate-100 mb-8 leading-relaxed">
                      {quizQuestions[currentQuiz].question}
                  </h3>
                  
                  <div className="space-y-3 mb-8">
                    {quizQuestions[currentQuiz].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(index)}
                        disabled={showAnswer}
                        className={`quiz-opt w-full text-left p-4 rounded-lg text-base ${
                          selectedAnswer === index
                            ? index === quizQuestions[currentQuiz].correct
                              ? 'correct'
                              : 'wrong'
                            : 'text-slate-600 dark:text-slate-300'
                        } ${showAnswer && index === quizQuestions[currentQuiz].correct ? 'correct' : ''}`}
                      >
                        <div className="flex gap-4">
                            <span className="font-bold opacity-50">{String.fromCharCode(65 + index)}.</span>
                            <span>{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {showAnswer && (
                    <div className="animate-fade-in bg-slate-50 dark:bg-slate-800/50 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
                       <div className="mb-4">
                           <span className={`font-bold ${selectedAnswer === quizQuestions[currentQuiz].correct ? 'text-emerald-600' : 'text-rose-600'}`}>
                               {selectedAnswer === quizQuestions[currentQuiz].correct ? 'Chính xác! 🎉' : 'Chưa chính xác.'}
                           </span>
                       </div>
                       <p className="text-sm text-slate-600 dark:text-slate-300">{quizQuestions[currentQuiz].explanation}</p>
                       
                       <div className="mt-6 flex justify-end">
                        {currentQuiz < quizQuestions.length - 1 ? (
                          <Button onClick={nextQuestion} className="btn-rose rounded-full px-6">
                            Câu tiếp theo <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        ) : (
                          <Button onClick={resetQuiz} variant="outline" className="rounded-full px-6 border-slate-300 dark:border-slate-600">
                            Làm lại bài thi
                          </Button>
                        )}
                       </div>
                    </div>
                  )}
                </div>
            </div>
          </div>
        </section>

        {/* AI Transparency */}
        <section id="prove" className="py-16 bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
           <div className="container mx-auto px-4 text-center">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-slate-800 rounded-full border border-slate-700">
                 <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                 <span>AI Transparency Statement</span>
              </div>
              <p className="max-w-2xl mx-auto mb-6">
                 Nội dung học thuật được biên soạn bởi sinh viên dựa trên giáo trình chuẩn. 
                 AI (Claude/ChatGPT) được sử dụng để hỗ trợ cấu trúc mã nguồn và tạo hình ảnh minh họa (Midjourney).
              </p>
              <div className="flex justify-center gap-6 opacity-70">
                 <span>© 2025 MLN131 Project</span>
                 <span>•</span>
                 <span>Non-commercial Education Purpose</span>
              </div>
           </div>
        </section>

        {/* Back to top */}
        {showBackTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-rose-600 hover:bg-rose-700 text-white rounded-full p-3 shadow-lg z-50 transition-all hover:-translate-y-1"
          >
            <ArrowRight className="w-5 h-5 transform -rotate-90" />
          </button>
        )}
      </div>
    </div>
  )
}

export default App