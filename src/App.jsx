import React, { useState, useEffect } from 'react';
import {
  Beaker,
  TrendingUp,
  Battery,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Play,
  RefreshCw,
  Trophy,
  Store,
  Shield,
  Zap,
  ChevronRight,
  Info
} from 'lucide-react';

// --- Scenarios Data ---
const scenarios = [
  {
    id: 1,
    title: "100% продукта?",
    description: "Ваша команда синтезировала новую стеклокерамику. Да вы красавчики! Вы сделали 100% своей части продукта. Дай б-г каждому таких ученых! Но что делаем дальше?",
    image: "🧪",
    choices: [
      {
        text: "Надеваем фартук, встаем за прилавок и кричим: «Свежая керамика! Инновации по акции!»",
        market: 0, science: -10, energy: -30,
        feedback: "Вы выгорели. Ученый не должен стоять за прилавком и торговать. Это тот самый «редкостный кринж», которым вас пугали в комментариях.",
        isCorrect: false
      },
      {
        text: "Отдаем разработку в университетский Центр трансфера технологий и забываем. Пусть сами кому-нибудь это продают.",
        market: -15, science: 5, energy: 0,
        feedback: "Технология легла на полку. Центр сделал веерную рассылку и сказал: «Мы пытались, но индустрии ничего не надо».",
        isCorrect: false
      },
      {
        text: "Понимаем, что это всего лишь образец материала. Перераспределяем роли внутри своей группы: кто-то дальше проводит исследования, а кто-то начинает исследовать рынок.",
        market: 15, science: 5, energy: -5,
        feedback: "Бинго! Вы не нанимаете мутных продажников, вы меняете оптику внутри своей команды. Разделение труда работает!",
        isCorrect: true
      }
    ]
  },
  {
    id: 2,
    title: "Функция геологоразведки",
    description: "Критики пишут: «Ученый копает. А куда копать — должны решать другие люди со стороны спроса». Но спрос почему-то молчит.",
    image: "🧭",
    choices: [
      {
        text: "Ждать, пока завод сам придет к вам с идеальным ТЗ на вашу инновацию.",
        market: -15, science: 5, energy: -5,
        feedback: "Ошибка. Завод не напишет ТЗ на прорывной материал, потому что в гробу инженеры завода видали ваши инновации.",
        isCorrect: false
      },
      {
        text: "Копать куда глаза глядят! Мы — творцы, наука ради науки!",
        market: -20, science: 15, energy: 0,
        feedback: "Отличный подход для фундаментальной науки. Но вы заявляли прикладной продукт, а ушли снова в исследования ради исследований",
        isCorrect: false
      },
      {
        text: "Взять «геологоразведку» на себя. Пойти на завод, выпить чаю с главным технологом и выяснить их корневую проблему.",
        market: 15, science: 5, energy: -5,
        feedback: "Отличный ход! Вы не ждете спрос, вы сами его формируете, нащупывая реальные проблемы индустрии.",
        isCorrect: true
      }
    ]
  },
  {
    id: 3,
    title: "Научные лошадки",
    description: "Приходит вменяемый зав. кафедрой: «Береги своих научных лошадок! Пусть пашут свои борозды в лаборатории. Зачем им этот ваш рынок?»",
    image: "🐎",
    choices: [
      {
        text: "Согласиться. Кафедра — это островок безопасности. Пишем статьи, никуда не лезем.",
        market: -20, science: 10, energy: 5,
        feedback: "Вы выбрали тактику выживания. Вашим ученым комфортно, но ваши прикладные амбиции мертвы.",
        isCorrect: false
      },
      {
        text: "Выгнать всех «лошадок» на мороз продавать B2B-решения и делать холодные звонки.",
        market: -10, science: -20, energy: -30,
        feedback: "Бунт на корабле! Команда вас ненавидит, фундаменталка загублена, а продавать они так и не научились.",
        isCorrect: false
      },
      {
        text: "Стать буфером. Вы берете на себя и нескольких ребят, кто сам хочет, рыночную часть, а «лошадкам» даете прикладные исследовательские задачи",
        market: 15, science: 10, energy: -10,
        feedback: "Вот она — амбидекстрия! И слово то какое! Ух! Вы сохранили комфорт для ученых, но направили их работу в нужное для продукта русло.",
        isCorrect: true
      }
    ]
  },
  {
    id: 4,
    title: "Золотые болты",
    description: "Индустрии пока ваши разработки не нужны, «им бы выжить». Зато предлагают жирное Госзадание. А что, 23 миллиончика, да и тема знакомая!",
    image: "🔩",
    choices: [
      {
        text: "Делаем идеальный «золотой болт». Пишем красивый отчет, публикуем статьи, получаем деньги и жалуемся, что бизнес тупой.",
        market: -25, science: 10, energy: 5,
        feedback: "Синдром имитации бурной деятельности. Это кладбище для реальных технологий. Идеальный отчет отправлен в архив.",
        isCorrect: false
      },
      {
        text: "Гордо отказываемся от денег государства. Идем делать стартап в гараже без реактивов и зарплат.",
        market: 5, science: -25, energy: -30,
        feedback: "Вы остались без оборудования и штата. Без базового финансирования ничего технологичного не поднять.",
        isCorrect: false
      },
      {
        text: "Берем ГЗ 2.0: обеспечиваем базовое финансирование, но «хакаем» ТЗ так, чтобы параллельно решать реальную боль индустрии.",
        market: 15, science: 10, energy: -5,
        feedback: "Стратегия выживания превратилась в стратегию развития! Вы использовали стабильность для создания будущей рыночной ценности.",
        isCorrect: true
      }
    ]
  },
  {
    id: 5,
    title: "Рынка нет!",
    description: "Скептики кричат: «Вы наплодите продуктовых команд, но работы у них не будет! Денег на индустриальный R&D в стране нет!»",
    image: "📉",
    choices: [
      {
        text: "Поверить критикам, сложить лапки и распустить тех, кто отвечал за развитие продукта.",
        market: -20, science: 5, energy: 0,
        feedback: "Вы сдались. Если мыслить рамками существующих грантов, рынка действительно нет.",
        isCorrect: false
      },
      {
        text: "Написать гневное письмо в Минпромторг с требованием заставить заводы покупать вашу разработки. Ведь столько сил вложено!",
        market: -10, science: 0, energy: -20,
        feedback: "Бизнес из-под палки не работает. Вас вежливо послали отпиской.",
        isCorrect: false
      },
      {
        text: "Понять, что спрос не висит на сайте госзакупок. Найти узкое место завода и доказать, как вы сэкономите им миллионы.",
        market: 15, science: 0, energy: -5,
        feedback: "В точку! Настоящие команды сами формируют рынок, показывая экономическую целесообразность своей технологии.",
        isCorrect: true
      }
    ]
  },
  {
    id: 6,
    title: "Снобизм и менеджеры",
    description: "В Telegram бунт: «Ученые будут смотреть на менеджера свысока! Скрестить их невозможно, система развалится!»",
    image: "🧐",
    choices: [
      {
        text: "Смириться с академическим снобизмом. Пусть варят стекло молча, без всяких там бизнес-метрик.",
        market: -20, science: 10, energy: 5,
        feedback: "Вы потакаете снобизму, который убивает внедрение. Лаборатория осталась башней из слоновой кости.",
        isCorrect: false
      },
      {
        text: "Нанять на хедхантере «инфоцыгана» с улицы и заставить химиков отчитываться перед ним.",
        market: -15, science: -15, energy: -25,
        feedback: "Снобизм победил. Менеджер ничего не понимает в химии, ученые его презирают. Проект встал.",
        isCorrect: false
      },
      {
        text: "Не нанимать людей с улицы. Вырастить «техноброкера» из своих же толковых аспирантов, которых команда знает и уважает",
        market: 15, science: 5, energy: -5,
        feedback: "Отличный оргдизайн! Научная экспертиза и способность к деловой коммуникации могут творить чудеса.",
        isCorrect: true
      }
    ]
  },
  {
    id: 7,
    title: "Двойные стандарты",
    description: "Вуз требует заявить вашу чисто фундаментальную тему как «технологический продукт» для отчета по программе «Горизонты-2040». А ТО РЕКТОРУ ОТЧИТЫВАТЬСЯ ЖЕ НА СОВЕТЕ!",
    image: "🎭",
    choices: [
      {
        text: "Переименовать статью про свойства фотонов в «прототип квантового компьютера». Имитируем продукт!",
        market: -25, science: 10, energy: -5,
        feedback: "Вы поддержали главную ложь системы. Двойные стандарты процветают, реальных продуктов нет.",
        isCorrect: false
      },
      {
        text: "Устроить скандал на ректорате, кричать о смерти фундаментальной науки.",
        market: 0, science: -20, energy: -30,
        feedback: "Вы правы идеологически, но остались без лаборатории. Скандалами систему не изменить.",
        isCorrect: false
      },
      {
        text: "Четко разделить: фундаменталку оставляем фундаменталкой (ее не трогаем, если она вообще есть!). А для \"Горизонтов\" работаем над прикладным проектом.",
        market: 15, science: 15, energy: -5,
        feedback: "Мудро. Продуктовый подход не лезет в фундаменталку. Но там, где обещан прикладной результат, мы работаем честно.",
        isCorrect: true
      }
    ]
  },
  {
    id: 8,
    title: "Долина смерти",
    description: "Технология прекрасно работает в пробирке. Но завод говорит: «Круто, отгрузите нам 2 тонны завтра». А вы варите по 10 грамм в день.",
    image: "🏔️",
    choices: [
      {
        text: "Обидеться. «Мы наука, а не цех! Сами масштабируйте свою логистику!»",
        market: -25, science: 5, energy: 0,
        feedback: "Вы не прошли «долину смерти». Завод не будет делать это за вас, проект закрыт.",
        isCorrect: false
      },
      {
        text: "Заставить бедных лаборантов варить по 10 грамм круглосуточно в три смены.",
        market: -10, science: -10, energy: -35,
        feedback: "Вы масштабируете неэффективность. Команда выгорела за неделю.",
        isCorrect: false
      },
      {
        text: "Развернуть R&D-вектор: ищем площадку-партнера для пилотных синтезов, донастраиваем технологию, берем заказ вместе с партнером",
        market: 15, science: 10, energy: -5,
        feedback: "Вот он, продуктовый подход в действии! Вы меняете научную задачу ради бизнес-результата.",
        isCorrect: true
      }
    ]
  },
  {
    id: 9,
    title: "Замещение НИОКР",
    description: "Вы поняли страшную вещь: у завода-заказчика вообще нет своего R&D-отдела. Они даже ТЗ нормально сформулировать не могут.",
    image: "🛠️",
    choices: [
      {
        text: "«Если нет ТЗ, то результат ХЗ». Мы откуда знаем, что им надо? Сложить руки и ждать, пока они поумнеют.",
        market: -20, science: 5, energy: 0,
        feedback: "Можете ждать вечно. Российский бизнес часто не имеет сильного внутреннего R&D.",
        isCorrect: false
      },
      {
        text: "Написать ТЗ за них, но сделать так, как удобно вам, чтобы проще было сдать отчет.",
        market: -15, science: 10, energy: -5,
        feedback: "Вы сделали то, что им не нужно. Очередной продукт ушел в стол.",
        isCorrect: false
      },
      {
        text: "Заместить их R&D собой. Встроиться в их процессы, начать с мелких задач и стать их внешним исследовательским отделом на ограниченный срок или направления.",
        market: 15, science: 5, energy: -10,
        feedback: "Вы закрыли собой системный разрыв. Да, это сложно, но теперь вы стратегические партнеры.",
        isCorrect: true
      }
    ]
  },
  {
    id: 10,
    title: "Метрики тщеславия",
    description: "Год позади. Пора подводить итоги ваших экспериментов с рынком. На Ученом совете ректор строго спрашивает: «Ну и где результат вашей хваленой продуктовой трансформации?»",
    image: "📊",
    choices: [
      {
        text: "Гордо кладем на стол стопку новых статей в Q1 и отчет по свежему гранту на 50 миллионов. Наука процветает, мы молодцы!",
        market: -50, science: 20, energy: 5,
        feedback: "Академическая классика. Ученый совет в восторге, но для индустрии вы так ничего и не сделали. Вы снова вернулись в зону комфорта и метрик тщеславия.",
        isCorrect: false
      },
      {
        text: "Хлопаем дверью, забираем команду и снова уходим делать бизнес в гараже (теперь гараж тещин). Университет нам только мешает со своей бюрократией!",
        market: -70, science: -30, energy: -40,
        feedback: "Вы лишились доступа к приборам, лабораториям и притоку студентов. Без фундаментальной базы ваш \"DeepTech-стартап\" быстро задохнулся.",
        isCorrect: false
      },
      {
        text: "Показываем реальные контракты. Мы выстроили систему: фундаментальное ядро делает науку, а прикладная часть группы обеспечивает внедрение и внебюджетный доход от промышленных предприятий.",
        market: 30, science: 10, energy: -10,
        feedback: "Абсолютная победа! Вы построили устойчивый мост между наукой и деньгами индустрии. Вы доказали всем, что продуктовый подход в НИОКР — это реальность!",
        isCorrect: true
      }
    ]
  }
];

// --- Sub-components ---

const ProgressBar = ({ label, value, icon: Icon, colorClass, shadowClass }) => (
  <div className="flex flex-col w-full">
    <div className="flex justify-between items-center text-[10px] font-bold tracking-widest text-white/50 mb-1 uppercase">
      <span className="flex items-center gap-1"><Icon size={12} className="opacity-70" /> {label}</span>
      <span>{value}%</span>
    </div>
    <div className="progress-bg">
      <div
        className={`h-full rounded-full transition-all duration-700 ease-out ${colorClass} ${shadowClass}`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function App() {
  const [gameState, setGameState] = useState('intro'); // intro, playing, feedback, result
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [market, setMarket] = useState(20);
  const [science, setScience] = useState(50);
  const [energy, setEnergy] = useState(100);
  const [feedback, setFeedback] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shuffledChoices, setShuffledChoices] = useState([]);

  // Shuffle choices when scenario changes
  useEffect(() => {
    if (gameState === 'playing') {
      setShuffledChoices(shuffleArray(scenarios[currentScenarioIndex].choices));
    }
  }, [currentScenarioIndex, gameState]);

  // Auto-transition for polish
  useEffect(() => {
    if (gameState === 'intro') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [gameState]);

  const startGame = () => {
    setGameState('playing');
    setCurrentScenarioIndex(0);
    setMarket(20);
    setScience(50);
    setEnergy(100);
  };

  const handleChoice = (choice) => {
    setIsAnimating(true);
    setTimeout(() => {
      setMarket(prev => Math.max(0, Math.min(100, prev + choice.market)));
      setScience(prev => Math.max(0, Math.min(100, prev + choice.science)));
      setEnergy(prev => Math.max(0, Math.min(100, prev + choice.energy)));

      setFeedback({
        text: choice.feedback,
        isCorrect: choice.isCorrect
      });
      setGameState('feedback');
      setIsAnimating(false);
    }, 300);
  };

  const nextScenario = () => {
    if (energy <= 0) {
      setGameState('result');
      return;
    }

    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
      setGameState('playing');
    } else {
      setGameState('result');
    }
  };

  const getResult = () => {
    if (energy <= 0) {
      return {
        title: "Выгоревший PI 🪫",
        desc: "Вы попытались лично стоять за прилавком и воевали со всем миром. Энергия кончилась. Тот самый «редкостный кринж» настиг вас.",
        icon: <Battery size={48} className="text-red-500" />,
        color: "text-red-400"
      };
    }

    if (market >= 90 && science >= 30) {
      return {
        title: "НИОКР-Амбидекстер! 🏆",
        desc: "Абсолютная победа! Вы построили устойчивый мост между наукой и деньгами индустрии. Продуктовый подход в НИОКР — это реальность!",
        icon: <Trophy size={48} className="text-neon-emerald" />,
        color: "text-neon-emerald"
      };
    }

    if (market >= 50 && science >= 40) {
      return {
        title: "Техноброкер 🚀",
        desc: "Успешное внедрение! Вы сохранили баланс, вырастили своих профи и нашли общий язык с заводами.",
        icon: <Zap size={48} className="text-neon-blue" />,
        color: "text-neon-blue"
      };
    }

    if (science >= 60 && market < 50) {
      return {
        title: "Мастер Золотых Болтов 🔩",
        desc: "Уют на кафедре сохранен, отчеты сданы, статья Q1 написана (еще 10 Q3-Q4, чтобы закрыться по ГЗ). Ни разработки, ни технологии нет. На запросы от индустрии кроме собственной важности ответить нечего. Поздравляем - вы остались в собственной зоне комфорта и тщеславия!",
        icon: <Info size={48} className="text-white/50" />,
        color: "text-white/70"
      };
    }

    return {
      title: "Жертва Системы 📊",
      desc: "Бюрократия, двойные стандарты и снобизм оказались сильнее. Ваши разработки застряли в коридорах вуза.",
      icon: <AlertCircle size={48} className="text-neon-purple" />,
      color: "text-neon-purple"
    };
  };

  return (
    <div className="min-h-screen max-w-lg mx-auto p-4 flex flex-col font-sans select-none">

      {/* --- Intro Screen --- */}
      {gameState === 'intro' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in duration-1000">
          <div className="relative">
            <div className="absolute inset-0 bg-neon-blue blur-3xl opacity-20 animate-pulse"></div>
            <span className="text-8xl relative z-10">🛒</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tighter text-white uppercase leading-none">
              Продукты <br />
              <span className="text-neon-blue text-5xl">С прилавка</span>
            </h1>
            <p className="text-white/40 text-sm font-medium tracking-wide uppercase italic">
              СИМУЛЯТОР ЛЕГКОГО ПОВЕДЕНИЯ
            </p>
          </div>
          <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
            Вы — руководитель научной группы. Вы не хотите жить в иллюзиях своей важности, но в телеграм-каналах пишут, что вы несете «редкостный кринж» и «пургу от инноваторов». <br /><br /> Проверьте себя и не станьте торгашом за прилавком, защитите своих ученых от бюрократии и не скатитесь в производство «золотых болтов».
          </p>
          <button
            onClick={startGame}
            className="group btn-primary neon-shadow-blue w-full max-w-[240px] flex items-center justify-center gap-2 text-neon-blue border-neon-blue/40"
          >
            <Play size={18} fill="currentColor" /> Начать путь
          </button>
        </div>
      )}

      {/* --- Playing Screen --- */}
      {gameState === 'playing' && (
        <div className={`flex-1 flex flex-col space-y-6 transition-all duration-300 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
          {/* Header Stats */}
          <div className="glass-card p-5 space-y-4 sticky top-0 z-20 neon-shadow-blue border-white/5">
            <div className="grid grid-cols-2 gap-4">
              <ProgressBar label="Рынок" value={market} icon={Store} colorClass="bg-neon-blue" shadowClass="neon-shadow-blue" />
              <ProgressBar label="Наука" value={science} icon={Beaker} colorClass="bg-neon-purple" shadowClass="shadow-[0_0_15px_rgba(188,19,254,0.3)]" />
            </div>
            <ProgressBar label="Энергия" value={energy} icon={Shield} colorClass={energy > 30 ? "bg-neon-emerald" : "bg-red-500"} shadowClass={energy > 30 ? "neon-shadow-emerald" : "shadow-[0_0_15px_rgba(239,68,68,0.3)]"} />
          </div>

          {/* Scenario */}
          <div className="glass-card flex-1 p-6 flex flex-col space-y-6 overflow-y-auto animate-in slide-in-from-bottom duration-500">
            <div className="flex flex-col items-center text-center space-y-4">
              <span className="text-5xl">{scenarios[currentScenarioIndex].image}</span>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-white/30 tracking-widest uppercase">
                  Шаг {currentScenarioIndex + 1} из 10
                </span>
                <h2 className="text-xl font-bold text-white">{scenarios[currentScenarioIndex].title}</h2>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed antialiased">
                {scenarios[currentScenarioIndex].description}
              </p>
            </div>

            <div className="space-y-3 pt-4">
              {shuffledChoices.map((choice, idx) => (
                <button
                  key={idx}
                  onClick={() => handleChoice(choice)}
                  className="w-full text-left p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex group items-center gap-4 active:bg-neon-blue/10 active:border-neon-blue/30"
                >
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-xs font-bold text-white/20 group-hover:text-neon-blue group-hover:border-neon-blue/50 transition-colors">
                    {idx + 1}
                  </div>
                  <p className="flex-1 text-sm text-slate-300 group-hover:text-white transition-colors">{choice.text}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- Feedback Screen --- */}
      {gameState === 'feedback' && (
        <div className="flex-1 flex flex-col items-center justify-center space-y-8 p-6 transition-all animate-in zoom-in duration-300">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-2 ${feedback.isCorrect ? 'bg-neon-emerald/10 text-neon-emerald' : 'bg-neon-purple/10 text-neon-purple'}`}>
            {feedback.isCorrect ? <CheckCircle2 size={48} /> : <AlertCircle size={48} />}
          </div>
          <div className="text-center space-y-4">
            <h3 className={`text-2xl font-black tracking-tight uppercase ${feedback.isCorrect ? 'text-neon-emerald' : 'text-neon-purple'}`}>
              {feedback.isCorrect ? 'В точку!' : 'Ошибка'}
            </h3>
            <p className="text-slate-300 text-lg md:text-xl font-medium leading-normal max-w-xs">
              {feedback.text}
            </p>
          </div>
          <button
            onClick={nextScenario}
            className="btn-primary w-full max-w-[200px] flex items-center justify-center gap-2"
          >
            Далее <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* --- Result Screen --- */}
      {gameState === 'result' && (
        <div className="flex-1 flex flex-col space-y-6 animate-in fade-in duration-1000">
          <div className="glass-card p-8 flex flex-col items-center text-center space-y-6">
            <div className="relative">
              <div className={`absolute inset-0 blur-3xl opacity-20 animate-pulse ${getResult().color === 'text-neon-emerald' ? 'bg-neon-emerald' : 'bg-neon-blue'}`}></div>
              {getResult().icon}
            </div>
            <div className="space-y-2">
              <h1 className={`text-3xl font-black tracking-tight uppercase ${getResult().color}`}>
                {getResult().title}
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
                {getResult().desc}
              </p>
            </div>
          </div>

          <div className="glass-card p-6 space-y-4">
            <h4 className="text-[10px] font-bold tracking-widest text-white/30 uppercase text-center mb-2">Финальные метрики</h4>
            <ProgressBar label="Внедрение" value={market} icon={Store} colorClass="bg-neon-blue" shadowClass="neon-shadow-blue" />
            <ProgressBar label="Научная база" value={science} icon={Beaker} colorClass="bg-neon-purple" shadowClass="shadow-[0_0_15px_rgba(188,19,254,0.3)]" />
            <ProgressBar label="Остаток энергии" value={energy} icon={Battery} colorClass={energy > 30 ? "bg-neon-emerald" : "bg-red-500"} shadowClass={energy > 30 ? "neon-shadow-emerald" : "shadow-[0_0_15px_rgba(239,68,68,0.3)]"} />
          </div>

          <button
            onClick={startGame}
            className="btn-primary flex items-center justify-center gap-2 group border-white/5 bg-white/5"
          >
            <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-700" /> Попробовать снова
          </button>
        </div>
      )}

      {/* Footer Branding */}
      <div className="py-6 text-center">
        <span className="text-[10px] font-bold tracking-[0.2em] text-white/10 uppercase">
          Что-то на научном &copy; 2026
        </span>
      </div>
    </div>
  );
}
