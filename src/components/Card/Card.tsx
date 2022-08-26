import * as React from 'react'

import { Link } from 'react-router-dom'

import styles from './Card.module.scss'

type CardProps = {
  image: string
  title: React.ReactNode
  subtitle: string
  content?: React.ReactNode
  onClick?: React.MouseEventHandler
  category?: string
  id: number
}

const Card: React.FC<CardProps> = ({
  image,
  category,
  title,
  content,
  onClick,
  subtitle,
  id,
}) => {
  return (
    <Link to={`/product/${id}`}>
      <div className={styles.card} onClick={onClick}>
        <img src={image} alt="card_image" className={styles.card__image} />
        <p className={styles.card__category}>{category}</p>
        <div className={styles.card__title}>{title}</div>
        <div className={styles.card__subtitle}>{subtitle}</div>
        <div className={styles.card__content}>{`$${content}`}</div>
      </div>
    </Link>
  )
}

export default Card
