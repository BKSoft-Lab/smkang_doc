import { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import manualCsv from '../data/manual.csv?raw'
import { useMesAuth } from '../context/MesAuthContext'
import { MesMdiEmbedContext, useMesMdi } from '../context/MesMdiContext'
import { MesScreenAccessDeniedModal } from '../components/MesScreenAccessDeniedModal'
import { manualInnerWindowTitle, parseManualCsv } from '../lib/manual'
import { postMenuAccess } from '../lib/userAccessLogApi'
import { FEATURE_SCREEN_REGISTRY } from '../screens/registry'

type ScreenContentProps = {
  screenId: string
  /** MDI 등에서 맨 앞 창만 `document.title` 갱신 */
  activeDocumentTitle?: boolean
  /** 기준정보 모듈 MDI — `MesMdiEmbedContext`·모듈 단일 툴바 */
  embedInMdi?: boolean
}

export function ScreenContentByScreenId({
  screenId,
  activeDocumentTitle = true,
  embedInMdi = false
}: ScreenContentProps) {
  const navigate = useNavigate()
  const { close } = useMesMdi()
  const { session } = useMesAuth()

  const meta = useMemo(() => {
    const row = parseManualCsv(manualCsv).find((r) => r.screenId === screenId)
    return row
  }, [screenId])

  const Implemented = screenId ? FEATURE_SCREEN_REGISTRY[screenId] : undefined

  /** 정책: 구현 레지스트리에 없으면 PNG 유무와 무관하게 경고 팝업(화면 미생성) */
  const accessDenied = Boolean(screenId && !Implemented)

  const uid = session?.user.user_id
  const needsDbGate = Boolean(Implemented && screenId && uid && uid !== 'DEVELOPER')

  const [dbGate, setDbGate] = useState<'loading' | 'ok' | 'denied'>(() =>
    needsDbGate ? 'loading' : 'ok'
  )
  const [dbDenyDetail, setDbDenyDetail] = useState<
    'no_menu' | 'no_access' | 'server_error' | null
  >(null)

  useEffect(() => {
    if (!Implemented || !screenId) {
      setDbGate('ok')
      setDbDenyDetail(null)
      return
    }
    if (!uid || uid === 'DEVELOPER') {
      setDbGate('ok')
      setDbDenyDetail(null)
      return
    }

    let cancelled = false
    setDbGate('loading')
    setDbDenyDetail(null)
    const computerName =
      typeof window !== 'undefined' ? (window.location?.hostname ?? '') : ''
    const osVersion = typeof navigator !== 'undefined' ? navigator.userAgent : ''

    void postMenuAccess({
      user_id: uid,
      screen_id: screenId,
      computer_name: computerName,
      os_version: osVersion
    })
      .then((r) => {
        if (cancelled) return
        if (r.allowed) {
          setDbGate('ok')
          setDbDenyDetail(null)
          return
        }
        setDbGate('denied')
        setDbDenyDetail(r.reason === 'no_menu' ? 'no_menu' : 'no_access')
      })
      .catch(() => {
        if (cancelled) return
        setDbGate('denied')
        setDbDenyDetail('server_error')
      })

    return () => {
      cancelled = true
    }
  }, [Implemented, screenId, uid])

  const onAccessDeniedConfirm = useCallback(() => {
    if (embedInMdi && screenId) {
      close(screenId)
      return
    }
    navigate(-1)
  }, [close, embedInMdi, navigate, screenId])

  useEffect(() => {
    if (Implemented) return
    if (accessDenied) return
    if (!activeDocumentTitle) return
    /** MDI 본문만 — 모듈 창 `document.title`(모듈명) 유지 */
    if (embedInMdi) return
    const prev = document.title
    if (meta && screenId) {
      document.title = manualInnerWindowTitle(meta)
    } else if (screenId) {
      document.title = `(${screenId})`
    } else {
      document.title = 'BK MES'
    }
    return () => {
      document.title = prev
    }
  }, [screenId, meta, Implemented, accessDenied, activeDocumentTitle, embedInMdi])

  const dbAccessDenied = Boolean(Implemented && dbGate === 'denied')

  if (accessDenied) {
    const modalTitle = meta?.subMenuLabel ?? screenId ?? ''
    return (
      <MesMdiEmbedContext.Provider value={embedInMdi}>
        <MesScreenAccessDeniedModal
          open
          title={modalTitle}
          onConfirm={onAccessDeniedConfirm}
        />
      </MesMdiEmbedContext.Provider>
    )
  }

  if (dbGate === 'loading') {
    return (
      <MesMdiEmbedContext.Provider value={embedInMdi}>
        <div className="flex h-full min-h-[12rem] items-center justify-center text-sm text-slate-400">
          접근 권한 확인 중…
        </div>
      </MesMdiEmbedContext.Provider>
    )
  }

  if (dbAccessDenied) {
    const modalTitle = meta?.subMenuLabel ?? screenId ?? ''
    return (
      <MesMdiEmbedContext.Provider value={embedInMdi}>
        <MesScreenAccessDeniedModal
          open
          title={modalTitle}
          detailCode={dbDenyDetail ?? undefined}
          onConfirm={onAccessDeniedConfirm}
        />
      </MesMdiEmbedContext.Provider>
    )
  }

  const inner = Implemented ? (
    <Suspense fallback={<div className="flex h-full items-center justify-center text-sm text-slate-400">Loading...</div>}>
      <Implemented />
    </Suspense>
  ) : null

  return <MesMdiEmbedContext.Provider value={embedInMdi}>{inner}</MesMdiEmbedContext.Provider>
}

export default function ScreenPlaceholderPage() {
  const params = useParams()

  const screenId = useMemo(() => {
    const raw = params.screenId ?? ''
    try {
      return decodeURIComponent(raw)
    } catch {
      return raw
    }
  }, [params.screenId])

  return <ScreenContentByScreenId screenId={screenId} />
}
