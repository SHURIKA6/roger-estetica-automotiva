// Easter egg da página de desenvolvedores: "Detalhamento Total do Site".
// Ao digitar `devs`, o site recebe o mesmo tratamento da Roger — lavagem com
// espuma, polimento orbital e vitrificação — e termina em modo vitrificado
// persistente, com cursor-boina que deixa rastro de brilho.
//
// Tudo é client-side (efeitos + canvas + WebAudio sintetizado, sem assets),
// então a pré-renderização do build nunca toca em `window`/`document`.

import { useEffect, useRef, useState } from 'react'

const TRIGGER = 'devs'
const FOAM_MS = 2200
const POLISH_MS = 3600
const COAT_MS = 2600
const CAR_MS = 1700
const TOAST_MS = 5500

const CAPTIONS = {
  foam: { tag: 'Etapa 01 · Lavagem', title: 'Banho de espuma' },
  polish: { tag: 'Etapa 02 · Polimento', title: 'Brilho orbital' },
  coat: { tag: 'Etapa 03 · Proteção', title: 'Vitrificação' },
}

const SPARK_COLORS = ['#d6b788', '#ea4436', '#f0e7d9']

// --- WebAudio (sintetizado, sem arquivos) ---------------------------------

function getAudio(state) {
  try {
    if (state.audio) return state.audio
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    const ctx = new AC()
    if (ctx.state === 'suspended') void ctx.resume()
    state.audio = ctx
    return ctx
  } catch {
    return null
  }
}

function humStart(state) {
  try {
    const ctx = getAudio(state)
    if (!ctx) return
    const osc = ctx.createOscillator()
    osc.type = 'sawtooth'
    osc.frequency.value = 84
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.value = 320
    filter.Q.value = 1.1
    const gain = ctx.createGain()
    gain.gain.value = 0
    gain.gain.linearRampToValueAtTime(0.055, ctx.currentTime + 0.4)
    // LFOs: um varre o filtro, outro dá o "wobble" da politriz.
    const lfoFilter = ctx.createOscillator()
    lfoFilter.type = 'sine'
    lfoFilter.frequency.value = 8.5
    const lfoFilterGain = ctx.createGain()
    lfoFilterGain.gain.value = 170
    lfoFilter.connect(lfoFilterGain)
    lfoFilterGain.connect(filter.frequency)
    const lfoGain = ctx.createOscillator()
    lfoGain.type = 'sine'
    lfoGain.frequency.value = 12.5
    const lfoGainAmount = ctx.createGain()
    lfoGainAmount.gain.value = 0.02
    lfoGain.connect(lfoGainAmount)
    lfoGainAmount.connect(gain.gain)
    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    lfoFilter.start()
    lfoGain.start()
    state.hum = { osc, lfoFilter, lfoGain, gain }
  } catch {
    // Áudio é enfeite: nunca pode quebrar a sequência.
  }
}

function humStop(state) {
  try {
    const hum = state.hum
    if (!hum) return
    state.hum = null
    const ctx = getAudio(state)
    if (!ctx) return
    hum.gain.gain.cancelScheduledValues(ctx.currentTime)
    hum.gain.gain.setValueAtTime(hum.gain.gain.value, ctx.currentTime)
    hum.gain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.25)
    const stopAt = ctx.currentTime + 0.35
    hum.osc.stop(stopAt)
    hum.lfoFilter.stop(stopAt)
    hum.lfoGain.stop(stopAt)
  } catch {
    state.hum = null
  }
}

function beep(ctx, when, duration, frequencies, peak = 0.06) {
  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0, when)
  gain.gain.linearRampToValueAtTime(peak, when + 0.015)
  gain.gain.setValueAtTime(peak, when + duration - 0.04)
  gain.gain.linearRampToValueAtTime(0.0001, when + duration)
  gain.connect(ctx.destination)
  for (const frequency of frequencies) {
    const osc = ctx.createOscillator()
    osc.type = 'square'
    osc.frequency.value = frequency
    osc.connect(gain)
    osc.start(when)
    osc.stop(when + duration + 0.05)
  }
}

function honk(state) {
  try {
    const ctx = getAudio(state)
    if (!ctx) return
    const now = ctx.currentTime + 0.02
    beep(ctx, now, 0.22, [415, 520])
    beep(ctx, now + 0.3, 0.32, [415, 520])
  } catch {
    // Enfeite: ignora.
  }
}

function chime(state) {
  try {
    const ctx = getAudio(state)
    if (!ctx) return
    const notes = [659.25, 830.61, 987.77, 1318.5, 1567.98]
    notes.forEach((frequency, index) => {
      const when = ctx.currentTime + 0.02 + index * 0.08
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.value = frequency
      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.0001, when)
      gain.gain.linearRampToValueAtTime(0.05, when + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, when + 0.4)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(when)
      osc.stop(when + 0.5)
    })
  } catch {
    // Enfeite: ignora.
  }
}

// --- Canvas ---------------------------------------------------------------

function newBubble(state) {
  return {
    x: Math.random() * state.width,
    y: state.height + 10 + Math.random() * 60,
    r: 3 + Math.random() * 11,
    vy: 0.6 + Math.random() * 1.6,
    drift: Math.random() * Math.PI * 2,
    driftSpeed: 0.008 + Math.random() * 0.02,
    alpha: 0.25 + Math.random() * 0.45,
  }
}

function spawnBurst(state, x, y, count, spread = 4.5) {
  for (let i = 0; i < count; i++) {
    if (state.sparkles.length > 320) return
    const angle = Math.random() * Math.PI * 2
    const speed = 1 + Math.random() * spread
    state.sparkles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1.2,
      life: 50 + Math.random() * 40,
      maxLife: 90,
      size: 2 + Math.random() * 3.5,
      color: SPARK_COLORS[(Math.random() * SPARK_COLORS.length) | 0],
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.25,
    })
  }
}

function drawWheel(ctx, x, y, now) {
  ctx.save()
  ctx.translate(x, y)
  ctx.fillStyle = '#0a0a09'
  ctx.beginPath()
  ctx.arc(0, 0, 14, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = '#3a3833'
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.rotate(now / 160)
  ctx.strokeStyle = '#d7cdbf'
  ctx.lineWidth = 2.4
  for (let i = 0; i < 5; i++) {
    ctx.rotate((Math.PI * 2) / 5)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(0, -9)
    ctx.stroke()
  }
  ctx.fillStyle = '#ea4436'
  ctx.beginPath()
  ctx.arc(0, 0, 2.6, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

function drawCar(ctx, x, y, now) {
  ctx.save()
  ctx.translate(x, y)
  ctx.fillStyle = 'rgba(0,0,0,.45)'
  ctx.beginPath()
  ctx.ellipse(80, 42, 80, 10, 0, 0, Math.PI * 2)
  ctx.fill()
  // Facho do farol.
  const beam = ctx.createLinearGradient(150, 24, 235, 24)
  beam.addColorStop(0, 'rgba(240,231,217,.32)')
  beam.addColorStop(1, 'rgba(240,231,217,0)')
  ctx.fillStyle = beam
  ctx.beginPath()
  ctx.moveTo(148, 15)
  ctx.lineTo(232, 4)
  ctx.lineTo(232, 38)
  ctx.lineTo(148, 31)
  ctx.closePath()
  ctx.fill()
  // Carroceria.
  ctx.fillStyle = '#111110'
  ctx.beginPath()
  ctx.moveTo(6, 34)
  ctx.lineTo(14, 20)
  ctx.quadraticCurveTo(40, 16, 58, 14)
  ctx.quadraticCurveTo(74, 4, 96, 6)
  ctx.quadraticCurveTo(118, 8, 132, 16)
  ctx.quadraticCurveTo(150, 20, 152, 28)
  ctx.lineTo(152, 34)
  ctx.quadraticCurveTo(152, 38, 146, 38)
  ctx.lineTo(12, 38)
  ctx.quadraticCurveTo(6, 38, 6, 34)
  ctx.closePath()
  ctx.fill()
  ctx.strokeStyle = 'rgba(214,183,136,.5)'
  ctx.lineWidth = 1.2
  ctx.stroke()
  // Vidro.
  ctx.fillStyle = 'rgba(214,183,136,.9)'
  ctx.beginPath()
  ctx.moveTo(64, 14)
  ctx.quadraticCurveTo(76, 8, 94, 8)
  ctx.quadraticCurveTo(110, 10, 120, 16)
  ctx.lineTo(66, 17)
  ctx.closePath()
  ctx.fill()
  // Faixa vermelha.
  ctx.fillStyle = '#ea4436'
  ctx.fillRect(8, 27, 142, 3)
  // Farol.
  ctx.fillStyle = '#f0e7d9'
  ctx.beginPath()
  ctx.ellipse(148, 24, 4, 3, 0, 0, Math.PI * 2)
  ctx.fill()
  drawWheel(ctx, 40, 38, now)
  drawWheel(ctx, 118, 38, now)
  ctx.restore()
}

// --- Componente ------------------------------------------------------------

export default function DetailingEasterEgg() {
  const [phase, setPhase] = useState('idle')
  const [fullCursor, setFullCursor] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const canvasRef = useRef(null)
  const polisherRef = useRef(null)
  const padRef = useRef(null)
  const actionsRef = useRef({ start: () => {}, cancel: () => {} })
  const stateRef = useRef({
    phase: 'idle',
    raf: 0,
    timeouts: [],
    bubbles: [],
    stamps: [],
    sparkles: [],
    car: null,
    mouse: { x: -200, y: -200 },
    pad: { x: -200, y: -200 },
    polishStart: 0,
    audio: null,
    hum: null,
    fullCursor: false,
    width: 0,
    height: 0,
    dpr: 1,
  })

  useEffect(() => {
    const state = stateRef.current
    const canvas = canvasRef.current
    const ctx = canvas ? canvas.getContext('2d') : null

    const sizeCanvas = () => {
      state.dpr = Math.min(window.devicePixelRatio || 1, 2)
      state.width = window.innerWidth
      state.height = window.innerHeight
      if (canvas) {
        canvas.width = Math.floor(state.width * state.dpr)
        canvas.height = Math.floor(state.height * state.dpr)
      }
      if (ctx) ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0)
    }
    sizeCanvas()

    const later = (ms, fn) => {
      const id = window.setTimeout(fn, ms)
      state.timeouts.push(id)
    }

    const setPhaseBoth = (next) => {
      state.phase = next
      setPhase(next)
    }

    const drawStamps = () => {
      for (let i = state.stamps.length - 1; i >= 0; i--) {
        const stamp = state.stamps[i]
        stamp.a *= 0.965
        if (stamp.a < 0.004) {
          state.stamps.splice(i, 1)
          continue
        }
        const gradient = ctx.createRadialGradient(stamp.x, stamp.y, 0, stamp.x, stamp.y, stamp.r)
        gradient.addColorStop(0, `rgba(255,250,238,${stamp.a.toFixed(3)})`)
        gradient.addColorStop(1, 'rgba(255,250,238,0)')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(stamp.x, stamp.y, stamp.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const drawBubbles = (drying) => {
      for (let i = state.bubbles.length - 1; i >= 0; i--) {
        const bubble = state.bubbles[i]
        bubble.y -= bubble.vy
        bubble.drift += bubble.driftSpeed
        bubble.x += Math.sin(bubble.drift) * 0.7
        if (drying) bubble.alpha *= 0.97
        if (bubble.y < -20 || bubble.alpha < 0.02) {
          state.bubbles.splice(i, 1)
          continue
        }
        ctx.fillStyle = `rgba(240,231,217,${(bubble.alpha * 0.28).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = `rgba(255,255,255,${(bubble.alpha * 0.75).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(bubble.x - bubble.r * 0.3, bubble.y - bubble.r * 0.3, Math.max(1, bubble.r * 0.22), 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const drawSparkles = () => {
      for (let i = state.sparkles.length - 1; i >= 0; i--) {
        const spark = state.sparkles[i]
        spark.x += spark.vx
        spark.y += spark.vy
        spark.vy += 0.06
        spark.rot += spark.vr
        spark.life -= 1
        if (spark.life <= 0) {
          state.sparkles.splice(i, 1)
          continue
        }
        const alpha = Math.min(1, spark.life / (spark.maxLife * 0.5))
        ctx.save()
        ctx.translate(spark.x, spark.y)
        ctx.rotate(spark.rot)
        ctx.globalAlpha = alpha
        ctx.strokeStyle = spark.color
        ctx.lineWidth = 1.6
        const s = spark.size
        ctx.beginPath()
        ctx.moveTo(-s, 0)
        ctx.lineTo(s, 0)
        ctx.moveTo(0, -s)
        ctx.lineTo(0, s)
        ctx.stroke()
        ctx.restore()
      }
      ctx.globalAlpha = 1
    }

    const updateCar = (now) => {
      const car = state.car
      if (!car) return
      const progress = (now - car.start) / CAR_MS
      if (progress >= 1) {
        state.car = null
        spawnBurst(state, state.width / 2, state.height * 0.35, 90, 5)
        chime(state)
        return
      }
      const x = -170 + progress * (state.width + 340)
      const y = state.height - 118
      drawCar(ctx, x, y, now)
      // Faíscas do escapamento enquanto cruza.
      if (Math.random() < 0.7 && state.sparkles.length < 300) {
        state.sparkles.push({
          x: x + 8,
          y: y + 32,
          vx: -1 - Math.random() * 2,
          vy: -0.5 - Math.random(),
          life: 30 + Math.random() * 25,
          maxLife: 55,
          size: 1.5 + Math.random() * 2.5,
          color: Math.random() < 0.5 ? '#ea4436' : '#d6b788',
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.3,
        })
      }
    }

    const updatePad = () => {
      const pad = padRef.current
      if (!pad) return
      state.pad.x += (state.mouse.x - state.pad.x) * 0.25
      state.pad.y += (state.mouse.y - state.pad.y) * 0.25
      pad.style.transform = `translate(${state.pad.x.toFixed(1)}px,${state.pad.y.toFixed(1)}px) translate(-50%,-50%)`
    }

    const loop = (now) => {
      if (!ctx) return
      ctx.clearRect(0, 0, state.width, state.height)
      if (state.phase === 'foam') {
        for (let i = 0; i < 6 && state.bubbles.length < 170; i++) {
          state.bubbles.push(newBubble(state))
        }
        drawBubbles(false)
      } else if (state.phase === 'polish') {
        drawBubbles(true)
        const t = Math.min(1, (now - state.polishStart) / POLISH_MS)
        const x = -160 + t * (state.width + 320)
        const y = state.height * 0.52 + Math.sin(t * Math.PI * 3.2) * state.height * 0.26
        const polisher = polisherRef.current
        if (polisher) {
          polisher.style.transform = `translate(${(x - 70).toFixed(1)}px,${(y - 70).toFixed(1)}px) rotate(${(Math.sin(t * 20) * 8).toFixed(2)}deg)`
        }
        state.stamps.push({ x, y, r: 110, a: 0.12 })
        if (state.stamps.length > 220) state.stamps.splice(0, state.stamps.length - 220)
        drawStamps()
      } else if (state.phase === 'coat') {
        drawBubbles(true)
        drawStamps()
        updateCar(now)
        drawSparkles()
      } else if (state.phase === 'done') {
        drawStamps()
        drawSparkles()
      }
      updatePad()
      state.raf = requestAnimationFrame(loop)
    }

    const cancel = () => {
      if (state.phase === 'idle') return
      for (const id of state.timeouts) window.clearTimeout(id)
      state.timeouts = []
      humStop(state)
      cancelAnimationFrame(state.raf)
      state.bubbles = []
      state.stamps = []
      state.sparkles = []
      state.car = null
      if (ctx) ctx.clearRect(0, 0, state.width, state.height)
      document.body.classList.remove('is-polishing', 'detail-cursor')
      document.body.removeAttribute('data-vitrified')
      setShowToast(false)
      setFullCursor(false)
      state.fullCursor = false
      setAnnouncement('')
      setPhaseBoth('idle')
    }

    const start = () => {
      if (state.phase !== 'idle') return
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const finePointer = window.matchMedia('(pointer: fine)').matches
      state.fullCursor = !reduced && finePointer
      setFullCursor(state.fullCursor)
      if (reduced) {
        // Movimento reduzido: pula a cinemática e entrega o estado final.
        setPhaseBoth('done')
        document.body.setAttribute('data-vitrified', '')
        setShowToast(true)
        setAnnouncement('Site vitrificado. Pressione Escape para remover a proteção.')
        later(TOAST_MS, () => setShowToast(false))
        return
      }
      setPhaseBoth('foam')
      setAnnouncement('Detalhamento iniciado: lavagem, polimento e vitrificação do site.')
      sizeCanvas()
      cancelAnimationFrame(state.raf)
      state.raf = requestAnimationFrame(loop)
      later(FOAM_MS, () => {
        setPhaseBoth('polish')
        state.polishStart = performance.now()
        document.body.classList.add('is-polishing')
        humStart(state)
      })
      later(FOAM_MS + POLISH_MS, () => {
        humStop(state)
        document.body.classList.remove('is-polishing')
        setPhaseBoth('coat')
      })
      later(FOAM_MS + POLISH_MS + 450, () => {
        state.car = { start: performance.now() }
        honk(state)
      })
      later(FOAM_MS + POLISH_MS + COAT_MS, () => {
        setPhaseBoth('done')
        document.body.setAttribute('data-vitrified', '')
        if (state.fullCursor) document.body.classList.add('detail-cursor')
        spawnBurst(state, state.width / 2, state.height * 0.3, 70, 5)
        setShowToast(true)
        setAnnouncement('Site vitrificado. Proteção e brilho garantidos. Pressione Escape para remover.')
        later(TOAST_MS, () => setShowToast(false))
      })
    }

    actionsRef.current = { start, cancel }

    let typed = ''
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        cancel()
        return
      }
      if (event.key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey) return
      if (event.target instanceof HTMLElement && (event.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName))) return
      typed = `${typed}${event.key.toLowerCase()}`.slice(-TRIGGER.length)
      if (typed === TRIGGER) start()
    }

    const handleMouseMove = (event) => {
      state.mouse.x = event.clientX
      state.mouse.y = event.clientY
      if (state.phase === 'done' && state.fullCursor && state.stamps.length < 170) {
        state.stamps.push({ x: event.clientX, y: event.clientY, r: 64, a: 0.09 })
      }
      const pad = padRef.current
      if (pad) {
        const hot = event.target instanceof Element && Boolean(event.target.closest('a,button'))
        pad.classList.toggle('detail-pad-hot', hot)
      }
    }

    const handleMouseLeave = () => {
      const pad = padRef.current
      if (pad) pad.style.opacity = '0'
    }
    const handleMouseEnter = () => {
      const pad = padRef.current
      if (pad) pad.style.opacity = '1'
    }

    const handleResize = () => sizeCanvas()

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', handleResize)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
      cancel()
      try {
        state.audio?.close()
      } catch {
        // Ignora.
      }
      state.audio = null
    }
    // `start`/`cancel` vivem no ref; o efeito monta uma única vez.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const running = phase === 'foam' || phase === 'polish' || phase === 'coat'
  const caption = CAPTIONS[phase]

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[60]" aria-hidden="true" />

      {caption && (
        <div className="pointer-events-none fixed inset-0 z-[61] grid place-items-center" aria-hidden="true">
          <div key={phase} className="detail-caption px-6 text-center">
            <p className="m-0 text-xs font-extrabold tracking-[.22em] text-red uppercase">{caption.tag}</p>
            <p className="m-0 mt-3 font-display text-[clamp(52px,11vw,128px)] leading-[.9] font-bold tracking-[-.02em] text-paper uppercase">
              {caption.title}
            </p>
          </div>
        </div>
      )}

      {phase === 'polish' && (
        <div ref={polisherRef} className="pointer-events-none fixed top-0 left-0 z-[61] size-[140px]" aria-hidden="true" style={{ transform: 'translate(-200px,40vh)' }}>
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(234,68,54,.35)_0%,rgba(234,68,54,0)_65%)]" />
          <svg viewBox="0 0 140 140" className="absolute inset-0 size-full">
            <rect x="42" y="8" width="56" height="30" rx="10" fill="#151513" stroke="#4a4842" strokeWidth="2" />
            <rect x="62" y="14" width="16" height="8" rx="4" fill="#ea4436" />
            <circle cx="70" cy="84" r="44" fill="#232320" stroke="#d6b788" strokeWidth="3" />
            <circle cx="70" cy="84" r="30" fill="#d7cdbf" opacity=".92" />
            <circle cx="70" cy="84" r="30" fill="none" stroke="#8f887d" strokeWidth="2" strokeDasharray="5 6" className="detail-spin" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
            <circle cx="70" cy="84" r="10" fill="#ea4436" />
            <circle cx="70" cy="84" r="4" fill="#0d0d0c" />
          </svg>
        </div>
      )}

      {phase === 'coat' && <div className="detail-sweep" aria-hidden="true" />}

      {phase === 'done' && showToast && (
        <div className="detail-toast fixed top-[calc(var(--header-height)_+_14px)] left-1/2 z-[63] w-[min(92vw,480px)] -translate-x-1/2 border border-gold bg-ink-soft-92 px-6 py-5 text-center shadow-[0_18px_60px_rgba(0,0,0,.5)]" role="status">
          <p className="m-0 text-[10px] font-extrabold tracking-[.22em] text-gold uppercase">Detalhe encontrado</p>
          <p className="m-0 mt-2 font-display text-3xl leading-none font-bold tracking-[.01em] text-paper uppercase">
            Site <span className="text-red">vitrificado</span>
          </p>
          <p className="m-0 mt-2 text-xs leading-5 text-paper-soft">Proteção e brilho com garantia de 5 anos. Passe o mouse: a página agora responde ao polimento.</p>
          <button
            className="mt-4 inline-flex min-h-10 items-center border border-line px-4 text-[10px] font-extrabold tracking-[.12em] text-paper-soft uppercase transition-colors hover:border-red hover:text-red"
            type="button"
            onClick={() => actionsRef.current.cancel()}
          >
            Remover proteção
          </button>
        </div>
      )}

      {phase === 'done' && !showToast && (
        <button
          className="detail-chip fixed right-5 bottom-5 z-[63] inline-flex min-h-11 items-center gap-2 border border-gold bg-ink-soft-92 px-4 text-[10px] font-extrabold tracking-[.14em] text-gold uppercase"
          type="button"
          title="Remover a vitrificação"
          onClick={() => actionsRef.current.cancel()}
        >
          <span aria-hidden="true">✦</span> Vitrificado
        </button>
      )}

      {phase === 'done' && fullCursor && (
        <div ref={padRef} className="detail-pad pointer-events-none fixed top-0 left-0 z-[70]" aria-hidden="true" style={{ opacity: 1 }}>
          <svg viewBox="0 0 54 54" className="block size-[54px]">
            <circle cx="27" cy="27" r="24" fill="#232320" opacity=".9" stroke="#d6b788" strokeWidth="2" />
            <circle cx="27" cy="27" r="15" fill="#d7cdbf" opacity=".95" />
            <circle cx="27" cy="27" r="6" fill="#ea4436" />
            <circle cx="27" cy="27" r="2.4" fill="#0d0d0c" />
          </svg>
        </div>
      )}

      {running && (
        <button
          className="fixed bottom-5 left-1/2 z-[63] inline-flex min-h-10 -translate-x-1/2 items-center border border-line bg-ink-soft-92 px-4 text-[10px] font-extrabold tracking-[.12em] text-paper-soft uppercase transition-colors hover:border-red hover:text-red"
          type="button"
          onClick={() => actionsRef.current.cancel()}
        >
          Pular detalhamento (Esc)
        </button>
      )}

      <p className="sr-only" role="status" aria-live="polite">{announcement}</p>
    </>
  )
}
