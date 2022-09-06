import { useCallback, useEffect, useState } from 'react'

import { getCategories } from '@api/fetchApi'
import searchIcon from '@assets/img/svg/search-normal.svg'
import { Button } from '@components/Button'
import Input from '@components/Input'
import { MultiDropdown, Option } from '@components/MultiDropdown'
import { useProductsStore } from '@context/ProductsContext'
import { Meta } from '@utils/meta'
import { observer } from 'mobx-react-lite'
import { useSearchParams } from 'react-router-dom'

import styles from './Search.module.scss'

const Search = () => {
  const productStore = useProductsStore()

  const [categories, setCategories] = useState<Option[]>([])
  const [selectedCategories, setSelectedCategories] = useState<Option | null>(
    null
  )

  const [searchParams, setSearchParams] = useSearchParams()
  const [categoryParams, setCategoryParams] = useSearchParams()

  const searchTerm = searchParams.get('search') || ''
  const categoryTerm = searchParams.get('category') || ''

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (selectedCategories !== null) {
      productStore.getProductsByCategory(selectedCategories.value)
    } else {
      productStore.getProducts()
    }
  }, [selectedCategories])

  const fetchCategories = useCallback(async () => {
    const response = await getCategories()
    const newCategories = response.data.map((element: string) => {
      var id = element + Math.random().toString(16).slice(2)
      const newItem = {
        key: id,
        value: element,
      }
      return newItem
    })
    setCategories(newCategories)
  }, [])

  const switchCategory = useCallback(
    (value: Option) => {
      if (value.key !== selectedCategories?.key) {
        productStore.toggleHasMore(false)

        setSelectedCategories(value)
      } else {
        productStore.toggleHasMore(true)
        setSelectedCategories(null)
      }
    },
    [selectedCategories?.key]
  )

  const onChange = (value: string) => {
    if (value) {
      productStore.toggleHasMore(false)
      setSearchParams({ search: value })
    } else {
      productStore.toggleHasMore(true)
      setSearchParams({})
      productStore.getProducts()
    }
  }

  return (
    <div className={styles['search']}>
      <div className={styles['search-controlls']}>
        <img
          className={styles['search-controlls__icon']}
          src={searchIcon}
          alt="search"
        />
        <Input
          onChange={(value: string) => onChange(value)}
          className={styles['search-controlls__input']}
          value={searchTerm}
          placeholder="Search property"
        />
        <Button
          className={styles['search-controlls__button']}
          onClick={() => productStore.getProducts()}
        >
          Find Now
        </Button>
      </div>
      <MultiDropdown
        options={categories}
        value={selectedCategories}
        onChange={(value: Option) => switchCategory(value)}
        pluralizeOptions={(value: Option | null) =>
          value === null ? ` Filter` : `${value.value}`
        }
      />
    </div>
  )
}

export default Search
