import styles from './styles.module.scss'
import { CircleNotch } from 'phosphor-react'

export function Loading () {
  return (
    <div className={styles.loadingWrapper}>
      <CircleNotch className={styles.loading} size={64} color="#222" />
    </div>
  )
}