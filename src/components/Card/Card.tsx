import * as React from 'react'

import styles from './card.module.scss'

type CardProps = {
  image: string
  title: React.ReactNode
  subtitle: string
  content?: React.ReactNode
  onClick?: React.MouseEventHandler
  category?: string
}

const Card: React.FC<CardProps> = ({
  image,
  category,
  title,
  content,
  onClick,
  subtitle,
}) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={image} alt="card_image" className={styles.card__image} />
      <p className={styles.card__category}>{category}</p>
      <div className={styles.card__title}>{title}</div>
      <div className={styles.card__subtitle}>
        {subtitle.length > 50 ? `${subtitle.slice(1, 42)}...` : subtitle}
      </div>
      <div className={styles.card__content}>{content}</div>
    </div>
  )
}

export default Card
