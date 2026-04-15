import type { ReactNode } from 'react'
import { BaseFeatureScreen, type BaseFeatureScreenProps } from '../../components/BaseFeatureScreen'
import { useMesMdiEmbedded } from '../../context/MesMdiContext'
import { useDocumentTitlePath } from '../../lib/useScreenManualMeta'

type Props = Omit<BaseFeatureScreenProps, 'documentTitlePath' | 'screenId'> & {
  screenId: string
  children: ReactNode
}

/** 기준정보·`manual.csv` 매칭 — 창 제목 `메뉴 > 하위메뉴`·`[screenId]` 자동 (`useDocumentTitlePath`) */
export function MesScreenShell({ screenId, children, ...rest }: Props) {
  const documentTitlePath = useDocumentTitlePath(screenId)
  const embedded = useMesMdiEmbedded()
  return (
    <BaseFeatureScreen
      screenId={screenId}
      documentTitlePath={documentTitlePath}
      showToolbar={!embedded}
      {...rest}
    >
      {children}
    </BaseFeatureScreen>
  )
}
